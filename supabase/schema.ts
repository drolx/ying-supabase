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
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
}, (_t) => [...defaultPolicy]);

export const tags = pgTable('tags', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
}, (_t) => [...defaultPolicy]);

export const categories = pgTable('categories', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
}, (_t) => [...defaultPolicy]);

export const articles = pgTable('articles', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    categoryId: uuid('category_id')
        .references(() => categories.id, { onDelete: 'set null' }),
    publishedAt: timestamp('published_at').defaultNow(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
}, (_t) => [...defaultPolicy]);

export const articlesToTags = pgTable('article_tags', {
    articleId: uuid('article_id').references(() => articles.id, { onDelete: 'cascade', onUpdate: 'no action' }),
    tagId: uuid('tag_id').references(() => tags.id, { onDelete: 'cascade', onUpdate: 'no action' }),
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

export type InsertTag = typeof tags.$inferInsert;
export type SelectTag = typeof tags.$inferSelect;

export type InsertCategory = typeof categories.$inferInsert;
export type SelectCategory = typeof categories.$inferSelect;

export type InsertArticle = typeof articles.$inferInsert;
export type SelectArticle = typeof articles.$inferSelect;
