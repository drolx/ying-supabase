import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { Database } from "../_shared/database.types.ts";

Deno.serve(async (req) => {
  // NOTE: Edge Functions specific tests
  console.log(`Triggred ${req.url} function`);

  const { q } = await req.json();
  const serviceUrl = Deno.env.get('EDGE_URL')!;
  const serviceKey = Deno.env.get('EDGE_KEY')!;
  const authorization = req.headers.get('Authorization')!;

  const supabase = createClient<Database>(serviceUrl, serviceKey,
    { global: { headers: { Authorization: authorization } } }
  );
  
  // TODO: Resolve possible solution for anonymous auth.
  // const { error } = await supabase.auth.signInWithPassword({ email: 'test@test.com', password: '' });
  // if (!error) {
  //   const { data, error } = await supabase.auth.getUser();
  //   if (error) throw error;
  //   else {
  //     console.log(data.user);
  //   }
  // }

  const { data } = await supabase.from('tags').select('*').eq('name', q);
  const output = {
    query: q,
    data,
  }

  return new Response(
    JSON.stringify(output),
    { headers: { "Content-Type": "application/json" } },
  )
});
