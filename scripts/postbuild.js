const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const dirs = ['about', 'blog', 'contact'];
dirs.forEach(dir => {
  const dirPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Copy 404.html to index.html as a fallback
const source404 = path.join(__dirname, '..', 'out', '404.html');
const destIndex = path.join(__dirname, '..', 'index.html');

if (fs.existsSync(source404)) {
  fs.copyFileSync(source404, destIndex);
  console.log('Created index.html from 404.html');
}

// Copy _next directory to root
const sourceNext = path.join(__dirname, '..', 'out', '_next');
const destNext = path.join(__dirname, '..', '_next');

if (fs.existsSync(sourceNext) && !fs.existsSync(destNext)) {
  fs.cpSync(sourceNext, destNext, { recursive: true });
  console.log('Copied _next directory to root');
}

console.log('Post-build script completed');