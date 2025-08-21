import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export const dynamic = 'force-static'

export const metadata = {
  title: 'Blog - Gilbert Garcia',
  description: 'All blog posts by Gilbert Garcia',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="space-y-8">
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Thoughts, stories, and ideas about technology, programming, and everything in between.
        </p>
      </header>

      {posts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-100 rounded-lg">
          <p className="text-gray-600 text-lg">No posts available yet.</p>
          <p className="text-gray-500 mt-2">Check back soon for new content!</p>
        </div>
      )}
    </div>
  )
}