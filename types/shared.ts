export type SortItem = {
    key: string;
    order?: boolean | 'asc' | 'desc';
};

export type CategoryItem = {
    created_at: string;
    description: string | null;
    id: number;
    name: string;
};
export type TagItem = {
    created_at: string;
    id: number;
    name: string;
}