import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomAlert from '../components/CustomAlert'
import CustomConfirm from '../components/CustomConfirm'
import './Community.css'

export default function Community() {
  const navigate = useNavigate()
  const [newPost, setNewPost] = useState('')
  const [posts, setPosts] = useState([])
  const [alert, setAlert] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [editingPost, setEditingPost] = useState(null)
  const [editText, setEditText] = useState('')
  const observerRef = useRef(null)
  const userName = localStorage.getItem('userName') || 'Usuário'
  const userPhoto = localStorage.getItem('userPhoto')
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

  useEffect(() => {
    // Carregar posts do localStorage apenas uma vez
    const savedPosts = JSON.parse(localStorage.getItem('communityPosts') || '[]')
    if (savedPosts.length === 0) {
      // Posts iniciais
      const initialPosts = [
        { 
          id: 1, 
          author: 'João Silva', 
          role: 'Desenvolvedor Full Stack',
          content: 'Acabei de concluir o curso de React! Alguém tem dicas de projetos para praticar?', 
          replies: [],
          likes: 24,
          time: new Date().toISOString(),
          photo: null
        },
        { 
          id: 2, 
          author: 'Maria Santos', 
          role: 'Data Scientist',
          content: 'Compartilhando meu projeto final de Data Science! Foi desafiador mas muito gratificante.', 
          replies: [],
          likes: 45,
          time: new Date().toISOString(),
          photo: null
        }
      ]
      setPosts(initialPosts)
      localStorage.setItem('communityPosts', JSON.stringify(initialPosts))
    } else {
      setPosts(savedPosts)
    }
  }, [])

  useEffect(() => {
    // Observer para animações
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

    const elements = document.querySelectorAll('.reveal')
    elements.forEach((el) => {
      observerRef.current.observe(el)
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [posts])

  const handlePublish = () => {
    if (!isLoggedIn) {
      setAlert({ message: 'Faça login para publicar!', type: 'warning' })
      setTimeout(() => navigate('/login'), 1500)
      return
    }
    if (!newPost.trim()) {
      setAlert({ message: 'Escreva algo antes de publicar!', type: 'warning' })
      return
    }
    const post = {
      id: Date.now(),
      author: userName,
      role: 'Membro da Comunidade',
      content: newPost,
      replies: [],
      likes: 0,
      time: new Date().toISOString(),
      photo: userPhoto
    }
    const updatedPosts = [post, ...posts]
    setPosts(updatedPosts)
    localStorage.setItem('communityPosts', JSON.stringify(updatedPosts))
    setNewPost('')
    setAlert({ message: 'Post publicado com sucesso!', type: 'success' })
  }

  const handleLike = (postId) => {
    if (!isLoggedIn) {
      setAlert({ message: 'Faça login para curtir!', type: 'warning' })
      setTimeout(() => navigate('/login'), 1500)
      return
    }
    const updatedPosts = posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    )
    setPosts(updatedPosts)
    localStorage.setItem('communityPosts', JSON.stringify(updatedPosts))
  }

  const handleReply = (postId) => {
    if (!isLoggedIn) {
      setAlert({ message: 'Faça login para responder!', type: 'warning' })
      setTimeout(() => navigate('/login'), 1500)
      return
    }
    if (!replyText.trim()) {
      setAlert({ message: 'Escreva uma resposta!', type: 'warning' })
      return
    }
    const reply = {
      id: Date.now(),
      author: userName,
      content: replyText,
      time: new Date().toISOString(),
      photo: userPhoto
    }
    const updatedPosts = posts.map(post => 
      post.id === postId ? { ...post, replies: [...post.replies, reply] } : post
    )
    setPosts(updatedPosts)
    localStorage.setItem('communityPosts', JSON.stringify(updatedPosts))
    setReplyText('')
    setReplyingTo(null)
    setAlert({ message: 'Resposta enviada!', type: 'success' })
  }

  const handleDelete = (postId) => {
    setConfirmDelete(postId)
  }

  const confirmDeletePost = () => {
    const updatedPosts = posts.filter(post => post.id !== confirmDelete)
    setPosts(updatedPosts)
    localStorage.setItem('communityPosts', JSON.stringify(updatedPosts))
    setConfirmDelete(null)
    setAlert({ message: 'Post excluído!', type: 'success' })
  }

  const handleEdit = (post) => {
    setEditingPost(post.id)
    setEditText(post.content)
  }

  const handleUpdate = (postId) => {
    if (!editText.trim()) {
      setAlert({ message: 'Escreva algo!', type: 'warning' })
      return
    }
    const updatedPosts = posts.map(post => 
      post.id === postId ? { ...post, content: editText } : post
    )
    setPosts(updatedPosts)
    localStorage.setItem('communityPosts', JSON.stringify(updatedPosts))
    setEditingPost(null)
    setEditText('')
    setAlert({ message: 'Post atualizado!', type: 'success' })
  }

  const getTimeAgo = (timestamp) => {
    const now = new Date()
    const postTime = new Date(timestamp)
    const diff = Math.floor((now - postTime) / 1000)
    if (diff < 60) return 'agora'
    if (diff < 3600) return `${Math.floor(diff / 60)}min atrás`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h atrás`
    return `${Math.floor(diff / 86400)}d atrás`
  }

  return (
    <div className="community-page">
      {alert && <CustomAlert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      {confirmDelete && (
        <CustomConfirm
          message="Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita."
          onConfirm={confirmDeletePost}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
      <div className="community-hero">
        <div className="hero-bg-pattern"></div>
        <div className="community-hero-content reveal">
          <h1>Comunidade StudyConnect</h1>
          <p>Conecte-se com milhares de estudantes e compartilhe conhecimento</p>
        </div>
      </div>

      <div className="community-container">
        <div className="new-post-card reveal">
          <div className="post-avatar">
            {userPhoto ? (
              <img src={userPhoto} alt="Avatar" />
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              </svg>
            )}
          </div>
          <div className="new-post-input">
            <textarea
              placeholder="Compartilhe algo com a comunidade..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <button className="publish-btn" onClick={handlePublish}>
              <span>Publicar</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M15 1L7 9M15 1L10 15L7 9M15 1L1 6L7 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="posts-feed">
          {posts.map((post, index) => (
            <div 
              key={post.id} 
              className="post-card reveal"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="post-header">
                <div className="post-avatar">
                  {post.photo ? (
                    <img src={post.photo} alt="Avatar" />
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )}
                </div>
                <div className="post-author-info">
                  <div className="author-name">{post.author}</div>
                  <div className="author-role">{post.role}</div>
                  <div className="post-time">{getTimeAgo(post.time)}</div>
                </div>
                {post.author === userName && (
                  <div className="post-actions-btns">
                    <button className="edit-btn" onClick={() => handleEdit(post)}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13M18.5 2.5C18.8978 2.1022 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.1022 21.5 2.5C21.8978 2.8978 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.1022 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(post.id)}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M3 6H5H21M19 6V20C19 21 18 22 17 22H7C6 22 5 21 5 20V6M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              <p className="post-content">{post.content}</p>
              
              {editingPost === post.id && (
                <div className="edit-input">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows="3"
                  />
                  <div className="edit-actions">
                    <button onClick={() => handleUpdate(post.id)} className="save-btn">Salvar</button>
                    <button onClick={() => setEditingPost(null)} className="cancel-btn">Cancelar</button>
                  </div>
                </div>
              )}
              
              {post.replies.length > 0 && (
                <div className="replies-section">
                  {post.replies.map(reply => (
                    <div key={reply.id} className="reply-item">
                      <div className="reply-avatar">
                        {reply.photo ? (
                          <img src={reply.photo} alt="Avatar" />
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        )}
                      </div>
                      <div className="reply-content">
                        <strong>{reply.author}</strong>
                        <p>{reply.content}</p>
                        <span className="reply-time">{getTimeAgo(reply.time)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {replyingTo === post.id && (
                <div className="reply-input">
                  <input
                    type="text"
                    placeholder="Escreva sua resposta..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleReply(post.id)}
                  />
                  <button onClick={() => handleReply(post.id)}>Enviar</button>
                </div>
              )}
              
              <div className="post-footer">
                <button className="post-action" onClick={() => handleLike(post.id)}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 3.5L11.5 8.5H16.5L12.5 11.5L14 16.5L10 13.5L6 16.5L7.5 11.5L3.5 8.5H8.5L10 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                  <span>{post.likes}</span>
                </button>
                <button 
                  className="post-action" 
                  onClick={() => {
                    if (!isLoggedIn) {
                      setAlert({ message: 'Faça login para comentar!', type: 'warning' })
                      setTimeout(() => navigate('/login'), 1500)
                      return
                    }
                    setReplyingTo(replyingTo === post.id ? null : post.id)
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M18 10C18 14.4183 14.4183 18 10 18C8.5 18 7 17.5 6 17L2 18L3 14C2.5 13 2 11.5 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <span>{post.replies.length} {isLoggedIn ? 'respostas' : 'comentar'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
