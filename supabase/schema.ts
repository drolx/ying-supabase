import { relations, sql } from 'drizzle-orm';
import { pgPolicy, pgSchema, pgTable, primaryKey, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { authenticatedRole, realtimeMessages } from "drizzle-orm/supabase";

const authSchema = pgSchema('auth');

export const users = authSchema.table('users', {
    id: uuid('id').primaryKey(),
});

const defaultPolicy = [
    pgPolicy(`crud-${authenticatedRole.name}-policy-all`, {
        for: 'all',
        to: authenticatedRole,
        using: sql`true`,
    }).link(realtimeMessages),
]

export const userRoles = pgTable('user_roles', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
        .references(() => users.id)
        .unique()
        .notNull(),
    userRole: text('user_role').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
}, (_t) => [...defaultPolicy]);

export const profiles = pgTable('profiles', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
        .references(() => users.id)
        .unique(),
    firstName: text('first_name'),
    lastName: text('last_name'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
}, (_t) => [...defaultPolicy]);

export const tags = pgTable('tags', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
}, (_t) => [...defaultPolicy]);

export const categories = pgTable('categories', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name'),
    description: text('description'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
}, (_t) => [...defaultPolicy]);

export const articles = pgTable('articles', {
    id: uuid('id').primaryKey(),
    title: text('title'),
    content: text('content'),
    categoryId: uuid('category_id')
        .references(() => categories.id, { onDelete: 'set null' }),
    publishedAt: timestamp('published_at').defaultNow(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
}, (_t) => [...defaultPolicy]);

export const articlesToTags = pgTable('article_tags', {
    articleId: uuid('article_id').references(() => articles.id),
    tagId: uuid('tag_id').references(() => tags.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
},
    (table) => ([
        ...defaultPolicy,
        primaryKey({ columns: [table.articleId, table.tagId] })
    ])
);

export const articlesRelations = relations(articles, ({ many, one }) => ({
    tags: many(articlesToTags),
    categories: one(categories, {
        fields: [articles.categoryId],
        references: [categories.id],
    })
}));

export const tagsRelations = relations(tags, ({ many }) => ({
    articles: many(articlesToTags),
}));

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertArticle = typeof users.$inferInsert;
export type SelectArticle = typeof users.$inferSelect;