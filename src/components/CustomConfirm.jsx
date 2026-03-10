import './CustomConfirm.css'

export default function CustomConfirm({ message, onConfirm, onCancel }) {
  return (
    <div className="custom-confirm-overlay" onClick={onCancel}>
      <div className="custom-confirm" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3>Confirmar exclusão</h3>
        <p>{message}</p>
        <div className="confirm-actions">
          <button onClick={onCancel} className="btn-cancel-confirm">Cancelar</button>
          <button onClick={onConfirm} className="btn-confirm">Excluir</button>
        </div>
      </div>
    </div>
  )
}
