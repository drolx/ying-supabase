import { drizzle, type PostgresJsDatabase } from 'npm:drizzle-orm/postgres-js';
import postgres from 'npm:postgres';

const connectionString = Deno.env.get('SUPABASE_DB_URL')!;

const client = postgres(connectionString, { prepare: false });
export const db: PostgresJsDatabase = drizzle(client);
