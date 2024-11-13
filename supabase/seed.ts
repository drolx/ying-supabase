import postgres from 'postgres';
import { tags, categories, articles, type InsertArticle, type InsertCategory, type InsertTag } from "./schema";
import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";
import { type PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";

dotenv.config({ path: ".env" });

export const rangeCustom = (start: number, end: number): number[] => (
    (end > start)
        ? [...Array((end - start + 1)).keys()].map((k) => (k + start))
        : [...Array((start - end + 1)).keys()].map((k) => (k + end)).reverse()
);
export const range = (end: number): number[] => rangeCustom(0, end);

if (!("DB_URL" in process.env))
    throw new Error("DB_URL not found on .env");

const main = async () => {
    const client = postgres(process.env.DB_URL || '');
    const db: PostgresJsDatabase = drizzle(client, {
        logger: true,
    });

    const tagsTable: InsertTag[] = [];
    const categoriesTable: InsertCategory[] = [];
    const artclesTable: InsertArticle[] = [];

    range(15).map(() => {
        tagsTable.push({
            name: faker.color.human(),
        });

        categoriesTable.push({
            name: faker.commerce.department(),
            description: faker.lorem.words(),
        });

        artclesTable.push({
            title: faker.word.words(),
            content: faker.lorem.paragraph(),
            publishedAt: new Date(),
        })
    });

    console.log("Seeding start...");

    await db.insert(tags).values(tagsTable);
    await db.insert(categories).values(categoriesTable);
    await db.insert(articles).values(artclesTable);
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        console.log('Seeding done!');
        process.exit(0);
    });