const BASE_URL = 'https://studyconnect-8bfr.onrender.com/api/v1'

async function request(path, options = {}) {
  const token = localStorage.getItem('authToken')
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  })
  if (!res.ok) throw new Error(`Erro ${res.status}`)
  return res.json()
}

// Cursos
export const getCursos = () => request('/cursos')
export const getCurso = (id) => request(`/cursos/${id}`)

// Materiais
export const getMateriais = () => request('/materiais')
export const getMaterial = (id) => request(`/materiais/${id}`)

// Usuários
export const loginUsuario = (email, senha) =>
  request('/usu%C3%A1rios', { method: 'POST', body: JSON.stringify({ email, senha }) })

export const cadastrarUsuario = (nome, email, senha) =>
  request('/usu%C3%A1rios', { method: 'POST', body: JSON.stringify({ nome, email, senha }) })

export const atualizarUsuario = (id, dados) =>
  request(`/usu%C3%A1rios/${id}`, { method: 'PUT', body: JSON.stringify(dados) })

export const deletarUsuario = (id) =>
  request(`/usu%C3%A1rios/${id}`, { method: 'DELETE' })

// Certificados
export const getCertificados = (usuarioId) =>
  request(`/certificados${usuarioId ? `?usuarioId=${usuarioId}` : ''}`)

export const getCertificado = (id) => request(`/certificados/${id}`)
