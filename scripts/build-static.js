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
let css = fs.readFileSync(cssPath, 'utf8');

// Add dark mode styles
const darkModeStyles = `
/* Dark mode styles */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-gradient-1: #0f0f23;
    --bg-gradient-2: #1a1a2e;
    --bg-gradient-3: #16213e;
    --bg-gradient-4: #0f3460;
  }

  body {
    background: linear-gradient(-45deg, var(--bg-gradient-1), var(--bg-gradient-2), var(--bg-gradient-3), var(--bg-gradient-4));
    color: #e5e7eb;
  }

  body::before {
    background: radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%);
  }

  header::after {
    background: linear-gradient(90deg, #8b5cf6 0%, #ec4899 50%, #06b6d4 100%);
  }

  h1 {
    background: linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f9a8d4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    color: #9ca3af;
  }

  article {
    background: rgba(30, 30, 45, 0.9);
    border: 1px solid rgba(139, 92, 246, 0.2);
  }

  article:hover {
    box-shadow: 0 20px 40px rgba(139, 92, 246, 0.25);
    border-color: rgba(139, 92, 246, 0.4);
  }

  h2 {
    color: #f3f4f6;
  }

  article p {
    color: #d1d5db;
  }

  .tag {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.2));
    border: 1px solid rgba(139, 92, 246, 0.3);
    color: #a78bfa;
  }

  .tag:hover {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(168, 85, 247, 0.3));
  }

  .footer-content {
    color: #9ca3af;
  }

  .social-links a {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.15));
    border: 1px solid rgba(139, 92, 246, 0.3);
    color: #a78bfa;
  }
}

/* Manual dark mode class */
body.dark-mode {
  background: linear-gradient(-45deg, #0f0f23, #1a1a2e, #16213e, #0f3460) !important;
  color: #e5e7eb !important;
}

body.dark-mode body::before {
  background: radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%) !important;
}

body.dark-mode header::after {
  background: linear-gradient(90deg, #8b5cf6 0%, #ec4899 50%, #06b6d4 100%) !important;
}

body.dark-mode h1 {
  background: linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f9a8d4 100%) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  background-clip: text !important;
}

body.dark-mode .subtitle {
  color: #9ca3af !important;
}

body.dark-mode article {
  background: rgba(30, 30, 45, 0.9) !important;
  border: 1px solid rgba(139, 92, 246, 0.2) !important;
}

body.dark-mode article:hover {
  box-shadow: 0 20px 40px rgba(139, 92, 246, 0.25) !important;
  border-color: rgba(139, 92, 246, 0.4) !important;
}

body.dark-mode h2 {
  color: #f3f4f6 !important;
}

body.dark-mode article p {
  color: #d1d5db !important;
}

body.dark-mode .tag {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.2)) !important;
  border: 1px solid rgba(139, 92, 246, 0.3) !important;
  color: #a78bfa !important;
}

body.dark-mode .tag:hover {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(168, 85, 247, 0.3)) !important;
}

body.dark-mode .footer-content {
  color: #9ca3af !important;
}

body.dark-mode .social-links a {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.15)) !important;
  border: 1px solid rgba(139, 92, 246, 0.3) !important;
  color: #a78bfa !important;
}

/* Dark mode toggle button */
.theme-toggle {
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(139, 92, 246, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.theme-toggle:hover {
  transform: translateY(-2px) rotate(180deg);
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.3);
}

body.dark-mode .theme-toggle {
  background: rgba(30, 30, 45, 0.9);
  border-color: rgba(139, 92, 246, 0.4);
}

@media (max-width: 640px) {
  .theme-toggle {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
}
`;

css = css + darkModeStyles;

// Generate HTML with dynamic post loading
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
    <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode">
        <span id="themeIcon">🌙</span>
    </button>
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
            <!-- Posts will be loaded dynamically -->
        </main>

        <footer>
            <div class="footer-content">
                <p>© 2024 Gilbert Garcia · Crafted with passion</p>
                <p style="font-size: 0.85rem; opacity: 0.7; margin-top: 0.5rem;">
                    Write posts in <a href="/admin.html" style="color: inherit; text-decoration: underline;">admin panel</a>
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
    
    <script>
        // Dark mode functionality
        (function() {
            const themeToggle = document.getElementById('themeToggle');
            const themeIcon = document.getElementById('themeIcon');
            
            // Check for saved theme preference or use OS preference
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            function setTheme(isDark) {
                if (isDark) {
                    document.body.classList.add('dark-mode');
                    themeIcon.textContent = '☀️';
                    localStorage.setItem('theme', 'dark');
                } else {
                    document.body.classList.remove('dark-mode');
                    themeIcon.textContent = '🌙';
                    localStorage.setItem('theme', 'light');
                }
            }
            
            // Initialize theme
            if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
                setTheme(true);
            } else {
                setTheme(false);
            }
            
            // Toggle theme on button click
            themeToggle.addEventListener('click', function() {
                const isDark = document.body.classList.contains('dark-mode');
                setTheme(!isDark);
            });
            
            // Listen for OS theme changes
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
                if (localStorage.getItem('theme') === null) {
                    setTheme(e.matches);
                }
            });
        })();
        
        // Initialize posts in localStorage if they don't exist
        if (!localStorage.getItem('blog_posts')) {
            const initialPosts = ${JSON.stringify(posts)};
            if (initialPosts.length > 0) {
                localStorage.setItem('blog_posts', JSON.stringify(initialPosts));
            }
        }
    </script>
    <script src="/blog.js"></script>
</body>
</html>`;

// Write index.html to root
fs.writeFileSync(path.join(__dirname, '../index.html'), html);
console.log('✅ Static index.html generated successfully!');
console.log(`📝 Included ${posts.length} posts`);