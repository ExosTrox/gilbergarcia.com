export class PostManager {
  constructor() {
    this.posts = [];
    this.container = null;
  }

  init() {
    this.container = document.getElementById('blogPosts');
    this.loadPosts();
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Article view handlers
    window.viewArticle = (index) => this.viewArticle(index);
    window.closeArticle = () => this.closeArticle();
    
    // Write post handlers
    window.savePost = () => this.savePost();
    window.closeWrite = () => this.closeWrite();
  }

  getDefaultPosts() {
    return [
      {
        id: 1,
        date: '16',
        title: '¿Cuál fue el primer lenguaje documentado?',
        content: `El primer lenguaje de programación documentado fue Plankalkül, desarrollado por Konrad Zuse entre 1942 y 1945.

Aunque nunca fue implementado durante su época, Plankalkül fue revolucionario para su tiempo.`
      },
      {
        id: 2,
        date: '19',
        title: 'Libera espacio mental y simplifica tu vida usando el método Bullet Journal',
        content: `El método Bullet Journal, creado por Ryder Carroll, es más que un sistema de organización: es una filosofía de vida minimalista.`
      }
    ];
  }

  loadPosts() {
    try {
      const saved = localStorage.getItem('blogPosts');
      this.posts = saved ? JSON.parse(saved) : this.getDefaultPosts();
      this.renderPosts();
    } catch (error) {
      console.error('Error loading posts:', error);
      this.posts = this.getDefaultPosts();
      this.renderPosts();
    }
  }

  renderPosts() {
    if (!this.container) return;
    
    this.container.innerHTML = this.posts.map((post, index) => `
      <article class="blog-post" onclick="viewArticle(${index})">
        <div class="post-date">${post.date || new Date(post.dateISO || Date.now()).getDate()}</div>
        <div class="post-content">
          <h3 class="post-title">${post.title}</h3>
          ${post.excerpt ? `<p class="post-excerpt">${post.excerpt}</p>` : ''}
        </div>
        ${post.thumbnail ? 
          `<div class="post-thumbnail">
            <img src="${post.thumbnail}" alt="">
          </div>` : ''}
      </article>
    `).join('');
  }

  viewArticle(index) {
    const post = this.posts[index];
    if (!post) return;
    
    const modal = document.getElementById('articleModal');
    const content = document.getElementById('articleContent');
    
    content.innerHTML = `
      <div class="article-date">${post.date || new Date(post.dateISO || Date.now()).getDate()}</div>
      <h1 class="article-title">${post.title}</h1>
      <div class="article-content">
        ${this.formatContent(post.content)}
      </div>
    `;
    
    modal.classList.add('active');
  }

  formatContent(content) {
    return content.split('\n').map(p => {
      if (p.trim()) {
        if (p.startsWith('**') && p.endsWith('**')) {
          return `<h2>${p.slice(2, -2)}</h2>`;
        }
        return `<p>${p}</p>`;
      }
      return '';
    }).join('');
  }

  closeArticle() {
    document.getElementById('articleModal').classList.remove('active');
  }

  savePost() {
    const title = document.getElementById('postTitle').value.trim();
    const content = document.getElementById('postContent').value.trim();
    
    if (!title || !content) {
      alert('Please fill in all fields');
      return;
    }
    
    const newPost = {
      id: Date.now(),
      date: new Date().getDate().toString(),
      dateISO: new Date().toISOString(),
      title: title,
      content: content
    };
    
    this.posts.unshift(newPost);
    localStorage.setItem('blogPosts', JSON.stringify(this.posts));
    this.renderPosts();
    this.closeWrite();
  }

  closeWrite() {
    document.getElementById('writeModal').classList.remove('active');
    document.getElementById('postTitle').value = '';
    document.getElementById('postContent').value = '';
  }

  // For testing purposes
  getPosts() {
    return this.posts;
  }

  addPost(post) {
    this.posts.unshift(post);
    this.renderPosts();
  }

  deletePost(index) {
    this.posts.splice(index, 1);
    localStorage.setItem('blogPosts', JSON.stringify(this.posts));
    this.renderPosts();
  }
}

export default PostManager;