import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomAlert from '../components/CustomAlert'
import { getCursos } from '../services/api'
import './Courses.css'

export default function Courses() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('todos')
  const [searchTerm, setSearchTerm] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [alert, setAlert] = useState(null)
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [selectedLesson, setSelectedLesson] = useState(null)
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

  const [apiCourses, setApiCourses] = useState([])

  useEffect(() => {
    setIsVisible(true)
    const saved = JSON.parse(localStorage.getItem('enrolledCourses') || '[]')
    setEnrolledCourses(saved)
    getCursos()
      .then(data => setApiCourses(Array.isArray(data) ? data : []))
      .catch(() => {})
  }, [])

  const generateCoursePDF = (course) => {
    const content = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>${course.title} - Material Completo</title>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; padding: 50px; line-height: 1.8; max-width: 900px; margin: 0 auto; background: #f5f5f5; }
    .header { text-align: center; border-bottom: 4px solid #3B82F6; padding-bottom: 30px; margin-bottom: 40px; }
    h1 { color: #1e40af; font-size: 2.5em; margin-bottom: 10px; }
    .instructor { color: #6b7280; font-size: 1.2em; margin: 10px 0; }
    .info-box { background: linear-gradient(135deg, #3B82F6, #8B5CF6); color: white; padding: 25px; border-radius: 12px; margin: 30px 0; }
    .module { background: white; padding: 25px; margin: 25px 0; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-left: 5px solid #3B82F6; }
    .module h2 { color: #3B82F6; margin-top: 0; font-size: 1.8em; }
    .lesson { background: #f9fafb; padding: 15px; margin: 12px 0; border-radius: 8px; border-left: 3px solid #8B5CF6; }
    .lesson-number { background: #3B82F6; color: white; padding: 5px 12px; border-radius: 20px; font-weight: bold; margin-right: 10px; }
    .footer { text-align: center; margin-top: 50px; padding-top: 30px; border-top: 2px solid #e5e7eb; color: #6b7280; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="header">
    <h1>📚 ${course.title}</h1>
    <p class="instructor">👨🏫 ${course.instructor}</p>
    <p>${course.description}</p>
  </div>
  <div class="info-box">
    <p><strong>⏱️ Duração:</strong> ${course.duration} | <strong>📖 Aulas:</strong> ${course.lessons} | <strong>⭐ Avaliação:</strong> ${course.rating}/5.0</p>
    <p><strong>👥 Alunos:</strong> ${course.students.toLocaleString()} | <strong>📊 Nível:</strong> ${course.level}</p>
  </div>
  ${course.modules.map((module, i) => `
    <div class="module">
      <h2>Módulo ${i + 1}: ${module.name}</h2>
      ${module.lessons.map((lesson, j) => `
        <div class="lesson">
          <span class="lesson-number">Aula ${j + 1}</span>
          <strong>${lesson}</strong>
        </div>
      `).join('')}
    </div>
  `).join('')}
  <div class="footer">
    <p><strong>StudyConnect</strong> - Plataforma de Ensino 100% Gratuita</p>
    <p>Material gerado em ${new Date().toLocaleDateString('pt-BR')}</p>
  </div>
</body>
</html>`
    
    const printWindow = window.open('', '_blank')
    printWindow.document.write(content)
    printWindow.document.close()
    setTimeout(() => printWindow.print(), 500)
  }

  const courses = [
    { 
      id: 1, 
      title: 'Português Completo - Gramática e Redação', 
      category: 'Português', 
      level: 'Intermediário', 
      students: 15234, 
      rating: 4.9, 
      lessons: 30, 
      duration: '45h', 
      instructor: 'Profª. Ana Paula Silva', 
      description: 'Domine gramática, interpretação de textos e redação para ENEM e vestibulares.', 
      modules: [
        { name: 'Morfologia', lessons: ['Classes de palavras - 20min', 'Substantivos e adjetivos - 25min', 'Verbos e conjugações - 30min', 'Pronomes - 22min', 'Preposições e conjunções - 25min'] },
        { name: 'Sintaxe', lessons: ['Termos essenciais - 25min', 'Termos integrantes - 28min', 'Termos acessórios - 22min', 'Período composto - 35min', 'Orações subordinadas - 30min'] },
        { name: 'Redação', lessons: ['Estrutura dissertativa - 30min', 'Argumentação - 35min', 'Coesão e coerência - 28min', 'Proposta de intervenção - 32min', 'Prática de redação - 40min'] },
        { name: 'Interpretação', lessons: ['Técnicas de leitura - 25min', 'Figuras de linguagem - 30min', 'Intertextualidade - 28min', 'Gêneros textuais - 32min', 'Questões comentadas - 35min'] },
        { name: 'Literatura', lessons: ['Escolas literárias - 30min', 'Romantismo - 28min', 'Realismo e Naturalismo - 32min', 'Modernismo - 35min', 'Autores brasileiros - 30min'] },
        { name: 'Ortografia', lessons: ['Nova ortografia - 20min', 'Acentuação - 25min', 'Pontuação - 28min', 'Crase - 30min', 'Palavras problemáticas - 22min'] }
      ]
    },
    { 
      id: 2, 
      title: 'Matemática para ENEM e Vestibulares', 
      category: 'Matemática', 
      level: 'Intermediário', 
      students: 18456, 
      rating: 4.9, 
      lessons: 35, 
      duration: '52h', 
      instructor: 'Prof. Carlos Mendes', 
      description: 'Todos os conteúdos de matemática do ensino médio com foco em ENEM e vestibulares.', 
      modules: [
        { name: 'Álgebra', lessons: ['Equações do 1º grau - 20min', 'Equações do 2º grau - 25min', 'Sistemas lineares - 30min', 'Inequações - 22min', 'Funções - 28min'] },
        { name: 'Geometria Plana', lessons: ['Áreas e perímetros - 25min', 'Triângulos - 30min', 'Quadriláteros - 25min', 'Círculos - 28min', 'Teorema de Pitágoras - 30min'] },
        { name: 'Geometria Espacial', lessons: ['Prismas - 28min', 'Pirâmides - 30min', 'Cilindros - 25min', 'Cones - 28min', 'Esferas - 30min'] },
        { name: 'Trigonometria', lessons: ['Razões trigonométricas - 30min', 'Círculo trigonométrico - 32min', 'Funções trigonométricas - 35min', 'Equações trigonométricas - 30min', 'Lei dos senos e cossenos - 28min'] },
        { name: 'Estatística', lessons: ['Medidas centrais - 25min', 'Medidas de dispersão - 28min', 'Gráficos - 30min', 'Probabilidade - 32min', 'Análise combinatória - 35min'] },
        { name: 'Matemática Financeira', lessons: ['Porcentagem - 20min', 'Juros simples - 25min', 'Juros compostos - 30min', 'Descontos - 22min', 'Aplicações práticas - 28min'] }
      ]
    },
    { 
      id: 3, 
      title: 'Desenvolvimento Web Full Stack', 
      category: 'Programação', 
      level: 'Intermediário', 
      students: 12456, 
      rating: 4.9, 
      lessons: 30, 
      duration: '42h', 
      instructor: 'Dr. Carlos Silva', 
      description: 'Aprenda HTML, CSS, JavaScript, React, Node.js e MongoDB do zero ao avançado.', 
      modules: [
        { name: 'HTML5 e CSS3', lessons: ['Introdução ao HTML5 - 15min', 'Estrutura de uma página - 20min', 'Formulários e validação - 25min', 'CSS Grid e Flexbox - 30min', 'Responsividade - 25min'] },
        { name: 'JavaScript ES6+', lessons: ['Variáveis e tipos - 18min', 'Funções e Arrow Functions - 22min', 'Promises e Async/Await - 28min', 'Manipulação do DOM - 25min', 'Fetch API - 20min'] },
        { name: 'React e Hooks', lessons: ['Componentes - 25min', 'Props e State - 30min', 'useState e useEffect - 35min', 'Context API - 28min', 'React Router - 22min'] },
        { name: 'Node.js e Express', lessons: ['Configuração do ambiente - 15min', 'Rotas e Middlewares - 30min', 'APIs RESTful - 35min', 'Autenticação JWT - 40min', 'Upload de arquivos - 25min'] },
        { name: 'MongoDB', lessons: ['Introdução ao NoSQL - 20min', 'CRUD Operations - 30min', 'Mongoose ODM - 35min', 'Relacionamentos - 28min', 'Agregações - 25min'] },
        { name: 'Deploy', lessons: ['Git e GitHub - 20min', 'Heroku Deploy - 25min', 'Vercel Deploy - 20min', 'Variáveis de ambiente - 15min', 'CI/CD - 30min'] }
      ]
    },
    { 
      id: 4, 
      title: 'UI/UX Design Profissional', 
      category: 'Design', 
      level: 'Intermediário', 
      students: 6721, 
      rating: 4.7, 
      lessons: 20, 
      duration: '28h', 
      instructor: 'Marina Oliveira', 
      description: 'Crie interfaces incríveis com Figma, prototipagem e testes de usabilidade.', 
      modules: [
        { name: 'Fundamentos', lessons: ['Princípios de design - 25min', 'Tipografia - 30min', 'Cores - 28min', 'Espaçamento - 22min', 'Hierarquia visual - 25min'] },
        { name: 'Figma', lessons: ['Interface do Figma - 20min', 'Componentes - 35min', 'Auto Layout - 30min', 'Variáveis - 25min', 'Plugins - 20min'] },
        { name: 'Prototipagem', lessons: ['Wireframes - 25min', 'Mockups - 30min', 'Prototipos interativos - 35min', 'Animações - 28min', 'Micro-interações - 22min'] },
        { name: 'Design System', lessons: ['Tokens - 25min', 'Componentes - 30min', 'Documentação - 28min', 'Versionamento - 22min', 'Manutenção - 25min'] }
      ]
    },
    { 
      id: 5, 
      title: 'Marketing Digital Avançado', 
      category: 'Marketing', 
      level: 'Iniciante', 
      students: 9876, 
      rating: 4.6, 
      lessons: 22, 
      duration: '32h', 
      instructor: 'Pedro Santos', 
      description: 'Estratégias completas de marketing digital, SEO, Google Ads e redes sociais.', 
      modules: [
        { name: 'Fundamentos', lessons: ['Marketing digital - 20min', 'Funil de vendas - 25min', 'Persona - 22min', 'Jornada do cliente - 28min', 'Métricas - 25min'] },
        { name: 'SEO', lessons: ['On-page SEO - 30min', 'Off-page SEO - 28min', 'Palavras-chave - 25min', 'Link building - 30min', 'Google Search Console - 27min'] },
        { name: 'Google Ads', lessons: ['Campanhas de busca - 35min', 'Display - 30min', 'Shopping - 28min', 'YouTube Ads - 32min', 'Otimização - 30min'] },
        { name: 'Redes Sociais', lessons: ['Instagram - 30min', 'Facebook - 28min', 'LinkedIn - 25min', 'TikTok - 27min', 'Conteúdo viral - 30min'] }
      ]
    },
    { 
      id: 6, 
      title: 'Python e Machine Learning', 
      category: 'Programação', 
      level: 'Avançado', 
      students: 8934, 
      rating: 4.8, 
      lessons: 25, 
      duration: '38h', 
      instructor: 'Ana Costa', 
      description: 'Domine Python e crie modelos de Machine Learning com TensorFlow e Scikit-learn.', 
      modules: [
        { name: 'Python Básico', lessons: ['Sintaxe e variáveis - 20min', 'Estruturas de dados - 25min', 'Funções - 22min', 'POO - 30min', 'Módulos - 18min'] },
        { name: 'NumPy e Pandas', lessons: ['Arrays NumPy - 25min', 'DataFrames - 30min', 'Limpeza de dados - 28min', 'Transformações - 25min', 'Agregações - 22min'] },
        { name: 'Visualização', lessons: ['Matplotlib - 25min', 'Seaborn - 28min', 'Plotly - 30min', 'Gráficos interativos - 25min', 'Dashboards - 32min'] },
        { name: 'Machine Learning', lessons: ['Regressão Linear - 30min', 'Classificação - 35min', 'Árvores de Decisão - 28min', 'Random Forest - 30min', 'SVM - 27min'] },
        { name: 'Deep Learning', lessons: ['Redes Neurais - 35min', 'TensorFlow - 40min', 'Keras - 35min', 'CNN - 38min', 'Transfer Learning - 32min'] }
      ]
    },
  ]

  const categories = ['todos', 'Português', 'Matemática', 'Programação', 'Design', 'Marketing']

  const filteredCourses = courses.filter(course => {
    const matchesCategory = filter === 'todos' || course.category === filter
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleEnroll = (course) => {
    if (!isLoggedIn) {
      setAlert({ message: 'Faça login para se inscrever!', type: 'warning' })
      setTimeout(() => navigate('/login'), 1500)
      return
    }
    setSelectedCourse(course)
  }

  const confirmEnroll = () => {
    if (!enrolledCourses.includes(selectedCourse.id)) {
      const updated = [...enrolledCourses, selectedCourse.id]
      setEnrolledCourses(updated)
      localStorage.setItem('enrolledCourses', JSON.stringify(updated))
      setAlert({ message: `Inscrito em "${selectedCourse.title}"!`, type: 'success' })
    } else {
      setAlert({ message: 'Você já está inscrito neste curso!', type: 'info' })
    }
    setSelectedCourse(null)
  }

  const generateLessonPDF = (lesson) => {
    const content = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>${lesson.lessonTitle} - Material de Apoio</title>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; padding: 50px; line-height: 1.8; max-width: 900px; margin: 0 auto; background: #f5f5f5; }
    .header { text-align: center; border-bottom: 4px solid #3B82F6; padding-bottom: 30px; margin-bottom: 40px; background: linear-gradient(135deg, #3B82F6, #8B5CF6); color: white; padding: 40px; border-radius: 15px; }
    h1 { font-size: 2.2em; margin-bottom: 10px; }
    .course-info { color: #e0e7ff; margin: 10px 0; }
    .section { background: white; padding: 30px; margin: 25px 0; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    h2 { color: #3B82F6; border-left: 5px solid #3B82F6; padding-left: 15px; }
    .content-box { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8B5CF6; }
    .resource { background: #e0f2fe; padding: 15px; margin: 15px 0; border-radius: 8px; display: flex; align-items: center; gap: 12px; }
    .exercise { background: #fef3c7; padding: 20px; margin: 20px 0; border-radius: 10px; }
    .footer { text-align: center; margin-top: 50px; padding-top: 30px; border-top: 2px solid #e5e7eb; color: #6b7280; }
    ul { line-height: 2; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎬 ${lesson.lessonTitle}</h1>
    <p class="course-info">📚 ${lesson.courseTitle}</p>
    <p class="course-info">👨🏫 ${lesson.instructor}</p>
  </div>
  
  <div class="section">
    <h2>📝 Sobre esta aula</h2>
    <div class="content-box">
      <p>Nesta aula você irá aprender sobre <strong>${lesson.lessonTitle.split(' - ')[0]}</strong>. Conteúdo prático e direto ao ponto para você dominar o assunto.</p>
      <p>Este material complementa o vídeo da aula e serve como referência para seus estudos.</p>
    </div>
  </div>

  <div class="section">
    <h2>🎯 Objetivos de Aprendizagem</h2>
    <ul>
      <li>Compreender os conceitos fundamentais do tema</li>
      <li>Aplicar o conhecimento em situações práticas</li>
      <li>Desenvolver habilidades através de exercícios</li>
      <li>Consolidar o aprendizado com exemplos reais</li>
    </ul>
  </div>

  <div class="section">
    <h2>📚 Recursos da Aula</h2>
    <div class="resource">
      <span style="font-size: 24px;">📄</span>
      <div>
        <strong>Material de apoio em PDF</strong>
        <p style="margin: 5px 0; color: #6b7280;">Apostila completa com teoria e exemplos</p>
      </div>
    </div>
    <div class="resource">
      <span style="font-size: 24px;">💻</span>
      <div>
        <strong>Código fonte dos exemplos</strong>
        <p style="margin: 5px 0; color: #6b7280;">Arquivos práticos para download</p>
      </div>
    </div>
    <div class="resource">
      <span style="font-size: 24px;">✏️</span>
      <div>
        <strong>Exercícios práticos</strong>
        <p style="margin: 5px 0; color: #6b7280;">Atividades para fixação do conteúdo</p>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>💡 Pontos Importantes</h2>
    <div class="content-box">
      <ul>
        <li>Revise o material antes de assistir a aula</li>
        <li>Faça anotações durante o vídeo</li>
        <li>Pratique com os exercícios propostos</li>
        <li>Tire dúvidas no fórum da comunidade</li>
        <li>Revise o conteúdo após concluir a aula</li>
      </ul>
    </div>
  </div>

  <div class="exercise">
    <h2 style="color: #92400e; border: none; padding: 0;">📝 Exercício Prático</h2>
    <p><strong>Desafio:</strong> Aplique os conceitos aprendidos nesta aula em um projeto prático.</p>
    <p><strong>Tempo estimado:</strong> 30-45 minutos</p>
    <p><strong>Dica:</strong> Consulte o material sempre que necessário e não tenha medo de experimentar!</p>
  </div>

  <div class="footer">
    <p><strong>StudyConnect</strong> - Plataforma de Ensino 100% Gratuita</p>
    <p>Material gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</p>
  </div>
</body>
</html>`
    
    const printWindow = window.open('', '_blank')
    printWindow.document.write(content)
    printWindow.document.close()
    setTimeout(() => printWindow.print(), 500)
  }

  const handleLessonClick = (course, moduleIndex, lessonIndex, lessonTitle) => {
    if (!isLoggedIn) {
      setAlert({ message: 'Faça login para acessar as aulas!', type: 'warning' })
      setTimeout(() => navigate('/login'), 1500)
      return
    }
    if (!enrolledCourses.includes(course.id)) {
      setAlert({ message: 'Inscreva-se no curso para acessar as aulas!', type: 'warning' })
      return
    }
    setSelectedLesson({
      courseTitle: course.title,
      moduleIndex,
      lessonIndex,
      lessonTitle,
      instructor: course.instructor
    })
  }

  return (
    <div className="courses-page">
      {alert && <CustomAlert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      
      {selectedLesson && (
        <div className="lesson-modal" onClick={() => setSelectedLesson(null)}>
          <div className="lesson-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedLesson(null)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            
            <div className="lesson-header">
              <div className="lesson-badge">🎬 Aula</div>
              <h2>{selectedLesson.lessonTitle}</h2>
              <p className="lesson-course">{selectedLesson.courseTitle}</p>
              <p className="lesson-instructor">👨🏫 {selectedLesson.instructor}</p>
            </div>

            <div className="video-placeholder">
              <div className="play-button">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="30" stroke="white" strokeWidth="2"/>
                  <path d="M26 20L44 32L26 44V20Z" fill="white"/>
                </svg>
              </div>
              <button 
                className="fullscreen-btn"
                onClick={() => setAlert({ message: 'Modo tela cheia ativado!', type: 'info' })}
                title="Tela cheia"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M2 7V2H7M18 7V2H13M18 13V18H13M2 13V18H7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <p>🎥 Vídeo da aula será carregado aqui</p>
            </div>

            <div className="lesson-content">
              <h3>📝 Sobre esta aula</h3>
              <p>Nesta aula você irá aprender sobre {selectedLesson.lessonTitle.split(' - ')[0]}. Conteúdo prático e direto ao ponto para você dominar o assunto.</p>
              
              <div className="lesson-resources">
                <h4>📚 Recursos da aula</h4>
                <div 
                  className="resource-item" 
                  onClick={() => {
                    generateLessonPDF(selectedLesson)
                    setAlert({ message: 'PDF aberto! Use Ctrl+P para salvar.', type: 'success' })
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M6 2L14 2C15 2 16 3 16 4L16 16C16 17 15 18 14 18L6 18C5 18 4 17 4 16L4 4C4 3 5 2 6 2Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 6L12 6M8 10L12 10M8 14L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>Material de apoio em PDF</span>
                </div>
                <div className="resource-item">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2L3 7L10 12L17 7L10 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M3 12L10 17L17 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
                  <span>Código fonte dos exemplos</span>
                </div>
                <div className="resource-item">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M10 6V10L13 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>Exercícios práticos</span>
                </div>
              </div>
            </div>

            <button className="btn-complete-lesson" onClick={() => {
              setAlert({ message: 'Aula concluída!', type: 'success' })
              setSelectedLesson(null)
            }}>
              <span>Marcar como concluída</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 10L9 12L13 8M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {selectedCourse && (
        <div className="course-modal" onClick={() => setSelectedCourse(null)}>
          <div className="course-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCourse(null)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            
            <div className="modal-header">
              <div className="modal-badge">{selectedCourse.level}</div>
              <h2>{selectedCourse.title}</h2>
              <p className="modal-instructor">👨‍🏫 {selectedCourse.instructor}</p>
              <p>{selectedCourse.description}</p>
            </div>

            <div className="modal-stats">
              <div className="modal-stat">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1L12.5 7L19 7.5L14.5 12L16 19L10 15.5L4 19L5.5 12L1 7.5L7.5 7L10 1Z" fill="currentColor"/>
                </svg>
                <span>{selectedCourse.rating} avaliação</span>
              </div>
              <div className="modal-stat">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M10 6V10L13 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>{selectedCourse.duration}</span>
              </div>
              <div className="modal-stat">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 6L10 3L17 6L10 9L3 6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M3 10L10 13L17 10" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M3 14L10 17L17 14" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
                <span>{selectedCourse.lessons} aulas</span>
              </div>
            </div>

            <div className="modal-section">
              <h3>📚 Módulos e Aulas do Curso</h3>
              <div className="modules-list">
                {selectedCourse.modules.map((module, i) => (
                  <details key={i} className="module-item-expandable">
                    <summary>
                      <span className="module-number">{i + 1}</span>
                      <span className="module-name">{module.name}</span>
                      <span className="module-count">{module.lessons.length} aulas</span>
                    </summary>
                    <div className="lessons-list">
                      {module.lessons.map((lesson, j) => (
                        <div 
                          key={j} 
                          className="lesson-item"
                          onClick={() => handleLessonClick(selectedCourse, i, j, lesson)}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
                            <path d="M6 5L11 8L6 11V5Z" fill="currentColor"/>
                          </svg>
                          <span>{lesson}</span>
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            <button className="btn-enroll-modal" onClick={confirmEnroll}>
              <span>{enrolledCourses.includes(selectedCourse.id) ? 'Já Inscrito' : 'Inscrever-se Gratuitamente'}</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
      
      <div className="courses-hero">
        <div className="hero-bg-pattern"></div>
        <div className={`courses-hero-content ${isVisible ? 'visible' : ''}`}>
          <h1>Explore Nossos Cursos</h1>
          <p>Mais de 500 cursos profissionais para impulsionar sua carreira</p>
          <div className="search-container">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M19 19L14.65 14.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Buscar cursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      <div className="courses-container">
        <div className="courses-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
              <div className="filter-glow"></div>
            </button>
          ))}
        </div>

        <div className="courses-grid">
          {filteredCourses.map((course, index) => (
            <div 
              key={course.id} 
              className="course-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="course-header">
                <div className="course-badge">{course.level}</div>
                <button 
                  className="course-favorite"
                  onClick={(e) => {
                    e.stopPropagation()
                    setAlert({ message: 'Adicionado aos favoritos!', type: 'success' })
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 3.5L11.5 8.5H16.5L12.5 11.5L14 16.5L10 13.5L6 16.5L7.5 11.5L3.5 8.5H8.5L10 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              
              <div className="course-body">
                <h3 onClick={() => handleEnroll(course)} style={{ cursor: 'pointer' }}>{course.title}</h3>
                <p className="course-instructor">{course.instructor}</p>
                
                <div className="course-meta">
                  <span className="meta-item">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M8 4V8L11 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    {course.duration}
                  </span>
                  <span className="meta-item">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 4L8 2L14 4L8 6L2 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                      <path d="M2 8L8 10L14 8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                      <path d="M2 12L8 14L14 12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    </svg>
                    {course.lessons} aulas
                  </span>
                </div>

                <div className="course-stats">
                  <div className="stat" title="Avaliação">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1L10 5.5L15 6L11.5 9.5L12.5 15L8 12.5L3.5 15L4.5 9.5L1 6L6 5.5L8 1Z" fill="currentColor"/>
                    </svg>
                    <span>{course.rating}</span>
                  </div>
                  <div className="stat" title="Alunos inscritos">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="currentColor"/>
                      <path d="M8 10C4 10 0 12 0 14V16H16V14C16 12 12 10 8 10Z" fill="currentColor"/>
                    </svg>
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                </div>

                <button className="enroll-btn" onClick={() => handleEnroll(course)}>
                  <span>{enrolledCourses.includes(course.id) ? 'Continuar' : 'Começar curso'}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="btn-glow"></div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
