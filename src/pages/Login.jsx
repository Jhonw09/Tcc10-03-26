import { useState } from 'react'
import { Link } from 'react-router-dom'
import CustomAlert from '../components/CustomAlert'
import Loading from '../components/Loading'
import './Login.css'

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [alert, setAlert] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true')
      setLoading(false)
      setAlert({ message: isLogin ? 'Login realizado com sucesso!' : 'Conta criada com sucesso!', type: 'success' })
      setTimeout(() => {
        window.location.href = '/'
      }, 500)
    }, 400)
  }

  const handleSocialLogin = (provider) => {
    const urls = {
      'Google': 'https://accounts.google.com/',
      'Facebook': 'https://www.facebook.com/login'
    }
    window.open(urls[provider], '_blank', 'noopener,noreferrer')
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()
    setShowForgotPassword(true)
  }

  const handleResetPassword = (e) => {
    e.preventDefault()
    const email = e.target.resetEmail.value
    if (email) {
      setAlert({ message: `Instruções de recuperação enviadas para ${email}. Verifique sua caixa de entrada e spam.`, type: 'success' })
      setTimeout(() => {
        setShowForgotPassword(false)
      }, 2000)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      {loading && <Loading />}
      <div className="login-page">
      {alert && <CustomAlert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      <div className="login-bg">
        <div className="gradient-orb login-orb-1"></div>
        <div className="gradient-orb login-orb-2"></div>
      </div>

      <div className="login-container">
        <Link to="/" className="login-logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#3B82F6"/>
            <path d="M16 10L19 13H17V19H15V13H13L16 10Z" fill="white"/>
            <rect x="12" y="21" width="8" height="2" rx="1" fill="white"/>
          </svg>
          <span>StudyConnect</span>
        </Link>

        <div className="login-card">
          <div className="login-header">
            <h1>{isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}</h1>
            <p>{isLogin ? 'Entre para continuar aprendendo' : 'Comece sua jornada gratuitamente'}</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Nome completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Digite seu nome"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            {isLogin && (
              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Lembrar de mim</span>
                </label>
                <a href="#" onClick={handleForgotPassword} className="forgot-link">Esqueceu a senha?</a>
              </div>
            )}

            <button type="submit" className="btn-submit" disabled={loading}>
              {isLogin ? 'Entrar' : 'Criar conta'}
            </button>
          </form>

          <div className="login-divider">
            <span>ou continue com</span>
          </div>

          <div className="social-login">
            <button type="button" className="btn-social" onClick={() => handleSocialLogin('Google')}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z" fill="#4285F4"/>
                <path d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.71 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z" fill="#34A853"/>
                <path d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z" fill="#FBBC05"/>
                <path d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.29 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button type="button" className="btn-social" onClick={() => handleSocialLogin('Facebook')}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" fill="#1877F2"/>
              </svg>
              Facebook
            </button>
          </div>

          <div className="login-footer">
            {isLogin ? (
              <p>
                Não tem uma conta?{' '}
                <button onClick={() => setIsLogin(false)} className="toggle-link">
                  Cadastre-se
                </button>
              </p>
            ) : (
              <p>
                Já tem uma conta?{' '}
                <button onClick={() => setIsLogin(true)} className="toggle-link">
                  Fazer login
                </button>
              </p>
            )}
          </div>
        </div>

        <div className="login-features">
          <div className="feature-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>100% Gratuito</span>
          </div>
          <div className="feature-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Certificados</span>
          </div>
          <div className="feature-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>500+ Cursos</span>
          </div>
        </div>
      </div>

      {showForgotPassword && (
        <div className="video-modal" onClick={() => setShowForgotPassword(false)}>
          <div className="forgot-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowForgotPassword(false)}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <div className="forgot-header">
              <div className="forgot-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h2>Esqueceu sua senha?</h2>
              <p>Sem problemas! Digite seu e-mail e enviaremos instruções para redefinir sua senha.</p>
            </div>
            <form onSubmit={handleResetPassword} className="forgot-form">
              <div className="form-group">
                <label htmlFor="resetEmail">E-mail</label>
                <input
                  type="email"
                  id="resetEmail"
                  name="resetEmail"
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <button type="submit" className="btn-submit">
                Enviar instruções
              </button>
              <button type="button" onClick={() => setShowForgotPassword(false)} className="btn-back">
                Voltar ao login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  )
}
