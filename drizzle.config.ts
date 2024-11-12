import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env' });

export default defineConfig({
    schema: './supabase/schema.ts',
    out: './supabase/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DB_URL!,
    },
});
