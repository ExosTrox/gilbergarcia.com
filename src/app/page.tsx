import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export default async function HomePage() {
  const posts = await getAllPosts()
  const recentPosts = posts.slice(0, 3)

  return (
    <div className="space-y-12">
      <section className="text-center py-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to My Blog</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Exploring technology, sharing insights, and documenting my journey through code and life.
        </p>
        <Link 
          href="/blog"
          className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Read My Blog
        </Link>
      </section>

      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Recent Posts</h2>
          <Link 
            href="/blog"
            className="text-primary-600 font-medium hover:text-primary-700 transition-colors"
          >
            View all posts →
          </Link>
        </div>
        
        {recentPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-100 rounded-lg">
            <p className="text-gray-600">No posts yet. Check back soon!</p>
          </div>
        )}
      </section>

      <section className="bg-gray-100 rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">About Me</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
          I&apos;m a passionate developer who loves building things with code. 
          This blog is where I share my experiences, learnings, and thoughts on technology and beyond.
        </p>
        <Link 
          href="/about"
          className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          Learn More About Me
        </Link>
      </section>
    </div>
  )
}