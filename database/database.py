
from supabase import create_client,Client

##
from utils.security import verify_password

SUPABASE_URL = "https://iqnyabathkjaqzqommeh.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxbnlhYmF0aGtqYXF6cW9tbWVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NzM0NjMsImV4cCI6MjA1ODQ0OTQ2M30.khz65rw2AwOb1paOP4JsZWCqyNqMQPKkY22hB2SDBIk"
supabase: Client =  create_client(SUPABASE_URL, SUPABASE_KEY)



