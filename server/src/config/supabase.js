const { createClient } = require("@supabase/supabase-js");

if(
    !process.env.SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
){
    throw new Error("Supabase environment variables missing.");
}

module.exports = supabase;