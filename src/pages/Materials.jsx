import { useState, useEffect, useRef } from 'react'
import CustomAlert from '../components/CustomAlert'
import { getMateriais } from '../services/api'
import './Materials.css'

export default function Materials() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('todos')
  const [selectedMaterial, setSelectedMaterial] = useState(null)
  const [alert, setAlert] = useState(null)
  const observerRef = useRef(null)
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

  const [apiMaterials, setApiMaterials] = useState([])

  useEffect(() => {
    getMateriais()
      .then(data => setApiMaterials(Array.isArray(data) ? data : []))
      .catch(() => {})

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

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const materials = [
    { 
      id: 1, 
      title: 'Gramática Completa da Língua Portuguesa', 
      type: 'PDF', 
      size: '4.5 MB', 
      category: 'Português', 
      downloads: 18450, 
      rating: 4.9,
      description: 'Guia completo de gramática: sintaxe, morfologia, semântica, ortografia e pontuação com exemplos práticos.',
      topics: ['Sintaxe', 'Morfologia', 'Semântica', 'Ortografia', 'Pontuação', 'Concordância'],
      exercises: [
        { question: 'O que é sujeito?', answer: 'Termo sobre o qual se declara algo, com o qual o verbo concorda.' },
        { question: 'Diferença entre dígrafo e encontro consonantal?', answer: 'Dígrafo: duas letras, um som (ch, lh). Encontro consonantal: duas consoantes, dois sons (br, pr).' },
        { question: 'O que é predicado verbal?', answer: 'Predicado cujo núcleo é um verbo significativo (ação, fenômeno, processo).' }
      ]
    },
    { 
      id: 2, 
      title: 'Redação para ENEM e Vestibulares', 
      type: 'PDF', 
      size: '3.8 MB', 
      category: 'Português', 
      downloads: 22340, 
      rating: 4.9,
      description: 'Técnicas de redação dissertativa-argumentativa, estrutura, coesão, coerência e repertório sociocultural.',
      topics: ['Estrutura', 'Argumentação', 'Coesão', 'Coerência', 'Proposta de Intervenção', 'Repertório'],
      exercises: [
        { question: 'Quantos parágrafos deve ter uma redação ENEM?', answer: 'Geralmente 4: introdução, 2 desenvolvimentos e conclusão com proposta de intervenção.' },
        { question: 'O que é coesão textual?', answer: 'Conexão entre as partes do texto através de conectivos e referências.' },
        { question: 'O que é repertório sociocultural?', answer: 'Conhecimentos de áreas diversas (história, filosofia, sociologia) para fundamentar argumentos.' }
      ]
    },
    { 
      id: 3, 
      title: 'Literatura Brasileira - Escolas Literárias', 
      type: 'PDF', 
      size: '6.2 MB', 
      category: 'Português', 
      downloads: 15780, 
      rating: 4.8,
      description: 'Panorama completo das escolas literárias brasileiras: do Quinhentismo ao Modernismo.',
      topics: ['Barroco', 'Arcadismo', 'Romantismo', 'Realismo', 'Modernismo', 'Autores'],
      exercises: [
        { question: 'Características do Romantismo?', answer: 'Subjetivismo, idealização, nacionalismo, natureza, sentimentalismo.' },
        { question: 'Diferença entre Realismo e Naturalismo?', answer: 'Realismo foca no psicológico, Naturalismo no determinismo e cientificismo.' },
        { question: 'Principais autores modernistas?', answer: 'Mário de Andrade, Oswald de Andrade, Carlos Drummond de Andrade, Cecília Meireles.' }
      ]
    },
    { 
      id: 4, 
      title: 'Matemática Básica - Fundamentos', 
      type: 'PDF', 
      size: '5.1 MB', 
      category: 'Matemática', 
      downloads: 24560, 
      rating: 4.9,
      description: 'Operações fundamentais, frações, potenciação, radiciação, equações e sistemas lineares.',
      topics: ['Operações Básicas', 'Frações', 'Potenciação', 'Radiciação', 'Equações', 'Sistemas'],
      exercises: [
        { question: 'Como resolver equação do 1º grau?', answer: 'Isolar a incógnita: 2x + 4 = 10 → 2x = 6 → x = 3' },
        { question: 'O que é MMC?', answer: 'Mínimo Múltiplo Comum: menor número divisível por dois ou mais números.' },
        { question: 'Como simplificar frações?', answer: 'Dividir numerador e denominador pelo MDC: 12/18 = 2/3' }
      ]
    },
    { 
      id: 5, 
      title: 'Geometria Plana e Espacial', 
      type: 'PDF', 
      size: '7.3 MB', 
      category: 'Matemática', 
      downloads: 19870, 
      rating: 4.8,
      description: 'Áreas, perímetros, volumes, teorema de Pitágoras, trigonometria e geometria analítica.',
      topics: ['Áreas', 'Perímetros', 'Volumes', 'Pitágoras', 'Trigonometria', 'Geometria Analítica'],
      exercises: [
        { question: 'Fórmula da área do círculo?', answer: 'A = πr² (pi vezes raio ao quadrado)' },
        { question: 'Teorema de Pitágoras?', answer: 'a² = b² + c² (hipotenusa ao quadrado = soma dos catetos ao quadrado)' },
        { question: 'Volume do cilindro?', answer: 'V = πr²h (área da base vezes altura)' }
      ]
    },
    { 
      id: 6, 
      title: 'Funções e Gráficos', 
      type: 'PDF', 
      size: '4.9 MB', 
      category: 'Matemática', 
      downloads: 17230, 
      rating: 4.7,
      description: 'Funções do 1º e 2º grau, exponenciais, logarítmicas, trigonométricas e análise de gráficos.',
      topics: ['Função Afim', 'Função Quadrática', 'Exponencial', 'Logaritmo', 'Trigonométrica', 'Gráficos'],
      exercises: [
        { question: 'O que é função?', answer: 'Relação entre conjuntos onde cada elemento do domínio tem único correspondente na imagem.' },
        { question: 'Como encontrar vértice da parábola?', answer: 'Xv = -b/2a e Yv = -Δ/4a' },
        { question: 'Propriedade dos logaritmos?', answer: 'log(a·b) = log(a) + log(b)' }
      ]
    },
    { 
      id: 7, 
      title: 'Análise Sintática Completa', 
      type: 'PDF', 
      size: '3.6 MB', 
      category: 'Português', 
      downloads: 13450, 
      rating: 4.8,
      description: 'Termos essenciais, integrantes e acessórios da oração. Período simples e composto.',
      topics: ['Sujeito', 'Predicado', 'Complementos', 'Adjuntos', 'Orações Subordinadas', 'Coordenadas'],
      exercises: [
        { question: 'O que é objeto direto?', answer: 'Complemento verbal sem preposição obrigatória.' },
        { question: 'Diferença entre adjunto adnominal e complemento nominal?', answer: 'Adjunto: caracteriza substantivo. Complemento: completa sentido de substantivo abstrato.' },
        { question: 'O que é aposto?', answer: 'Termo que explica, resume ou especifica outro termo.' }
      ]
    },
    { 
      id: 8, 
      title: 'Estatística e Probabilidade', 
      type: 'PDF', 
      size: '5.7 MB', 
      category: 'Matemática', 
      downloads: 16890, 
      rating: 4.8,
      description: 'Média, mediana, moda, desvio padrão, probabilidade, análise combinatória e gráficos estatísticos.',
      topics: ['Medidas Centrais', 'Dispersão', 'Probabilidade', 'Combinatória', 'Gráficos', 'Análise de Dados'],
      exercises: [
        { question: 'Como calcular média aritmética?', answer: 'Soma de todos os valores dividida pela quantidade de valores.' },
        { question: 'O que é mediana?', answer: 'Valor central quando os dados estão ordenados.' },
        { question: 'Fórmula da probabilidade?', answer: 'P = casos favoráveis / casos possíveis' }
      ]
    },
    { 
      id: 9, 
      title: 'Templates Profissionais de UI/UX', 
      type: 'FIGMA', 
      size: '12.5 MB', 
      category: 'Design', 
      downloads: 23410, 
      rating: 4.9,
      description: 'Coleção de templates modernos para landing pages, dashboards e aplicativos mobile.',
      topics: ['Design System', 'Componentes', 'Layouts', 'Tipografia', 'Cores', 'Icones'],
      exercises: [
        { question: 'O que é um Design System?', answer: 'Conjunto de padrões, componentes e diretrizes para manter consistência visual.' },
        { question: 'Qual a diferença entre UI e UX?', answer: 'UI é a interface visual, UX é a experiência completa do usuário.' },
        { question: 'O que é hierarquia visual?', answer: 'Organização de elementos para guiar a atenção do usuário.' }
      ]
    }
  ]

  const fileTypes = ['todos', 'PDF', 'FIGMA']

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'todos' || material.type === filterType
    return matchesSearch && matchesType
  })

  const handleDownload = (material) => {
    if (!isLoggedIn) {
      setAlert({ message: 'Faça login para baixar materiais!', type: 'warning' })
      return
    }
    setSelectedMaterial(material)
  }

  const generateMaterial = (material) => {
    const content = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>${material.title}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.8; max-width: 800px; margin: 0 auto; background: #f9fafb; }
    h1 { color: #3B82F6; border-bottom: 3px solid #3B82F6; padding-bottom: 15px; }
    h2 { color: #8B5CF6; margin-top: 30px; }
    .info { background: #e0f2fe; padding: 15px; border-radius: 8px; margin: 20px 0; }
    .topic { background: #fff; padding: 12px; margin: 10px 0; border-left: 4px solid #3B82F6; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .exercise { background: #fef3c7; padding: 20px; margin: 20px 0; border-radius: 8px; }
    .question { font-weight: bold; color: #1e40af; font-size: 1.1em; }
    .answer { margin-top: 10px; padding: 10px; background: white; border-radius: 5px; }
  </style>
</head>
<body>
  <h1>${material.title}</h1>
  <div class="info">
    <p><strong>Categoria:</strong> ${material.category}</p>
    <p><strong>Tipo:</strong> ${material.type}</p>
    <p>${material.description}</p>
  </div>
  <h2>📚 Tópicos Abordados</h2>
  ${material.topics.map(topic => `<div class="topic">✓ ${topic}</div>`).join('')}
  <h2>❓ Questões e Exercícios</h2>
  ${material.exercises.map((ex, i) => `
    <div class="exercise">
      <div class="question">${i + 1}. ${ex.question}</div>
      <div class="answer"><strong>💡 Resposta:</strong> ${ex.answer}</div>
    </div>
  `).join('')}
  <hr style="margin: 40px 0;">
  <p style="text-align: center; color: #6b7280;">📖 Material gerado por StudyConnect - Plataforma de Ensino Gratuito</p>
</body>
</html>`
    
    // Gerar PDF usando window.print
    const printWindow = window.open('', '_blank')
    printWindow.document.write(content)
    printWindow.document.close()
    
    // Aguardar carregamento e abrir diálogo de impressão/salvar PDF
    setTimeout(() => {
      printWindow.print()
    }, 500)
    
    setAlert({ message: `Material aberto! Use Ctrl+P ou Salvar como PDF no navegador.`, type: 'success' })
    setTimeout(() => setSelectedMaterial(null), 1500)
  }

  return (
    <div className="materials-page">
      {alert && <CustomAlert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      
      {selectedMaterial && (
        <div className="material-modal" onClick={() => setSelectedMaterial(null)}>
          <div className="material-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedMaterial(null)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            
            <div className="modal-header">
              <div className="modal-type">{selectedMaterial.type}</div>
              <h2>{selectedMaterial.title}</h2>
              <p>{selectedMaterial.description}</p>
            </div>

            <div className="modal-section">
              <h3>Tópicos Abordados</h3>
              <div className="topics-grid">
                {selectedMaterial.topics.map((topic, i) => (
                  <div key={i} className="topic-tag">{topic}</div>
                ))}
              </div>
            </div>

            <div className="modal-section">
              <h3>Questões e Exercícios</h3>
              <div className="exercises-list">
                {selectedMaterial.exercises.map((exercise, i) => (
                  <details key={i} className="exercise-item">
                    <summary>{exercise.question}</summary>
                    <p>{exercise.answer}</p>
                  </details>
                ))}
              </div>
            </div>

            <button className="btn-download-modal" onClick={() => generateMaterial(selectedMaterial)}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2V14M10 14L5 9M10 14L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 18H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>Baixar Material para Leitura</span>
            </button>
          </div>
        </div>
      )}
      
      <div className="materials-hero">
        <div className="hero-bg-pattern"></div>
        <div className="materials-hero-content reveal">
          <h1>Biblioteca de Materiais</h1>
          <p>Recursos gratuitos para complementar seu aprendizado</p>
          <div className="search-container">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M19 19L14.65 14.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Buscar materiais..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      <div className="materials-container">
        <div className="materials-filters">
          {fileTypes.map(type => (
            <button
              key={type}
              className={`filter-btn ${filterType === type ? 'active' : ''}`}
              onClick={() => setFilterType(type)}
            >
              <span>{type}</span>
            </button>
          ))}
        </div>

        <div className="materials-grid">
          {filteredMaterials.map((material, index) => (
            <div 
              key={material.id} 
              className="material-card reveal"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="material-header">
                <div className="material-type">{material.type}</div>
                <div className="material-size">{material.size}</div>
              </div>
              
              <div className="material-body">
                <h3>{material.title}</h3>
                <p className="material-category">{material.category}</p>
                
                <div className="material-stats">
                  <div className="stat">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1L10 5.5L15 6L11.5 9.5L12.5 15L8 12.5L3.5 15L4.5 9.5L1 6L6 5.5L8 1Z" fill="currentColor"/>
                    </svg>
                    <span>{material.rating}</span>
                  </div>
                  <div className="stat">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2V14M8 14L3 9M8 14L13 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{material.downloads.toLocaleString()}</span>
                  </div>
                </div>

                <button className="download-btn" onClick={() => handleDownload(material)}>
                  <span>Ver detalhes</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
