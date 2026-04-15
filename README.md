# Projeto TE1 - Fase 3 (PI3) - Landing page do Centro Académico Clínico dos Açores (CACA) com Web APIs

Este repositório contém o código-fonte e a documentação referente à **terceira fase (PI3)** do projeto da unidade curricular de Tecnologias Web.

A documentação da primeira fase (PI1) pode ser consultada em [README-PI1.md](./README-PI1.md).
A documentação da segunda fase (PI2) pode ser consultada em [README-PI2.md](./README-PI2.md).

## a) Identificação do grupo (PI3)

- Iulia-Nicoleta Putan- 2025128950
- Pedro Miguel Fonseca Anselmo - 2023109163
- Henrique Cabral Teixeira Moniz Martins - 20162298

## b) Descrição do Projeto (Fase 3)

O objetivo principal desta fase foi **expandir a landing page existente do CACA para uma plataforma mais dinâmica e funcional**, com foco na integração de Web APIs e na persistência de dados através do IndexedDB, criando uma experiência de utilizador offline-first.

### Funcionalidades Implementadas e Distribuição de Tarefas

#### 1. Gestão de Eventos com IndexedDB (Pedro Miguel Fonseca Anselmo)
Implementação de um sistema completo de CRUD para eventos:
- **Adicionar Evento:** Formulário para inserir novos eventos (título, descrição, data, hora, local).
- **Visualizar Eventos:** Exibição dinâmica de eventos armazenados na IndexedDB com filtros e ordenação.
- **Editar Evento:** Modificação de detalhes de eventos existentes com sincronização imediata.
- **Remover Evento:** Eliminação de eventos com confirmação prévia.
- **Persistência:** Dados armazenados localmente, mantendo informação entre sessões e funcionando offline.

#### 2. Subscrição de Newsletter com Persistência Local (Iulia-Nicoleta Putan)
Sistema robusto de gestão de subscritores:
- **Formulário de Subscrição:** Recolha de nome e email com validação robusta.
- **Armazenamento Local:** Dados guardados na IndexedDB com prevenção de duplicatas.
- **Validação:** Verificação de emails, campos obrigatórios e prevenção de erros.
- **Feedback Visual:** Mensagens de sucesso/erro claras ao utilizador.

#### 3. Integração com Web APIs Externas (Henrique Cabral Teixeira Moniz Martins)

##### API de Notícias/RSS Feeds
- Feed de notícias relevante para saúde/CACA (NewsAPI ou RSS pública).
- Cartões de notícias com imagem, título, resumo e link.
- Atualização automática e paginação (implementado com News.js).

## c) Estrutura do Projeto e Tecnologias

A estrutura mantém a modularização estabelecida em fases anteriores, com extensão para novas funcionalidades:

### Módulos JavaScript:
```
js/modules/
├── Animations.js            # Gerenciamento de animações e efeitos visuais
├── ChartManager.js          # Gestão de gráficos e visualizações de dados
├── ContactForm.js           # Validação e processamento de formulário de contacto
├── HeroCarousel.js          # Carrossel de imagens da secção herói
├── News.js                  # Integração com API de Notícias e feed de notícias
├── NewsletterManager.js     # Gestão de subscritores de newsletter
├── ScrollManager.js         # Gerenciamento de eventos de scroll
├── TiltEffect.js            # Efeito de inclinação em elementos
└── main.js                  # Ponto de entrada e inicialização
```

### Arquitetura de Dados:
- **Modularização ES6+:** Cada funcionalidade isolada em módulo independente para melhor manutenibilidade.
- **Tratamento de Erros:** Try-catch robusto em todas as operações assíncronas.
- **Performance:** Caching de dados de API, debounce em event listeners, lazy loading.
- **IndexedDB:** Persistência local de dados sem necessidade de servidor externo.
Estilos CSS Modularizados:
```
styles/
├── base.css                 # Estilos base e reset
├── buttons.css              # Estilos de botões
├── contact.css              # Formulário de contacto
├── header.css               # Cabeçalho e navegação
├── footer.css               # Rodapé
├── news.css                 # Feed de notícias
├── newsletter.css           # Subscrição de newsletter
├── areas.css                # Secções gerais
├── consortium.css           # Informações de consórcio
├── insights.css             # Secção de insights
├── mission.css              # Missão e visão
├── opportunities.css        # Oportunidades
├── research.css             # Pesquisa
├── notice.css               # Avisos e notificações
├── stats.css                # Estatísticas e dados
├── interactive.css          # Elementos interativos
├── responsive.css           # Media queries e responsividade  # Feed de notícias
├── (módulos existentes...)
```

## d) Qualidade do Código

- **Nomes Descritivos:** Variáveis e funções em inglês, claros e significativos.
- **Documentação JSDoc:** Comentários detalhados em funções principais.
- **Validação Rigorosa:** Verificação de inputs antes de armazenar ou enviar (emails, datas, texto).
- **Async/Await:** Código assíncrono limpo para APIs.
- **Acessibilidade:** Navegação por teclado, ARIA labels, semântica HTML, contraste WCAG 2.1 AA.

## e) Identidade Visual e Responsividade

- Manutenção da identidade visual dos projetos anteriores.
- Design completamente responsivo (mobile, tablet, desktop).
- Animações suaves em transições de estado.
- Indicadores visuais claros (loading, hover, active, disabled).

## f) Requisitos Técnicos

- **HTML5, CSS3, JavaScript (ES6+)** com modules e async/await.
- **IndexedDB** para persistência local.
- **APIs Externas:** OpenWeatherMap, Google Maps/OpenStreetMap, NewsAPI ou RSS.
- **Performance:** < 3 segundos de carregamento (4G), Lighthouse Score ≥ 80.
- **Offline First:** Funcionamento sem internet para dados já carregados.

---

# TE1 Project - Phase 3 (PI3) - Azores Academic Clinical Center (CACA) Landing Page with Web APIs

This repository contains the source code and documentation for the **third phase (PI3)** of the Web Technologies course project.

Documentation for phase 1 (PI1) can be found in [README-PI1.md](./README-PI1.md).
Documentation for phase 2 (PI2) can be found in [README-PI2.md](./README-PI2.md).

## a) Group Identification (PI3)

- Iulia-Nicoleta Putan - 2025128950
- Pedro Miguel Fonseca Anselmo - 2023109163
- Henrique Cabral Teixeira Moniz Martins - 20162298

## b) Project Description (Phase 3)

The main goal of this phase was to **expand the existing CACA landing page into a more dynamic and functional platform**, focusing on Web API integration and data persistence through IndexedDB, creating an offline-first user experience.

### Implemented Features and Task Distribution

#### 1. Event Management with IndexedDB (Pedro Miguel Fonseca Anselmo)
Implementation of a complete CRUD system for events:
- **Add Event:** Form to insert new events (title, description, date, time, location).
- **View Events:** Dynamic display of events stored in IndexedDB with filters and sorting.
- **Edit Event:** Modification of existing event details with immediate synchronization.
- **Remove Event:** Event deletion with prior confirmation.
- **Persistence:** Data stored locally, maintaining information between sessions and working offline.

#### 2. Newsletter Subscription with Local Persistence (Iulia Nicoleta Putan)
Robust subscriber management system:
- **Subscription Form:** Collection of name and email with robust validation.
- **Local Storage:** Data saved in IndexedDB with duplicate prevention.
- **Validation:** Email verification, required fields, and error prevention.
- **Visual Feedback:** Clear success/error messages to the user.

#### 3. Integration with External Web APIs (Henrique Cabral Teixeira Moniz Martins)

##### News/RSS Feeds API
- News feed relevant to healthcare/CACA (NewsAPI or public RSS).
- News cards with image, title, summary, and link.
- Automatic updates and pagination (implemented with News.js).

## c) Project Structure and Technologies

The structure maintains the modularization established in previous phases, with extension for new features:

### JavaScript Modules:
```
js/modules/
├── Animations.js            # Management of animations and visual effects
├── ChartManager.js          # Graphs and data visualizations management
├── ContactForm.js           # Contact form validation and processing
├── HeroCarousel.js          # Hero section image carousel
├── News.js                  # News API integration and news feed
├── NewsletterManager.js     # Newsletter subscriber management
├── ScrollManager.js         # Scroll event management
├── TiltEffect.js            # Tilt effect on elements
└── main.js                  # Entry point and initialization
```

### Data Architecture:
- **ES6+ Modularization:** Each functionality isolated in an independent module for better maintainability.
- **Error Handling:** Robust try-catch in all async operations.
- **Performance:** API data caching, debounce on event listeners, lazy loading.
- **IndexedDB:** Local data persistence without need for external server.

### Modularized CSS Styles:
```
styles/
├── base.css                 # Base styles and reset
├── buttons.css              # Button styles
├── contact.css              # Contact form
├── header.css               # Header and navigation
├── footer.css               # Footer
├── news.css                 # News feed
├── newsletter.css           # Newsletter subscription
├── areas.css                # General sections
├── consortium.css           # Consortium information
├── insights.css             # Insights section
├── mission.css              # Mission and vision
├── opportunities.css        # Opportunities
├── research.css             # Research
├── notice.css               # Notices and notifications
├── stats.css                # Statistics and data
├── interactive.css          # Interactive elements
├── responsive.css           # Media queries and responsiveness
```

## d) Code Quality

- **Descriptive Names:** Variables and functions in English, clear and meaningful.
- **JSDoc Documentation:** Detailed comments on main functions.
- **Rigorous Validation:** Input verification before storing or sending (emails, dates, text).
- **Async/Await:** Clean asynchronous code for APIs.
- **Accessibility:** Keyboard navigation, ARIA labels, HTML semantics, WCAG 2.1 AA contrast.

## e) Visual Identity and Responsiveness

- Maintenance of visual identity from previous projects.
- Completely responsive design (mobile, tablet, desktop).
- Smooth animations in state transitions.
- Clear visual indicators (loading, hover, active, disabled).

## f) Technical Requirements

- **HTML5, CSS3, JavaScript (ES6+)** with modules and async/await.
- **IndexedDB** for local persistence.
- **External APIs:** OpenWeatherMap, Google Maps/OpenStreetMap, NewsAPI, or RSS.
- **Performance:** < 3 seconds load time (4G), Lighthouse Score ≥ 80.
- **Offline First:** Functionality without internet for already loaded data.

