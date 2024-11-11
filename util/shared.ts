import type { SortItem } from "~/types/shared";

export type PageFilter = {
    filter: string;
    ascending: boolean;
    from: number;
    to: number;
}
export const getPagingFilter = (args: { page: number, itemsPerPage: number, sortBy: SortItem[] }): PageFilter => {
    let filter: string = 'id';
    let ascending: boolean = false;
    const from = args.page === 1 ? 0 : args.page * args.itemsPerPage;
    const to = from + args.itemsPerPage - 1;

    if (args.sortBy[0] && args.sortBy[0].key) {
      filter = args.sortBy[0].key;
      ascending = args.sortBy[0].order !== 'asc';
    }

    return {
        filter,
        ascending,
        from,
        to,
    }
}