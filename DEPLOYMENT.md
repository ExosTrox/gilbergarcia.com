# Production Deployment Guide

## How Posts Work in Production

1. **Local Development**: Posts save to browser's localStorage
2. **Production**: Posts load from `posts.json` file in your GitHub repo
3. **Persistence**: Posts stay forever once committed to GitHub

## Publishing Workflow

### Step 1: Write Posts Locally
1. Access admin panel (triple-click purple dot, password: kga2801)
2. Write and publish your posts
3. Posts automatically save to localStorage

### Step 2: Export Posts for Production
1. Go to Admin Panel → Manage Posts tab
2. Click "Export All" button
3. This downloads a `posts.json` file

### Step 3: Deploy to Production
```bash
# Replace the posts.json file with your exported one
mv ~/Downloads/posts.json ./posts.json

# Commit and push to GitHub
git add posts.json
git commit -m "Update blog posts"
git push origin main
```

### Step 4: Your Posts are Live!
- GitHub Pages will automatically update (takes 2-5 minutes)
- Posts are now permanently stored in your repo
- They will load from posts.json on production site

## How It Works

### In Development (localhost)
- Posts save to localStorage
- Instant updates without commits
- Perfect for drafting and testing

### In Production (GitHub Pages)
1. Site loads posts.json from your repo
2. Merges with any localStorage posts
3. Shows all posts on the homepage
4. Each post has its own URL (#post/post-title)

## Automatic Features

✅ **After Publishing a Post**:
- Automatically redirects to homepage
- Shows success notification
- New post appears immediately
- Scrolls to blog section

✅ **Production Persistence**:
- Posts in posts.json stay forever
- Survive browser clears
- Available to all visitors
- SEO friendly URLs

## Quick Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Test production build locally
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## Important Notes

- Always export posts before deploying
- The posts.json file is your database
- Keep posts.json in version control
- Each deployment preserves all previous posts