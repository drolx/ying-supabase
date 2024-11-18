import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { db } from "../_shared/db.ts";
import { tags } from "../_shared/schema.ts";
import { ilike } from "npm:drizzle-orm";

Deno.serve(async (req) => {
  // NOTE: Direct db queries
  console.log(`Triggred ${req.url} function`);

  let data = []
  const query = db.select().from(tags);

  if(req.method === 'POST') {
    const { name } = await req.json();
    data = data = await query.where(ilike(tags.name, `%${name}%`)).limit(10);
  } else if(req.method === 'GET') {
    data = data = await query.limit(10);
  } else {
    return new Response(null);
  }

  const output = {
    data,
  }

  return new Response(
    JSON.stringify(output),
    { headers: { "Content-Type": "application/json" } },
  )
});
