import { Link, useLocation } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const location = useLocation()

  if (location.pathname === '/login') {
    return null
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>StudyConnect</h3>
          <p>Plataforma gratuita de ensino online</p>
        </div>
        
        <div className="footer-section">
          <h4>Plataforma</h4>
          <div className="footer-links">
            <Link to="/courses">Cursos</Link>
            <Link to="/materials">Materiais</Link>
            <Link to="/community">Comunidade</Link>
          </div>
        </div>

        <div className="footer-section">
          <h4>Empresa</h4>
          <div className="footer-links">
            <a href="#">Sobre</a>
            <a href="#">Blog</a>
            <a href="#">Contato</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <div className="footer-links">
            <a href="#">Termos</a>
            <a href="#">Privacidade</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 StudyConnect</p>
      </div>
    </footer>
  )
}
