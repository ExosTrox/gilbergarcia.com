import { PostManager } from '../js/modules/postManager.js';

describe('PostManager', () => {
  let postManager;
  let mockContainer;

  beforeEach(() => {
    // Set up DOM
    document.body.innerHTML = `
      <div id="blogPosts"></div>
      <div id="articleModal" class="modal">
        <div id="articleContent"></div>
      </div>
      <div id="writeModal" class="modal">
        <input id="postTitle" />
        <textarea id="postContent"></textarea>
      </div>
    `;
    
    // Clear localStorage
    localStorage.clear();
    
    // Create instance
    postManager = new PostManager();
    postManager.init();
    mockContainer = document.getElementById('blogPosts');
  });

  afterEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
  });

  describe('Initialization', () => {
    test('should initialize with default posts when localStorage is empty', () => {
      expect(postManager.posts.length).toBeGreaterThan(0);
      expect(postManager.container).toBe(mockContainer);
    });

    test('should load posts from localStorage if available', () => {
      const testPosts = [
        { id: 1, title: 'Test Post', content: 'Test content', date: '1' }
      ];
      localStorage.setItem('blogPosts', JSON.stringify(testPosts));
      
      postManager.loadPosts();
      
      expect(postManager.posts).toEqual(testPosts);
    });

    test('should handle invalid localStorage data gracefully', () => {
      localStorage.setItem('blogPosts', 'invalid json');
      
      postManager.loadPosts();
      
      expect(postManager.posts.length).toBeGreaterThan(0);
    });
  });

  describe('Rendering Posts', () => {
    test('should render posts to container', () => {
      postManager.posts = [
        { id: 1, title: 'Test Post 1', date: '10' },
        { id: 2, title: 'Test Post 2', date: '20' }
      ];
      
      postManager.renderPosts();
      
      const posts = mockContainer.querySelectorAll('.blog-post');
      expect(posts.length).toBe(2);
      expect(mockContainer.textContent).toContain('Test Post 1');
      expect(mockContainer.textContent).toContain('Test Post 2');
    });

    test('should handle posts with thumbnails', () => {
      postManager.posts = [
        { 
          id: 1, 
          title: 'Post with Thumbnail', 
          date: '15',
          thumbnail: 'test.jpg' 
        }
      ];
      
      postManager.renderPosts();
      
      const thumbnail = mockContainer.querySelector('.post-thumbnail img');
      expect(thumbnail).toBeTruthy();
      expect(thumbnail.src).toContain('test.jpg');
    });
  });

  describe('Viewing Articles', () => {
    test('should display article in modal when clicked', () => {
      postManager.posts = [
        { 
          id: 1, 
          title: 'Test Article', 
          content: 'This is test content',
          date: '25'
        }
      ];
      
      postManager.viewArticle(0);
      
      const modal = document.getElementById('articleModal');
      const content = document.getElementById('articleContent');
      
      expect(modal.classList.contains('active')).toBe(true);
      expect(content.textContent).toContain('Test Article');
      expect(content.textContent).toContain('This is test content');
    });

    test('should format content with markdown-style headers', () => {
      postManager.posts = [
        { 
          id: 1, 
          title: 'Test', 
          content: '**Header**\nRegular text',
          date: '1'
        }
      ];
      
      postManager.viewArticle(0);
      
      const content = document.getElementById('articleContent');
      const h2 = content.querySelector('h2');
      
      expect(h2).toBeTruthy();
      expect(h2.textContent).toBe('Header');
    });

    test('should close article modal', () => {
      const modal = document.getElementById('articleModal');
      modal.classList.add('active');
      
      postManager.closeArticle();
      
      expect(modal.classList.contains('active')).toBe(false);
    });
  });

  describe('Creating Posts', () => {
    test('should save new post', () => {
      document.getElementById('postTitle').value = 'New Post';
      document.getElementById('postContent').value = 'New content';
      
      postManager.savePost();
      
      expect(postManager.posts[0].title).toBe('New Post');
      expect(postManager.posts[0].content).toBe('New content');
      
      const saved = JSON.parse(localStorage.getItem('blogPosts'));
      expect(saved[0].title).toBe('New Post');
    });

    test('should not save post with empty fields', () => {
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation();
      document.getElementById('postTitle').value = '';
      document.getElementById('postContent').value = 'Content';
      
      const initialLength = postManager.posts.length;
      postManager.savePost();
      
      expect(postManager.posts.length).toBe(initialLength);
      expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');
      
      alertSpy.mockRestore();
    });

    test('should clear form after saving', () => {
      const titleInput = document.getElementById('postTitle');
      const contentInput = document.getElementById('postContent');
      
      titleInput.value = 'Test';
      contentInput.value = 'Content';
      
      postManager.savePost();
      
      expect(titleInput.value).toBe('');
      expect(contentInput.value).toBe('');
    });
  });

  describe('Managing Posts', () => {
    test('should add post programmatically', () => {
      const newPost = { id: 999, title: 'Added Post', content: 'Content' };
      
      postManager.addPost(newPost);
      
      expect(postManager.posts[0]).toEqual(newPost);
    });

    test('should delete post by index', () => {
      postManager.posts = [
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' },
        { id: 3, title: 'Post 3' }
      ];
      
      postManager.deletePost(1);
      
      expect(postManager.posts.length).toBe(2);
      expect(postManager.posts.find(p => p.id === 2)).toBeUndefined();
    });

    test('should get all posts', () => {
      const posts = postManager.getPosts();
      expect(Array.isArray(posts)).toBe(true);
      expect(posts).toBe(postManager.posts);
    });
  });
});