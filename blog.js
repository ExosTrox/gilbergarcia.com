// Blog post loader for static site
(function() {
    // Load posts from localStorage or use defaults
    function loadPosts() {
        const storedPosts = localStorage.getItem('blog_posts');
        if (storedPosts) {
            try {
                return JSON.parse(storedPosts);
            } catch (e) {
                console.error('Error loading posts:', e);
            }
        }
        
        // Default posts if none exist
        return [{
            id: "default",
            title: "Welcome to My Blog",
            content: "This is where I'll share my thoughts on technology, programming, and life. Stay tuned for more content!",
            tags: ["Welcome", "Blog"],
            emoji: "👋",
            readTime: "1 min read",
            date: "December 15, 2024"
        }];
    }

    // Render posts to the page
    function renderPosts() {
        const posts = loadPosts();
        const mainElement = document.querySelector('main');
        
        if (!mainElement) return;

        if (posts.length === 0) {
            mainElement.innerHTML = `
                <article>
                    <div class="post-meta">
                        <div class="post-date">
                            <span class="emoji">📝</span>
                            No posts yet · Check back soon
                        </div>
                    </div>
                    <h2>Coming Soon</h2>
                    <p>New content is on the way. Stay tuned!</p>
                </article>
            `;
            return;
        }

        mainElement.innerHTML = posts.map(post => `
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
        `).join('');
    }

    // Listen for storage changes (when admin updates posts)
    window.addEventListener('storage', function(e) {
        if (e.key === 'blog_posts') {
            renderPosts();
        }
    });

    // Initial render
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderPosts);
    } else {
        renderPosts();
    }
})();