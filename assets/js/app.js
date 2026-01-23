(function () {
  let currentLang = localStorage.getItem('lang') || 'ru';
  
  const translations = {
    ru: {
      meta: {
        title: 'Салимли Айзек',
        description: 'Портфолио разработчика: языки, фреймворки, DevOps, базы данных, математика и проекты.'
      },
      nav: {
        about: 'Обо мне',
        skills: 'Навыки',
        math: 'Математика',
        tasks: 'Пет-проекты',
        education: 'Образование',
        contact: 'Контакты',
        brand: 'Салимли Айзек'
      },
      resume: 'Резюме',
      hero: {
        github: 'Профиль в GitHub'
      },
      about: {
        title: 'Обо мне',
        text: 'Салимли Айзек, студент 4-го курса СПбПУ, ИКНК, математика и компьютерные науки, системы ИИ и суперкомпьютерные технологии. Опыт работы: 1 год 5 месяцев The Blooms Bridge, интеграция систем ИИ (RAG, Computer Vision и т.д) и back-end разработка.'
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
      education: {
        title: 'Образование'
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
          { name: 'Протоколы', items: ['AMQP', 'HTTP', 'HTTPS', 'TLS', 'SSH', 'FTP', 'TCP', 'UDP'] },
          { name: 'Инструменты', items: ['RabbitMQ'] }
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
          { name: 'Опыт', items: ['Распознавание посторонних объектов в режиме реального времени'] }
        ]
      }
    ],
    mathSections: [
          { name: 'Теория', className: 'tag-math', items: ['Методы оптимизации', 'Теория вероятностей', 'Математическая статистика', 'Теория графов', 'Дискретная математика', 'Математическая логика', 'Математический анализ'] },
      { name: 'Автоматы и языки', className: 'tag-math', items: ['Теория конечных автоматов', 'Теория формальных языков', 'Теория категорий'] },
      { name: 'Алгебра и квантовые', className: 'tag-math', items: ['Линейная алгебра', 'Квантовые вычисления'] }
    ],
    education: [
      {
        key: 'school',
        title: 'Школа (Полное среднее образование)',
        className: 'tag-education-school',
        groups: [
          { name: 'Школа', items: ['Азербайджан. Баку. Школа №53 (с уклоном математики)'] }
        ]
      },
      {
        key: 'university',
        title: 'Высшее образование',
        className: 'tag-education-university',
        groups: [
          { name: 'Университет', items: ['РФ. Санкт-Петербург. Санкт-Петербургский политехнический университет Петра Великого'] },
          { name: 'Институт', items: ['Институт компьютерных наук и кибербезопасности'] },
          { name: 'Направление', items: ['Математика и компьютерные науки - Системы искусственного интеллекта и суперкомпьютерные технологии'] },
          { name: 'Высшая школа', items: ['Высшая школа технологий искусственного интеллекта'] }
        ]
      }
    ],
    tasks: [
      {
        key: 'math',
        title: "Ayzek's Math",
        className: 'tag-task-math',
        links: [
          { label: 'Презентации MathLang', href: 'https://github.com/MathematicLove/MathLangPresentations/tree/main/Presentations' },
          { label: 'Учебные проекты', href: 'https://github.com/MathematicLove/spbstu-iccs-mcs' },
          { label: 'Прогнозирование и сравнение демографических показателей России и Японии', href: 'https://github.com/MathematicLove/demographic-regression-ru-jp' },
          { label: 'Прогнозирование цен на натуральный газ', href: 'https://github.com/MathematicLove/price-forecasting-analysis' }
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
        education: 'Education',
        contact: 'Contacts',
        brand: 'Salimli Ayzek'
      },
      resume: 'Resume',
      hero: {
        github: 'GitHub Profile'
      },
      about: {
        title: 'About',
        text: 'Salimli Ayzek, 4th year student at SPbPU, ICCS, Mathematics and Computer Science, AI Systems and Supercomputer Technologies. Work experience: 1 year 5 months at The Blooms Bridge, AI systems integration (RAG, Computer Vision, etc.) and back-end development.'
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
      education: {
        title: 'Education'
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
              { name: 'Protocols', items: ['AMQP', 'HTTP', 'HTTPS', 'TLS', 'SSH', 'FTP', 'TCP', 'UDP'] },
              { name: 'Tools', items: ['RabbitMQ'] }
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
              { name: 'Experience', items: ['Real-time recognition of foreign objects'] }
            ]
          }
        ],
        mathSections: [
          { name: 'Theory', className: 'tag-math', items: ['Optimization Methods', 'Probability Theory', 'Mathematical Statistics', 'Graph Theory', 'Discrete Mathematics', 'Mathematical Logic', 'Mathematical Analysis'] },
          { name: 'Automata and Languages', className: 'tag-math', items: ['Finite Automata Theory', 'Formal Language Theory', 'Category Theory'] },
          { name: 'Algebra and Quantum', className: 'tag-math', items: ['Linear Algebra', 'Quantum Computing'] }
        ],
        education: [
          {
            key: 'school',
            title: 'School (Complete Secondary Education)',
            className: 'tag-education-school',
            groups: [
              { name: 'School', items: ['Azerbaijan. Baku. School №53 (with mathematics focus)'] }
            ]
          },
          {
            key: 'university',
            title: 'Higher Education',
            className: 'tag-education-university',
            groups: [
              { name: 'University', items: ['Russia. Saint Petersburg. Peter the Great St. Petersburg Polytechnic University'] },
              { name: 'Institute', items: ['Institute of Computer Science and Cybersecurity'] },
              { name: 'Program', items: ['Mathematics and Computer Science - Artificial Intelligence Systems and Supercomputer Technologies'] },
              { name: 'Graduate School', items: ['Graduate School of Artificial Intelligence Technologies'] }
            ]
          }
        ],
        tasks: [
          {
            key: 'math',
            title: "Ayzek's Math",
            className: 'tag-task-math',
            links: [
              { label: 'MathLang Presentations', href: 'https://github.com/MathematicLove/MathLangPresentations/tree/main/Presentations' },
              { label: 'Educational Projects', href: 'https://github.com/MathematicLove/spbstu-iccs-mcs' },
              { label: 'Forecasting and Comparison of Demographic Indicators of Russia and Japan', href: 'https://github.com/MathematicLove/demographic-regression-ru-jp' },
              { label: 'Natural Gas Price Forecasting', href: 'https://github.com/MathematicLove/price-forecasting-analysis' }
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
    
    // Update language toggle button
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
      if (currentLang === 'ru') {
        langToggle.textContent = 'Eng 🇬🇧';
        langToggle.setAttribute('data-lang', 'ru');
      } else {
        langToggle.textContent = 'Rus 🇷🇺';
        langToggle.setAttribute('data-lang', 'en');
      }
    }
    
    // Update resume PDF link
    const resumePdf = document.getElementById('resume-pdf');
    if (resumePdf) {
      if (currentLang === 'ru') {
        resumePdf.href = './resume/resume-rus.pdf';
      } else {
        resumePdf.href = './resume/resume-eng.pdf';
      }
    }
    
    // Re-render dynamic content
    renderSkills();
    renderMath();
    renderEducation();
    renderTasks();
  }

  function setLanguage(lang) {
    if (lang === currentLang) return;
    currentLang = lang;
    localStorage.setItem('lang', lang);
    translatePage();
  }

  function toggleLanguage() {
    const newLang = currentLang === 'ru' ? 'en' : 'ru';
    setLanguage(newLang);
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

  function renderEducation() {
    const grid = document.getElementById('education-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const education = translations[currentLang].profile.education;
    education.forEach(section => {
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
    
    // Update hero state after scroll starts
    setTimeout(() => {
      handleScroll();
    }, 100);
  }

  function setYear() {
    const y = document.getElementById('year');
    if (y) y.textContent = String(new Date().getFullYear());
  }

  let scrollTimeout;
  let lastScrollY = 0;

  function handleScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    
    // Clear existing timeout
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    
    // Throttle scroll handling for better performance
    scrollTimeout = requestAnimationFrame(() => {
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollThreshold = 100;
      
      // Only update if scroll position changed significantly
      if (Math.abs(scrollY - lastScrollY) > 5) {
        if (scrollY > scrollThreshold) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        lastScrollY = scrollY;
      }
    });
  }

  function bindUI() {
    // Language toggle button
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
      langToggle.addEventListener('click', toggleLanguage);
    }

    // Scroll handler to hide hero section
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Initial check
    handleScroll();

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

  function createStars() {
    const starsContainer = document.querySelector('.stars-background');
    if (!starsContainer) {
      console.error('Stars container not found!');
      return;
    }
    
    // Clear any existing stars
    starsContainer.innerHTML = '';
    
    // Create many stars of different sizes
    const starCount = 200;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      const size = Math.random();
      if (size < 0.6) {
        star.className = 'star small';
      } else if (size < 0.9) {
        star.className = 'star medium';
      } else {
        star.className = 'star large';
      }
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 3 + 's';
      star.style.animationDuration = (Math.random() * 2 + 2) + 's';
      starsContainer.appendChild(star);
    }
    
    console.log(`Created ${starCount} stars`);
  }

  function createMeteor() {
    const starsContainer = document.querySelector('.stars-background');
    if (!starsContainer) return;
    
    const meteor = document.createElement('div');
    meteor.className = 'meteor';
    
    // Random starting position from top - anywhere across the screen
    const startX = Math.random() * 100; // 0% to 100%
    meteor.style.left = startX + '%';
    meteor.style.top = '-100px';
    
    // More realistic angle variation - meteors fall at different angles
    // Most fall at -45 degrees, but with natural variation
    const baseAngle = -45;
    const angleVariation = (Math.random() - 0.5) * 25; // ±12.5 degrees
    const angle = baseAngle + angleVariation; // -57.5 to -32.5 degrees
    meteor.style.setProperty('--meteor-angle', angle + 'deg');
    
    // Calculate realistic horizontal distance based on angle and viewport
    const viewportHeight = window.innerHeight || 800;
    const angleRad = Math.abs(angle) * Math.PI / 180;
    // Horizontal distance = vertical distance * tan(angle)
    const verticalDistance = viewportHeight + 200;
    const horizontalDistance = verticalDistance * Math.tan(angleRad);
    
    // Add some randomness to horizontal distance for more natural look
    const randomFactor = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
    const finalHorizontalDistance = horizontalDistance * randomFactor;
    
    meteor.style.setProperty('--meteor-x', finalHorizontalDistance + 'px');
    
    // Random size for variety (small, medium, large meteors)
    const sizeRandom = Math.random();
    if (sizeRandom < 0.3) {
      meteor.style.width = '1px';
      meteor.style.height = '60px';
    } else if (sizeRandom < 0.7) {
      meteor.style.width = '1.5px';
      meteor.style.height = '80px';
    } else {
      meteor.style.width = '2px';
      meteor.style.height = '100px';
    }
    
    // Random duration for different speeds (faster meteors look more realistic)
    const duration = Math.random() * 0.7 + 0.3; // 0.3 to 1.0 seconds
    meteor.style.animation = `meteorFall ${duration}s linear forwards`;
    
    starsContainer.appendChild(meteor);
    
    // Remove meteor after animation
    setTimeout(() => {
      if (meteor.parentNode) {
        meteor.parentNode.removeChild(meteor);
      }
    }, duration * 1000 + 100);
  }

  function startMeteorShower() {
    // Create 3 random meteors per second
    const createMeteorBatch = () => {
      // Create 3 meteors with random delays within the second
      for (let i = 0; i < 3; i++) {
        const delay = Math.random() * 1000; // Random delay within 0-1 second
        setTimeout(() => createMeteor(), delay);
      }
    };
    
    // Create batches every second
    setInterval(createMeteorBatch, 1000);
    
    // Start first batch immediately
    createMeteorBatch();
  }

  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    translatePage();
  setYear();
  bindUI();
    createStars();
    startMeteorShower();
  }
})();
