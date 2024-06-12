import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://ubihsffvgmgnekkzgwja.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViaWhzZmZ2Z21nbmVra3pnd2phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU3ODc3NjUsImV4cCI6MjAzMTM2Mzc2NX0.H692Rzvyv-R2l4TtrkyoJCDsgFICYhh7Y0TLbRurXvI')