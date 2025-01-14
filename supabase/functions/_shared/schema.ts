import { relations, sql } from 'npm:drizzle-orm';
import { pgPolicy, pgSchema, pgTable, primaryKey, text, timestamp, uuid } from 'npm:drizzle-orm/pg-core';
import { authenticatedRole, realtimeMessages } from "npm:drizzle-orm/supabase";

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
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(() => new Date()),
}, (_t) => [...defaultPolicy]);

export const profiles = pgTable('profiles', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
        .references(() => users.id)
        .unique(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(() => new Date()),
}, (_t) => [...defaultPolicy]);

export const tags = pgTable('tags', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(() => new Date()),
}, (_t) => [...defaultPolicy]);

export const categories = pgTable('categories', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(() => new Date()),
}, (_t) => [...defaultPolicy]);

export const articles = pgTable('articles', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    categoryId: uuid('category_id')
        .references(() => categories.id, { onDelete: 'set null' }),
    publishedAt: timestamp('published_at', { withTimezone: true }).defaultNow(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(() => new Date()),
}, (_t) => [...defaultPolicy]);

export const articlesToTags = pgTable('article_tags', {
    articleId: uuid('article_id').references(() => articles.id, { onDelete: 'cascade', onUpdate: 'no action' }),
    tagId: uuid('tag_id').references(() => tags.id, { onDelete: 'cascade', onUpdate: 'no action' }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
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
    }),
    sources: many(articlesToSources),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
    articles: many(articlesToTags),
}));


export const sources = pgTable('sources', {
    id: uuid('id').defaultRandom().primaryKey(),
    label: text('label').notNull(),
    link: text('link').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(() => new Date()),
}, (_t) => [...defaultPolicy]);


export const articlesToSources = pgTable('article_sources', {
    articleId: uuid('article_id').references(() => articles.id, { onDelete: 'cascade', onUpdate: 'no action' }),
    sourceId: uuid('source_id').references(() => sources.id, { onDelete: 'cascade', onUpdate: 'no action' }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
},
    (table) => ([...defaultPolicy, primaryKey({ columns: [table.articleId, table.sourceId] })])
);


export const sourcesRelations = relations(sources, ({ many }) => ({
    articles: many(articlesToSources),
}));



export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertTag = typeof tags.$inferInsert;
export type SelectTag = typeof tags.$inferSelect;

export type InsertCategory = typeof categories.$inferInsert;
export type SelectCategory = typeof categories.$inferSelect;

export type InsertArticle = typeof articles.$inferInsert;
export type SelectArticle = typeof articles.$inferSelect;

export type InsertSource = typeof sources.$inferInsert;
export type SelectSource = typeof sources.$inferSelect;

