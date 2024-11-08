import { createClient } from '@supabase/supabase-js';  

// const supabaseUrl = process.env.SUPABASE_URL;  
// const supabaseKey = process.env.SUPABASE_KEY;  


const supabaseUrl = 'https://kibfqgrmblyjxwsvdukn.supabase.co';  
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpYmZxZ3JtYmx5anh3c3ZkdWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5Nzg4NTIsImV4cCI6MjA0NjU1NDg1Mn0.CjV6mHNRhIMSLIs4bpx3imVMfTBCq-KnvrV-HFXYgp8';  


const supabase = createClient(supabaseUrl, supabaseKey);

export default ({ app }, inject) => {
    inject('supabase', supabase)
    }