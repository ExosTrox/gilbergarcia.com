# Gilbert Garcia's Blog

A static blog with client-side admin panel for GitHub Pages.

## 🌐 Production (GitHub Pages)
- **URL**: https://gilbergarcia.com
- **Admin**: https://gilbergarcia.com/admin.html
- **Type**: Static HTML with client-side JavaScript admin
- **Password**: kga2801

## 💻 Local Admin System
The admin panel only works locally on your computer:

1. **Clone the repo**:
   ```bash
   git clone https://github.com/yourusername/gilbergarcia.com.git
   cd gilbergarcia.com
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the admin system**:
   ```bash
   npm run dev
   ```

4. **Access admin panel**:
   - Go to: http://localhost:3000/admin/login
   - Password: (check .env.local)

## 📝 Publishing Workflow

### Option 1: Production Admin (Instant Updates!)
1. **Write posts online**:
   - Go to https://gilbergarcia.com/admin.html
   - Login with password: kga2801
   - Write and publish posts
   - **Posts appear instantly on the site!** (stored in browser)

2. **Important**: Posts are saved in your browser's localStorage
   - They persist across visits
   - Clear browser data will delete posts
   - Different browsers = different posts

3. **Backup to Git** (optional but recommended):
   - Open browser console (F12)
   - Run: `copy(localStorage.getItem('blog_posts'))`
   - Save to `data/posts.json` in your repository
   - Run `npm run build:static` and push to GitHub

### Option 2: Local Development
1. **Write posts locally**:
   - Run `npm run dev`
   - Go to http://localhost:3000/admin/login
   - Write and publish posts

2. **Generate static site**:
   ```bash
   npm run build:static
   ```

3. **Deploy to GitHub**:
   ```bash
   git add .
   git commit -m "New blog post"
   git push
   ```

## 🔑 Important Notes

- **Production Admin** - Now available at gilbergarcia.com/admin.html (client-side only)
- **GitHub Pages = Static** - Uses localStorage for admin functionality
- **Sync Required** - Posts must be manually synced from browser to repository

## 🚀 Alternative: Deploy Admin to Vercel

If you want the admin panel online, deploy to Vercel (free):

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repo
4. Deploy (it will handle everything)
5. Access admin at: your-app.vercel.app/admin/login

This way you can write posts from anywhere!

## 📁 Structure

- `index.html` - Static blog for GitHub Pages
- `app/` - Next.js app (admin system)
- `data/posts.json` - Your blog posts
- `scripts/build-static.js` - Generates index.html

## License

© 2025 Gilbert Garcia. All rights reserved.