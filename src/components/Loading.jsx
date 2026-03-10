import './Loading.css'

export default function Loading() {
  return (
    <div className="loading-screen">
      <div className="loading-logo">
        <img src="/images/2.png" alt="Logo" />
      </div>
      <div className="loading-text">Entrando...</div>
      <div className="loading-spinner"></div>
    </div>
  )
}
