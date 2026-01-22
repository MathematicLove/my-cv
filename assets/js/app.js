(function () {
  let currentLang = localStorage.getItem('lang') || 'ru';
  
  const translations = {
    ru: {
      meta: {
        title: 'Портфолио — MathematicLove',
        description: 'Портфолио разработчика: языки, фреймворки, DevOps, базы данных, математика и проекты.'
      },
      nav: {
        about: 'Обо мне',
        skills: 'Навыки',
        math: 'Математика',
        tasks: 'Пет-проекты',
        contact: 'Контакты'
      },
      resume: 'Резюме',
      toggleTheme: 'Переключить тему',
      hero: {
        github: 'Профиль в GitHub'
      },
      about: {
        title: 'Обо мне',
        text: 'Салимли Айзек, студент 4-го курса СПбПУ, ИКНК, математика и компьютерные науки, системы ИИ и суперкомпьютерные технологии. Опыт работы: 1 год 2 месяц The Blooms Bridge, интеграция систем ИИ (RAG, Computer Vision и т.д) и back-end разработка.'
      },
      skills: {
        title: 'Навыки'
      },
      math: {
        title: 'Математика'
      },
      tasks: {
        title: 'Пет-проекты'
      },
      contact: {
        title: 'Контакты',
        text: 'Связаться проще всего через Telegram.',
        github: 'Перейти в профиль GitHub',
        gitea: 'Перейти в профиль Gitea'
      },
      profile: {
        skills: [
          {
            key: 'java',
            title: 'Java',
            className: 'tag-java',
            groups: [
              { name: 'Фреймворки', items: ['Spring Core', 'Spring Boot', 'Spring Web', 'Spring WebFlux (Reactive Web)', 'Spring Data JPA', 'JDBC', 'Spring Security', 'Hibernate'] },
              { name: 'Инструменты', items: ['RabbitMQ'] },
              { name: 'Сборка', items: ['Gradle', 'Maven'] }
            ]
          },
          {
            key: 'python',
            title: 'Python',
            className: 'tag-python',
            groups: [
              { name: 'ML & Data analysis', items: ['NumPy', 'Pandas', 'Scikit-Learn', 'OpenCV', 'YOLO', 'PyTorch'] }
            ]
          },
          {
            key: 'haskell',
            title: 'Haskell',
            className: 'tag-haskell',
            groups: [
              { name: 'Сборка', items: ['Stack', 'Cabal'] }
            ]
          },
          {
            key: 'cpp',
            title: 'C++',
            className: 'tag-cpp',
            groups: [
              { name: 'Сборка', items: ['CMake'] }
            ]
          },
          {
            key: 'javascript',
            title: 'JavaScript',
            className: 'tag-js',
            groups: [
              { name: 'Web (JavaScript Web)', items: ['Express.js'] },
              { name: 'Инструменты', items: ['NPM'] }
            ]
          },
          {
            key: 'databases',
            title: 'СУБД',
            className: 'tag-db',
            groups: [
              { name: 'SQL', items: ['PostgreSQL', 'MySQL'] },
              { name: 'NoSQL', items: ['MongoDB'] },
              { name: 'Cache', items: ['Redis'] }
            ]
          },
          {
            key: 'containerization',
            title: 'DevOps - Контейнеризация и оркестрация',
            className: 'tag-devops',
            groups: [
              { name: 'Контейнеризация', items: ['Docker', 'Docker Compose'] },
              { name: 'Оркестрация', items: ['Kubernetes (k8s)'] },
              { name: 'Хостинг', items: ['Render', 'Firebase'] },
              { name: 'CI/CD', items: ['GitHub Actions', 'Jenkins']}
            ]
          },
          {
            key: 'networking',
            title: 'Сети ЭВМ',
            className: 'tag-net',
            groups: [
              { name: 'Модели', items: ['OSI', 'TCP/IP'] },
              { name: 'Протоколы', items: ['HTTP', 'HTTPS', 'TLS', 'SSH', 'FTP', 'TCP', 'UDP'] }
            ]
          },
          {
            key: 'os',
            title: 'Операционные системы',
            className: 'tag-os',
            groups: [
              { name: 'GNU/Linux, Unix-like', items: ['macOS', 'Ubuntu', 'Arch Linux'] },
              { name: 'Windows', items: ['11', '10', '8'] }
            ]
          },
          {
            key: 'docs',
            title: 'Документация',
            className: 'tag-docs',
            groups: [
              { name: 'Инструменты', items: ['LaTeX', 'LaTeX Beamer', 'Markdown', 'typst', 'Word', 'Pages'] }
            ]
          },
          {
            key: 'science',
            title: 'Научная область',
            className: 'tag-science',
            groups: [
              { name: 'Опыт', items: ['Распознавание посторонних объектов на трамвайных путях в режиме реального времени'] }
            ]
          }
        ],
        mathSections: [
          { name: 'Теория', className: 'tag-math', items: ['Методы оптимизации', 'Теория вероятностей', 'Математическая статистика', 'Теория графов', 'Дискретная математика', 'Математическая логика', 'Математический анализ'] },
          { name: 'Автоматы и языки', className: 'tag-math', items: ['Теория конечных автоматов', 'Теория формальных языков', 'Теория категорий'] },
          { name: 'Алгебра и квантовые', className: 'tag-math', items: ['Линейная алгебра', 'Квантовые вычисления'] }
        ],
        tasks: [
          {
            key: 'math',
            title: "Ayzek's Math",
            className: 'tag-task-math',
            links: [
              { label: 'Презентации MathLang', href: 'https://github.com/MathematicLove/MathLangPresentations/tree/main/Presentations' },
              { label: 'Учебные проекты', href: 'https://github.com/MathematicLove/spbstu-iccs-mcs' },
              { label: 'Прогнозирование и сравнение демографических показателей России и Японии', href: 'https://github.com/MathematicLove/demographic-regression-ru-jp' }
            ]
          },
          {
            key: 'soft',
            title: "Ayzek's Soft",
            className: 'tag-task-soft',
            links: [
              { label: 'Бесплатный MP3 плеер iOS: AyzeksSound', href: 'https://github.com/MathematicLove/AyzeksSound' },
              { label: 'Игра в жизнь на КА', href: 'https://github.com/MathematicLove/LiveTheGame' },
              { label: 'ТГ-Бот отслеживания цен: PriceCheckerBot', href: 'https://github.com/MathematicLove/PriceCheckerBot' },
              { label: 'ТГ-Бот планирования путешествий: SpringTripPlannerBot', href: 'https://github.com/MathematicLove/SpringTripPlannerBot' },
              { label: 'REST сервер на Java', href: 'https://github.com/MathematicLove/JavaHTTPServer' },
              { label: 'Сервис банковских карт', href: 'https://github.com/MathematicLove/card-management-service' }
            ]
          },
          {
            key: 'web',
            title: "Ayzek's Web",
            className: 'tag-task-web',
            links: [
              { label: 'Цитаты из фильмов и мультфильмов', href: 'https://github.com/MathematicLove/quotes_web_app' },
              { label: 'Шифрование и дешифрование данных', href: 'https://github.com/MathematicLove/encrypt-it' }
            ]
          }
        ]
      }
    },
    en: {
      meta: {
        title: 'Portfolio — MathematicLove',
        description: 'Developer portfolio: languages, frameworks, DevOps, databases, mathematics and projects.'
      },
      nav: {
        about: 'About',
        skills: 'Skills',
        math: 'Mathematics',
        tasks: 'Pet Projects',
        contact: 'Contacts'
      },
      resume: 'Resume',
      toggleTheme: 'Toggle theme',
      hero: {
        github: 'GitHub Profile'
      },
      about: {
        title: 'About',
        text: 'Salimli Ayzek, 4th year student at SPbPU, ICCS, Mathematics and Computer Science, AI Systems and Supercomputer Technologies. Work experience: 1 year 2 months at The Blooms Bridge, AI systems integration (RAG, Computer Vision, etc.) and back-end development.'
      },
      skills: {
        title: 'Skills'
      },
      math: {
        title: 'Mathematics'
      },
      tasks: {
        title: 'Pet Projects'
      },
      contact: {
        title: 'Contacts',
        text: 'The easiest way to contact is via Telegram.',
        github: 'Go to GitHub profile',
        gitea: 'Go to Gitea profile'
      },
      profile: {
        skills: [
          {
            key: 'java',
            title: 'Java',
            className: 'tag-java',
            groups: [
              { name: 'Frameworks', items: ['Spring Core', 'Spring Boot', 'Spring Web', 'Spring WebFlux (Reactive Web)', 'Spring Data JPA', 'JDBC', 'Spring Security', 'Hibernate'] },
              { name: 'Tools', items: ['RabbitMQ'] },
              { name: 'Build', items: ['Gradle', 'Maven'] }
            ]
          },
          {
            key: 'python',
            title: 'Python',
            className: 'tag-python',
            groups: [
              { name: 'ML & Data analysis', items: ['NumPy', 'Pandas', 'Scikit-Learn', 'OpenCV', 'YOLO', 'PyTorch'] }
            ]
          },
          {
            key: 'haskell',
            title: 'Haskell',
            className: 'tag-haskell',
            groups: [
              { name: 'Build', items: ['Stack', 'Cabal'] }
            ]
          },
          {
            key: 'cpp',
            title: 'C++',
            className: 'tag-cpp',
            groups: [
              { name: 'Build', items: ['CMake'] }
            ]
          },
          {
            key: 'javascript',
            title: 'JavaScript',
            className: 'tag-js',
            groups: [
              { name: 'Web (JavaScript Web)', items: ['Express.js'] },
              { name: 'Tools', items: ['NPM'] }
            ]
          },
          {
            key: 'databases',
            title: 'DBMS',
            className: 'tag-db',
            groups: [
              { name: 'SQL', items: ['PostgreSQL', 'MySQL'] },
              { name: 'NoSQL', items: ['MongoDB'] },
              { name: 'Cache', items: ['Redis'] }
            ]
          },
          {
            key: 'containerization',
            title: 'DevOps - Containerization and Orchestration',
            className: 'tag-devops',
            groups: [
              { name: 'Containerization', items: ['Docker', 'Docker Compose'] },
              { name: 'Orchestration', items: ['Kubernetes (k8s)'] },
              { name: 'Hosting', items: ['Render', 'Firebase'] },
              { name: 'CI/CD', items: ['GitHub Actions', 'Jenkins']}
            ]
          },
          {
            key: 'networking',
            title: 'Computer Networks',
            className: 'tag-net',
            groups: [
              { name: 'Models', items: ['OSI', 'TCP/IP'] },
              { name: 'Protocols', items: ['HTTP', 'HTTPS', 'TLS', 'SSH', 'FTP', 'TCP', 'UDP'] }
            ]
          },
          {
            key: 'os',
            title: 'Operating Systems',
            className: 'tag-os',
            groups: [
              { name: 'GNU/Linux, Unix-like', items: ['macOS', 'Ubuntu', 'Arch Linux'] },
              { name: 'Windows', items: ['11', '10', '8'] }
            ]
          },
          {
            key: 'docs',
            title: 'Documentation',
            className: 'tag-docs',
            groups: [
              { name: 'Tools', items: ['LaTeX', 'LaTeX Beamer', 'Markdown', 'typst', 'Word', 'Pages'] }
            ]
          },
          {
            key: 'science',
            title: 'Scientific Area',
            className: 'tag-science',
            groups: [
              { name: 'Experience', items: ['Real-time recognition of foreign objects on tram tracks'] }
            ]
          }
        ],
        mathSections: [
          { name: 'Theory', className: 'tag-math', items: ['Optimization Methods', 'Probability Theory', 'Mathematical Statistics', 'Graph Theory', 'Discrete Mathematics', 'Mathematical Logic', 'Mathematical Analysis'] },
          { name: 'Automata and Languages', className: 'tag-math', items: ['Finite Automata Theory', 'Formal Language Theory', 'Category Theory'] },
          { name: 'Algebra and Quantum', className: 'tag-math', items: ['Linear Algebra', 'Quantum Computing'] }
        ],
        tasks: [
          {
            key: 'math',
            title: "Ayzek's Math",
            className: 'tag-task-math',
            links: [
              { label: 'MathLang Presentations', href: 'https://github.com/MathematicLove/MathLangPresentations/tree/main/Presentations' },
              { label: 'Educational Projects', href: 'https://github.com/MathematicLove/spbstu-iccs-mcs' },
              { label: 'Forecasting and Comparison of Demographic Indicators of Russia and Japan', href: 'https://github.com/MathematicLove/demographic-regression-ru-jp' }
            ]
          },
          {
            key: 'soft',
            title: "Ayzek's Soft",
            className: 'tag-task-soft',
            links: [
              { label: 'Free MP3 Player iOS: AyzeksSound', href: 'https://github.com/MathematicLove/AyzeksSound' },
              { label: 'Game of Life on CA', href: 'https://github.com/MathematicLove/LiveTheGame' },
              { label: 'TG-Bot Price Tracker: PriceCheckerBot', href: 'https://github.com/MathematicLove/PriceCheckerBot' },
              { label: 'TG-Bot Trip Planner: SpringTripPlannerBot', href: 'https://github.com/MathematicLove/SpringTripPlannerBot' },
              { label: 'REST Server on Java', href: 'https://github.com/MathematicLove/JavaHTTPServer' },
              { label: 'Card Management Service', href: 'https://github.com/MathematicLove/card-management-service' }
            ]
          },
          {
            key: 'web',
            title: "Ayzek's Web",
            className: 'tag-task-web',
            links: [
              { label: 'Quotes from Movies and Cartoons', href: 'https://github.com/MathematicLove/quotes_web_app' },
              { label: 'Data Encryption and Decryption', href: 'https://github.com/MathematicLove/encrypt-it' }
            ]
          }
        ]
      }
    }
  };

  function getTranslation(key) {
    const keys = key.split('.');
    let value = translations[currentLang];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  }

  function translatePage() {
    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
    
    // Update title
    const titleEl = document.querySelector('title');
    if (titleEl) titleEl.textContent = getTranslation('meta.title');
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', getTranslation('meta.description'));
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = getTranslation(key);
      if (translation && translation !== key) {
        el.textContent = translation;
      }
    });
    
    // Update aria-label for theme toggle
    const themeToggle = document.querySelector('.theme-toggle[data-i18n-aria="toggleTheme"]');
    if (themeToggle) {
      const ariaLabel = getTranslation('toggleTheme');
      themeToggle.setAttribute('aria-label', ariaLabel);
      themeToggle.setAttribute('title', ariaLabel);
    }
    
    // Update language toggle buttons
    const langEng = document.getElementById('lang-eng');
    const langRu = document.getElementById('lang-ru');
    if (langEng && langRu) {
      if (currentLang === 'en') {
        langEng.classList.add('active');
        langRu.classList.remove('active');
      } else {
        langRu.classList.add('active');
        langEng.classList.remove('active');
      }
    }
    
    // Re-render dynamic content
    renderSkills();
    renderMath();
    renderTasks();
  }

  function setLanguage(lang) {
    if (lang === currentLang) return;
    currentLang = lang;
    localStorage.setItem('lang', lang);
    translatePage();
  }

  function createEl(tag, options = {}) {
    const el = document.createElement(tag);
    if (options.className) el.className = options.className;
    if (options.text) el.textContent = options.text;
    if (options.html) el.innerHTML = options.html;
    if (options.href) el.setAttribute('href', options.href);
    if (options.target) el.setAttribute('target', options.target);
    if (options.rel) el.setAttribute('rel', options.rel);
    return el;
  }

  function renderSkills() {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const skills = translations[currentLang].profile.skills;
    skills.forEach(section => {
      const card = createEl('article', { className: `card ${section.className || ''}`.trim() });
      const title = createEl('h3', { text: section.title });
      card.appendChild(title);

      section.groups.forEach(group => {
        const gTitle = createEl('p', { className: 'desc', text: group.name });
        const list = createEl('ul', { className: 'pill-list' });
        group.items.forEach(item => list.appendChild(createEl('li', { className: 'pill', text: item })));
        card.appendChild(gTitle);
        card.appendChild(list);
      });

      grid.appendChild(card);
    });
  }

  function renderMath() {
    const grid = document.getElementById('math-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const mathSections = translations[currentLang].profile.mathSections;
    mathSections.forEach(ms => {
      const card = createEl('article', { className: `card ${ms.className || ''}`.trim() });
      const title = createEl('h3', { text: ms.name });
      const list = createEl('ul', { className: 'pill-list' });
      ms.items.forEach(m => list.appendChild(createEl('li', { className: 'pill', text: m })));
      card.appendChild(title);
      card.appendChild(list);
      grid.appendChild(card);
    });
  }

  function renderTasks() {
    const grid = document.getElementById('tasks-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const tasks = translations[currentLang].profile.tasks;
    tasks.forEach(t => {
      const card = createEl('article', { className: `card ${t.className || ''}`.trim() });
      const title = createEl('h3', { text: t.title });
      const list = createEl('ul', { className: 'pill-list task-links' });
      t.links.forEach(link => {
        const li = createEl('li', { className: 'pill' });
        const a = createEl('a', { href: link.href, text: link.label, target: '_blank', rel: 'noreferrer noopener', className: 'task-link' });
        li.appendChild(a);
        list.appendChild(li);
      });
      card.appendChild(title);
      card.appendChild(list);
      grid.appendChild(card);
    });
  }

  function scrollWithOffset(target) {
    const header = document.querySelector('.site-header');
    const headerHeight = header ? header.offsetHeight : 0;
    const rect = target.getBoundingClientRect();
    const absoluteY = rect.top + window.scrollY;
    const y = Math.max(absoluteY - headerHeight - 8, 0);
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  function setYear() {
    const y = document.getElementById('year');
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function loadTheme() {
    const stored = localStorage.getItem('theme');
    if (stored === 'light') document.documentElement.classList.add('light');
  }

  function toggleTheme() {
    document.documentElement.classList.toggle('light');
    const isLight = document.documentElement.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  }

  function bindUI() {
    const btn = document.querySelector('.theme-toggle');
    if (btn) btn.addEventListener('click', toggleTheme);

    // Language toggle buttons
    const langEng = document.getElementById('lang-eng');
    const langRu = document.getElementById('lang-ru');
    if (langEng) {
      langEng.addEventListener('click', () => setLanguage('en'));
    }
    if (langRu) {
      langRu.addEventListener('click', () => setLanguage('ru'));
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const href = anchor.getAttribute('href');
        if (!href) return;
        const id = href.slice(1);
        const target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          scrollWithOffset(target);
        }
      });
    });
  }

  loadTheme();
  translatePage();
  setYear();
  bindUI();
})();
