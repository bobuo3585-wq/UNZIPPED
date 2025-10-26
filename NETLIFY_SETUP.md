# Netlify Deployment Setup

Your site is showing a white screen because environment variables are missing.

## Required Environment Variables

You MUST add these two environment variables in your Netlify dashboard:

### 1. VITE_SUPABASE_URL
```
https://qbrdwsfelpaklctlujcq.supabase.co
```

### 2. VITE_SUPABASE_ANON_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFicmR3c2ZlbHBha2xjdGx1amNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxMDQ3MDIsImV4cCI6MjA3NTY4MDcwMn0.-665zz5RkbLPkdnzD4CJCj7Sm_dG-36zowRWekVAOx0
```

## How to Add Them

1. Go to https://app.netlify.com
2. Select your site
3. Click "Site configuration" (left sidebar)
4. Click "Environment variables"
5. Click "Add a variable"
6. Add the first variable:
   - Key: `VITE_SUPABASE_URL`
   - Value: (paste the URL above)
7. Click "Add a variable" again
8. Add the second variable:
   - Key: `VITE_SUPABASE_ANON_KEY`
   - Value: (paste the key above)
9. Go to "Deploys" tab
10. Click "Trigger deploy" → "Clear cache and deploy site"

Your site will work after the redeploy completes!
