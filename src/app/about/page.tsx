export const metadata = {
  title: 'About - Gilbert Garcia',
  description: 'Learn more about Gilbert Garcia',
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About Me</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-700 mb-6">
          Hi, I&apos;m Gilbert Garcia! I&apos;m a passionate developer with a love for creating 
          elegant solutions to complex problems.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">My Journey</h2>
          <p className="text-gray-700">
            My journey into programming started with curiosity about how things work. 
            What began as tinkering with code evolved into a career focused on building 
            meaningful applications that make a difference.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What I Do</h2>
          <p className="text-gray-700 mb-4">
            I specialize in full-stack development with a focus on:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Web application development</li>
            <li>Modern JavaScript frameworks (React, Next.js, Node.js)</li>
            <li>Database design and optimization</li>
            <li>Cloud infrastructure and DevOps</li>
            <li>Creating scalable and maintainable code</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Beyond Code</h2>
          <p className="text-gray-700">
            When I&apos;m not coding, you can find me exploring new technologies, contributing 
            to open-source projects, or sharing knowledge through this blog. I believe in 
            continuous learning and the power of community in tech.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Let&apos;s Connect</h2>
          <p className="text-gray-700">
            I&apos;m always interested in new opportunities, collaborations, and interesting 
            conversations. Feel free to reach out if you&apos;d like to work together or just 
            want to say hello!
          </p>
          <div className="flex gap-4 mt-4">
            <a 
              href="https://github.com" 
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com" 
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              LinkedIn
            </a>
            <a 
              href="https://twitter.com" 
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Twitter
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}