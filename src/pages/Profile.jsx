import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CustomAlert from '../components/CustomAlert'
import { atualizarUsuario, deletarUsuario, getCertificados } from '../services/api'
import './Profile.css'

export default function Profile() {
  const navigate = useNavigate()
  const [alert, setAlert] = useState(null)
  const [formData, setFormData] = useState({
    name: localStorage.getItem('userName') || 'Usuário',
    email: localStorage.getItem('userEmail') || 'usuario@email.com',
    password: ''
  })
  const [isEditing, setIsEditing] = useState(false)
  const [photoPreview, setPhotoPreview] = useState(localStorage.getItem('userPhoto') || '/images/2.png')
  const [certificados, setCertificados] = useState([])
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    if (userId) {
      getCertificados(userId)
        .then(data => setCertificados(Array.isArray(data) ? data : []))
        .catch(() => {})
    }
  }, [userId])

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false')
    setAlert({ message: 'Logout realizado com sucesso!', type: 'success' })
    setTimeout(() => navigate('/'), 1500)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPhotoPreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (userId) {
      try {
        await atualizarUsuario(userId, {
          nome: formData.name,
          email: formData.email,
          ...(formData.password && { senha: formData.password })
        })
      } catch {}
    }
    localStorage.setItem('userName', formData.name)
    localStorage.setItem('userEmail', formData.email)
    if (photoPreview) localStorage.setItem('userPhoto', photoPreview)
    setAlert({ message: 'Perfil atualizado com sucesso!', type: 'success' })
    setIsEditing(false)
  }

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
      if (userId) {
        try { await deletarUsuario(userId) } catch {}
      }
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('userName')
      localStorage.removeItem('userEmail')
      localStorage.removeItem('userPhoto')
      localStorage.removeItem('authToken')
      localStorage.removeItem('userId')
      setAlert({ message: 'Conta excluída com sucesso!', type: 'success' })
      setTimeout(() => navigate('/'), 1500)
    }
  }

  return (
    <div className="profile-page">
      {alert && <CustomAlert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">
              <img src={photoPreview} alt="Perfil" />
            </div>
            {isEditing && (
              <label htmlFor="photo-upload" className="photo-upload-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={{ display: 'none' }}
                />
              </label>
            )}
          </div>
          <h1>Meu Perfil</h1>
          <p>Gerencie suas informações</p>
        </div>

        <div className="profile-content">
          <div className="profile-card">
            <div className="card-header">
              <h3>Informações da Conta</h3>
              <button onClick={() => setIsEditing(!isEditing)} className="btn-edit">
                {isEditing ? 'Cancelar' : 'Editar'}
              </button>
            </div>
            
            {isEditing ? (
              <form onSubmit={handleUpdate} className="profile-form">
                <div className="form-group">
                  <label htmlFor="name">Nome</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Nova Senha (deixe em branco para manter)</label>
                  <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" />
                </div>
                <button type="submit" className="btn-save">Salvar Alterações</button>
              </form>
            ) : (
              <div className="profile-info">
                <div className="info-item">
                  <span className="info-label">Nome:</span>
                  <span className="info-value">{formData.name}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">E-mail:</span>
                  <span className="info-value">{formData.email}</span>
                </div>
              </div>
            )}
          </div>

          {certificados.length > 0 && (
            <div className="profile-card">
              <div className="card-header">
                <h3>🎓 Meus Certificados</h3>
              </div>
              <div className="profile-info">
                {certificados.map((cert, i) => (
                  <div key={cert.id || i} className="info-item">
                    <span className="info-label">📜</span>
                    <span className="info-value">{cert.titulo || cert.nome || cert.curso || JSON.stringify(cert)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="profile-actions">
            <button onClick={handleLogout} className="btn-logout">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Sair da conta
            </button>
            <button onClick={handleDelete} className="btn-delete">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 6H5H21M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Excluir conta
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
