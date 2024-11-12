import { rlsPolicyBuilder } from 'supabase-drizzle';
import * as schema from './supabase/schema';

// @ts-ignore
const { tables, own, rls, authenticated, everyone, hasRole } = rlsPolicyBuilder(schema, {
    userRolesTable: schema.userRoles,
    userRoles: {
        owner: {},
        admin: {},
        member: {},
    },
});

const openPermissions = {
    select: everyone(),
    insert: everyone(),
    update: everyone(),
    delete: [own(), hasRole(['admin', 'owner'])],
    // delete: authenticated(),
};

const authPermissions = {
    select: authenticated(),
    insert: authenticated(),
    update: authenticated(),
    delete: authenticated(),
};

export const users = rls(tables.users, authPermissions);
export const userRoles = rls(tables.userRoles, authPermissions);
export const profiles = rls(tables.profiles, openPermissions);
export const articles = rls(tables.articles, {
    insert: authenticated(),
    update: own(),
    select: everyone(),
    delete: [own(), hasRole(['admin', 'owner'])],
    // delete: authenticated(),
});
