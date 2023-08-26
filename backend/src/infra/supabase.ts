import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config()

export const supabase = createClient('https://ypohusdowusoohwgyplu.supabase.co', process.env.SUPABASE_SECRET_KEY!)
