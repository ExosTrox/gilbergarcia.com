# Gilbert Garcia Blog

A modern, fast, and responsive blog built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ⚡ Built with Next.js 14 for optimal performance
- 📝 MDX support for rich content creation
- 🎨 Styled with Tailwind CSS for beautiful, responsive design
- 🔍 SEO optimized with meta tags and structured data
- 📱 Mobile-first responsive design
- 🚀 Static site generation for fast loading
- 💻 TypeScript for type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gilbergarcia.com.git
cd gilbergarcia.com
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Project Structure

```
├── src/
│   ├── app/           # Next.js app router pages
│   ├── components/    # React components
│   ├── lib/          # Utility functions
│   ├── types/        # TypeScript types
│   └── content/      # Blog posts (MDX files)
├── public/           # Static assets
└── package.json      # Dependencies and scripts
```

## Adding Blog Posts

Create new blog posts in `src/content/posts/` as `.mdx` files:

```mdx
---
title: 'Your Post Title'
date: '2024-01-30'
excerpt: 'A brief description of your post'
tags: ['tag1', 'tag2']
author: 'Your Name'
---

Your content here...
```

## Deployment

The site is configured for deployment to GitHub Pages. Push to the `main` branch to trigger automatic deployment.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MDX](https://mdxjs.com/)
- [React](https://reactjs.org/)

## License

MIT License

## Contact

Visit [gilbergarcia.com](https://gilbergarcia.com) or use the contact form on the website.
