import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://xjezrevhhmvhyncbpglv.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqZXpyZXZoaG12aHluY2JwZ2x2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyODc3ODEsImV4cCI6MjA5Mjg2Mzc4MX0.nljrfjZKY76Pv9NFuJouA79FRuQ8OwZWS4vFqrDS-Z0"

export const supabase = createClient(supabaseUrl, supabaseKey)