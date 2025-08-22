const fs = require('fs');
const path = require('path');

// Read posts from data file
const postsPath = path.join(__dirname, '../data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

// Copy admin.html to root if it exists
const adminSourcePath = path.join(__dirname, '../admin.html');
if (fs.existsSync(adminSourcePath)) {
    // Admin page is already in root, no need to copy
    console.log('✅ Admin page found at /admin.html');
}

// Read CSS
const cssPath = path.join(__dirname, '../app/globals.css');
const css = fs.readFileSync(cssPath, 'utf8');

// Generate HTML
const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gilbert Garcia</title>
    <meta name="description" content="Personal blog by Gilbert Garcia">
    <style>${css}</style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Gilbert Garcia</h1>
            <p class="subtitle">Engineering elegant solutions to complex problems</p>
            <div style="margin-top: 1rem;">
                <a href="/admin.html" style="color: #8b5cf6; text-decoration: none; font-size: 0.9rem; padding: 0.5rem 1rem; background: rgba(139, 92, 246, 0.1); border-radius: 8px; display: inline-block;">
                    🔐 Admin
                </a>
            </div>
        </header>
        
        <main>
            ${posts.length > 0 ? posts.map(post => `
            <article>
                <div class="post-meta">
                    <div class="post-date">
                        <span class="emoji">${post.emoji || '📝'}</span>
                        ${post.date} · ${post.readTime || '5 min read'}
                    </div>
                </div>
                ${post.tags && post.tags.length > 0 ? `
                <div class="tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>` : ''}
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <a href="#" class="read-more">Continue reading</a>
            </article>
            `).join('') : `
            <article>
                <div class="post-meta">
                    <div class="post-date">
                        <span class="emoji">👋</span>
                        December 15, 2024 · 1 min read
                    </div>
                </div>
                <div class="tags">
                    <span class="tag">Welcome</span>
                    <span class="tag">Blog</span>
                </div>
                <h2>Welcome to My Blog</h2>
                <p>This is where I'll share my thoughts on technology, programming, and life. Stay tuned for more content!</p>
                <a href="#" class="read-more">Continue reading</a>
            </article>
            `}
        </main>

        <footer>
            <div class="footer-content">
                <p>© 2024 Gilbert Garcia · Crafted with passion</p>
                <p style="font-size: 0.85rem; opacity: 0.7; margin-top: 0.5rem;">
                    Admin panel available locally only · <a href="https://github.com/gilbergarcia/gilbergarcia.com#-local-admin-system" style="color: inherit; text-decoration: underline;">Learn more</a>
                </p>
            </div>
            <div class="social-links">
                <a href="https://github.com/gilbergarcia" title="GitHub">GH</a>
                <a href="https://linkedin.com/in/gilbergarcia" title="LinkedIn">LI</a>
                <a href="https://twitter.com/gilbergarcia" title="Twitter">TW</a>
                <a href="mailto:contact@gilbergarcia.com" title="Email">@</a>
            </div>
        </footer>
    </div>
</body>
</html>`;

// Write index.html to root
fs.writeFileSync(path.join(__dirname, '../index.html'), html);
console.log('✅ Static index.html generated successfully!');
console.log(`📝 Included ${posts.length} posts`);