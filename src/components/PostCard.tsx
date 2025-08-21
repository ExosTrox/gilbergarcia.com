import Link from 'next/link'
import { Post } from '@/types/post'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      {post.coverImage && (
        <img 
          src={post.coverImage} 
          alt={post.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          {post.readingTime && (
            <>
              <span>•</span>
              <span>{post.readingTime}</span>
            </>
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary-600 transition-colors">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="pt-4">
          <Link 
            href={`/blog/${post.slug}`}
            className="text-primary-600 font-medium hover:text-primary-700 transition-colors"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  )
}