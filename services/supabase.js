const { createClient } = require("@supabase/supabase-js");
const { config } = require("../variables");
const supabaseUrl = config.API_URL;
const supabaseKey = config.SUPABASE_KEY;
exports.supabase = createClient(supabaseUrl, supabaseKey);
