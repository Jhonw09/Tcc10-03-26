import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import './Home.css'

export default function Home() {
  const observerRef = useRef(null)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    )

    document.querySelectorAll('.reveal').forEach((el) => {
      observerRef.current.observe(el)
    })

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3)
    }, 5000)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      clearInterval(interval)
    }
  }, [])

  const testimonials = [
    { name: 'Ana Silva', role: 'Desenvolvedora', text: 'Consegui minha primeira vaga como dev em 6 meses!', rating: 5 },
    { name: 'Carlos Santos', role: 'Designer', text: 'A melhor plataforma de ensino que já usei.', rating: 5 },
    { name: 'Maria Costa', role: 'Analista', text: 'Transformei minha carreira com os cursos.', rating: 5 }
  ]

  return (
    <>
      <section className="hero">
        <div className="hero-bg">
          <div className="gradient-sphere sphere-1"></div>
          <div className="gradient-sphere sphere-2"></div>
          <div className="gradient-sphere sphere-3"></div>
        </div>
        <div className="hero-container reveal">
          <div className="hero-badge">
            <span className="badge-pulse"></span>
            <span>Mais de 50 mil alunos já começaram</span>
          </div>
          <h1 className="hero-title">
            Domine novas habilidades.
            <br/>
            <span className="gradient-text">Avançe na carreira.</span>
          </h1>
          <p className="hero-description">
            Aprenda com especialistas do mercado. Cursos práticos, certificados reconhecidos e 100% gratuito.
          </p>
          <div className="hero-buttons">
            <Link to="/courses" className="btn-hero-primary">
              <span>Começar gratuitamente</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <button onClick={() => setShowVideo(true)} className="btn-hero-secondary">
              <span className="play-icon-wrapper">
                <svg className="play-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle className="play-circle" cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2"/>
                  <path className="play-triangle" d="M8 6L14 10L8 14V6Z" fill="currentColor"/>
                </svg>
              </span>
              <span>Ver como funciona</span>
            </button>
          </div>
          <div className="hero-proof">
            <div className="proof-avatars">
              <div className="avatar">A</div>
              <div className="avatar">C</div>
              <div className="avatar">M</div>
              <div className="avatar">+50k</div>
            </div>
            <div className="proof-text">
              <div className="proof-stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#FBBF24">
                    <path d="M8 1L10 5.5L15 6L11.5 9.5L12.5 15L8 12.5L3.5 15L4.5 9.5L1 6L6 5.5L8 1Z"/>
                  </svg>
                ))}
              </div>
              <span>4.9/5 de 12.000+ avaliações</span>
            </div>
          </div>
        </div>
      </section>

      <section className="benefits">
        <div className="benefits-container">
          <div className="benefit-item reveal">
            <div className="benefit-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <span>100% Gratuito</span>
          </div>
          <div className="benefit-item reveal" style={{ transitionDelay: '0.1s' }}>
            <div className="benefit-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <span>Certificados</span>
          </div>
          <div className="benefit-item reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="benefit-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <span>Acesso vitalício</span>
          </div>
          <div className="benefit-item reveal" style={{ transitionDelay: '0.3s' }}>
            <div className="benefit-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21M23 21V19C23 16.7909 21.2091 15 19 15H18M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7ZM19 7C19 9.20914 17.2091 11 15 11C12.7909 11 11 9.20914 11 7C11 4.79086 12.7909 3 15 3C17.2091 3 19 4.79086 19 7Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <span>Comunidade ativa</span>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features-container">
          <div className="section-header reveal">
            <h2>Tudo que você precisa para ter sucesso</h2>
            <p>Ferramentas e recursos profissionais para acelerar seu aprendizado</p>
          </div>
          <div className="features-grid">
            {[
              { icon: 'M12 2L2 7L12 12L22 7L12 2Z M2 17L12 22L22 17 M2 12L12 17L22 12', title: 'Cursos estruturados', desc: 'Trilhas de aprendizado organizadas do básico ao avançado', color: '#3B82F6' },
              { icon: 'M15 10L11 14L9 12M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z', title: 'Projetos práticos', desc: 'Aprenda fazendo com projetos reais do mercado', color: '#8B5CF6' },
              { icon: 'M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z', title: 'Suporte dedicado', desc: 'Tire dúvidas com instrutores e mentores', color: '#EC4899' },
              { icon: 'M13 10V3L4 14H11L11 21L20 10L13 10Z', title: 'Aprenda rápido', desc: 'Método otimizado para aprendizado acelerado', color: '#F59E0B' }
            ].map((feature, index) => (
              <div key={index} className="feature-card reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
                <div className="feature-icon" style={{ background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}CC 100%)` }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d={feature.icon} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="testimonials-container reveal">
          <h2>O que nossos alunos dizem</h2>
          <div className="testimonial-slider">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`testimonial-card ${index === activeTestimonial ? 'active' : ''}`}
              >
                <div className="testimonial-stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="#FBBF24">
                      <path d="M10 1L12.5 7L19 7.5L14.5 12L16 19L10 15.5L4 19L5.5 12L1 7.5L7.5 7L10 1Z"/>
                    </svg>
                  ))}
                </div>
                <p>"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === activeTestimonial ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-container reveal">
          <div className="cta-content">
            <h2>Pronto para começar?</h2>
            <p>Junte-se a 50.000+ estudantes que já estão aprendendo</p>
            <Link to="/login" className="btn-cta">
              <span>Criar conta gratuita</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <p className="cta-note">Sem cartão de crédito • Cancele quando quiser</p>
          </div>
        </div>
      </section>

      {showVideo && (
        <div className="video-modal" onClick={() => setShowVideo(false)}>
          <div className={`video-modal-content ${isFullscreen ? 'fullscreen' : ''}`} onClick={(e) => e.stopPropagation()}>
            <div className="video-controls">
              <button className="video-btn" onClick={() => videoRef.current?.currentTime > 0 && (videoRef.current.currentTime -= 10)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M2.5 10H17.5M2.5 10L8.5 4M2.5 10L8.5 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="video-btn" onClick={() => setIsFullscreen(!isFullscreen)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  {isFullscreen ? (
                    <path d="M4 14H7V17M16 6H13V3M16 14H13V17M4 6H7V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  ) : (
                    <path d="M14 6H17V9M6 14H3V11M14 14H17V11M6 6H3V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  )}
                </svg>
              </button>
              <button className="video-btn" onClick={() => setShowVideo(false)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <video ref={videoRef} controls autoPlay>
              <source src="/videos/MicrosoftTeams-video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </>
  )
}
