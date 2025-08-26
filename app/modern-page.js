import ModernClientWrapper from './ModernClientWrapper';

export default function ModernPage() {
  return (
    <>
      <ModernClientWrapper />
      
      <div style={{ position: 'relative', zIndex: 100, minHeight: '100vh' }}>
        <section style={{
          padding: '6rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '4rem'
          }}>
            {[
              {
                title: 'Modern Web Development',
                description: 'Building scalable applications with React, Next.js, and modern JavaScript.',
                icon: '⚡',
                gradient: 'linear-gradient(135deg, #667eea, #764ba2)'
              },
              {
                title: 'UI/UX Design',
                description: 'Creating beautiful, intuitive interfaces that users love.',
                icon: '🎨',
                gradient: 'linear-gradient(135deg, #f093fb, #f5576c)'
              },
              {
                title: 'Performance Optimization',
                description: 'Ensuring blazing-fast load times and smooth user experiences.',
                icon: '🚀',
                gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)'
              },
              {
                title: 'Cloud Architecture',
                description: 'Deploying and scaling applications on AWS, Vercel, and modern platforms.',
                icon: '☁️',
                gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)'
              },
              {
                title: 'API Development',
                description: 'Building robust REST and GraphQL APIs with Node.js and Python.',
                icon: '🔧',
                gradient: 'linear-gradient(135deg, #fa709a, #fee140)'
              },
              {
                title: 'Mobile Development',
                description: 'Creating cross-platform mobile apps with React Native.',
                icon: '📱',
                gradient: 'linear-gradient(135deg, #30cfd0, #330867)'
              }
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  padding: '2rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                className="feature-card"
              >
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                  filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  background: feature.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6'
                }}>
                  {feature.description}
                </p>
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-50%',
                  width: '200%',
                  height: '200%',
                  background: feature.gradient,
                  opacity: '0.1',
                  borderRadius: '50%',
                  filter: 'blur(40px)',
                  transition: 'opacity 0.3s ease'
                }} className="feature-glow" />
              </div>
            ))}
          </div>
        </section>

        <section style={{
          padding: '4rem 2rem',
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '3rem',
              fontWeight: '800',
              marginBottom: '2rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Let's Build Something Amazing
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: 'var(--text-secondary)',
              marginBottom: '3rem',
              lineHeight: '1.8'
            }}>
              Ready to turn your ideas into reality? I'm here to help you create exceptional digital experiences that make a difference.
            </p>
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a
                href="mailto:gilbergarciata@gmail.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1.25rem 2.5rem',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
                }}
                className="cta-button"
              >
                Start a Project
              </a>
              <a
                href="#portfolio"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1.25rem 2.5rem',
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                className="secondary-button"
              >
                View Portfolio
              </a>
            </div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        .feature-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          border-color: rgba(255, 255, 255, 0.2) !important;
        }

        .feature-card:hover .feature-glow {
          opacity: 0.2 !important;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4) !important;
        }

        .secondary-button:hover {
          background: rgba(255, 255, 255, 0.1) !important;
          border-color: rgba(255, 255, 255, 0.3) !important;
        }
      `}</style>
    </>
  );
}