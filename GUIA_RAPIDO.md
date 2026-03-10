# 🚀 Guia Rápido - StudyConnect

## Como Executar o Projeto

### Opção 1: Do diretório raiz
```bash
cd "TCC INF3EM"
npm run dev
```

### Opção 2: Do diretório do projeto
```bash
cd "TCC INF3EM/study-connect-plus"
npm run dev
```

## 🎯 Funcionalidades Implementadas

### ✅ Página Inicial (/)
- Hero section com personagens animados
- Estatísticas dinâmicas (50K+ alunos, 500+ cursos, 4.9/5 avaliação)
- 6 cards de features com ícones coloridos
- 6 categorias de cursos
- Carrossel de depoimentos (3 depoimentos)
- CTA final com animação

### ✅ Página de Cursos (/courses)
- 8 cursos completos com detalhes
- Filtros por 6 categorias
- Ordenação (popular, avaliação, recente)
- Busca funcional
- Informações: instrutor, tags, duração, aulas, nível
- Estatísticas: rating, número de alunos

### ✅ Página de Materiais (/materials)
- 8 materiais de estudo
- Filtros por tipo (PDF, ZIP, FIGMA, XLSX, PPTX)
- Busca em tempo real
- Informações: tamanho, páginas, downloads, rating
- Ícones coloridos por tipo

### ✅ Página de Comunidade (/community)
- 4 posts de exemplo
- Sidebar com tópicos em alta (5 tópicos)
- Grupos de estudo (3 grupos)
- Tabs: Feed, Populares, Seguindo
- Sistema de likes e comentários
- Tags nos posts

## 🎨 Paleta de Cores Utilizada

| Cor | Hex | Uso |
|-----|-----|-----|
| Azul Escuro | #0A4D68 | Hero sections, footer |
| Azul Claro | #1CB0F6 | Botões, links, destaques |
| Verde | #58CC02 | Ações positivas, sucesso |
| Roxo | #CE82FF | Design, materiais |
| Laranja | #FF9600 | Marketing, alertas |
| Rosa | #FF6B9D | Comunidade, social |

## 📱 Breakpoints Responsivos

- **Mobile**: < 768px
- **Tablet**: 768px - 968px
- **Desktop**: > 968px

## ⚡ Performance

- Lazy loading de imagens
- Animações otimizadas com CSS
- Componentes React otimizados
- Build otimizado com Vite

## 🎭 Animações Implementadas

1. **Fade In/Out** - Entrada suave de elementos
2. **Slide In** - Deslizamento de conteúdo
3. **Bounce** - Efeito de pulo em ícones
4. **Float** - Flutuação de personagens
5. **Pulse** - Pulsação de backgrounds
6. **Rotate** - Rotação de elementos decorativos
7. **Scale** - Zoom em hover
8. **Pop In** - Aparição de bubbles

## 🔧 Tecnologias e Versões

- React: 19.2.0
- React Router DOM: 7.x
- Vite: 7.3.1
- Node: 16+ recomendado

## 📝 Estrutura de Dados

### Curso
```javascript
{
  id, title, category, level, students, 
  rating, lessons, duration, instructor, 
  price, color, tags
}
```

### Material
```javascript
{
  id, title, type, size, category, 
  downloads, rating, pages
}
```

### Post
```javascript
{
  id, author, avatar, role, content, 
  replies, likes, time, tags
}
```

## 🎯 Próximos Passos (Sugestões)

1. Integrar com backend (API REST)
2. Adicionar autenticação de usuários
3. Implementar sistema de pagamentos
4. Adicionar player de vídeo para aulas
5. Sistema de progresso do aluno
6. Notificações em tempo real
7. Chat ao vivo
8. Gamificação (badges, pontos)

## 💡 Dicas de Uso

- Use `Ctrl + Click` nos links para abrir em nova aba
- Teste a responsividade com DevTools (F12)
- Experimente os filtros e busca
- Veja as animações ao fazer scroll
- Teste os hovers nos cards

## 🐛 Troubleshooting

### Erro: "npm: command not found"
- Instale o Node.js: https://nodejs.org

### Erro: "Cannot find module"
- Execute: `npm install`

### Porta já em uso
- Vite tentará usar outra porta automaticamente
- Ou especifique: `npm run dev -- --port 3000`

## 📞 Suporte

Para dúvidas ou problemas, consulte:
- README.md principal
- Documentação do React
- Documentação do Vite
