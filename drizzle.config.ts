import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

config({ path: '.env' });

export default defineConfig({
    schema: './supabase/functions/_shared/schema.ts',
    out: './supabase/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DB_URL!,
    },
    schemaFilter: ['public'],
    strict: true,
    entities: {
        roles: {
            provider: 'supabase',
        }
    },
});
