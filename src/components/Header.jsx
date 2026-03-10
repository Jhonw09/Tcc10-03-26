import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Header.css'

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userPhoto, setUserPhoto] = useState(null)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    // Verificar se usuário está logado
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const photo = localStorage.getItem('userPhoto')
    const name = localStorage.getItem('userName') || 'Perfil'
    setIsLoggedIn(loggedIn)
    setUserPhoto(photo)
    setUserName(name)
  }, [location])
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      
      setScrolled(scrollTop > 20)
      setScrollProgress(progress)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [menuOpen])

  if (location.pathname === '/login') {
    return null
  }
  
  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div 
        className="scroll-progress" 
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="header-container">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <img src="/images/2.png" alt="Logo" />
          </div>
          <span className="logo-text">StudyConnect</span>
        </Link>
        
        {/* Menu Desktop - sempre visível */}
        <nav className="nav desktop">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            <span>Início</span>
          </Link>
          <Link to="/courses" className={`nav-link ${location.pathname === '/courses' ? 'active' : ''}`}>
            <span>Cursos</span>
          </Link>
          <Link to="/materials" className={`nav-link ${location.pathname === '/materials' ? 'active' : ''}`}>
            <span>Materiais</span>
          </Link>
          <Link to="/community" className={`nav-link ${location.pathname === '/community' ? 'active' : ''}`}>
            <span>Comunidade</span>
          </Link>
        </nav>

        {/* Menu Mobile */}
        <nav className={`nav mobile ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
            <span>Início</span>
          </Link>
          <Link to="/courses" className={`nav-link ${location.pathname === '/courses' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
            <span>Cursos</span>
          </Link>
          <Link to="/materials" className={`nav-link ${location.pathname === '/materials' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
            <span>Materiais</span>
          </Link>
          <Link to="/community" className={`nav-link ${location.pathname === '/community' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
            <span>Comunidade</span>
          </Link>
          {isLoggedIn && (
            <Link to="/profile" className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginRight: '0.5rem' }}>
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Perfil</span>
            </Link>
          )}
        </nav>
        
        <div className="header-actions">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="btn-login">Entrar</Link>
              <Link to="/login" className="btn-primary">
                <span>Começar</span>
              </Link>
            </>
          ) : (
            <Link to="/profile" className={`btn-profile ${location.pathname === '/profile' ? 'active' : ''}`}>
              {userPhoto ? (
                <img src={userPhoto} alt="Perfil" className="profile-photo" />
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              <span>{userName}</span>
            </Link>
          )}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span className={menuOpen ? 'open' : ''}></span>
            <span className={menuOpen ? 'open' : ''}></span>
            <span className={menuOpen ? 'open' : ''}></span>
          </button>
        </div>
      </div>
    </header>
  )
}
