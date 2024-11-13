import { config } from 'dotenv';
// import { defineConfig } from 'supabase-drizzle';
import { defineConfig } from "drizzle-kit";

config({ path: '.env' });

export default defineConfig({
    schema: './supabase/schema.ts',
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
    }
    // policies: './policies.config.ts',
});
