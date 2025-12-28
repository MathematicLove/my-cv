(function () {
  const profile = {
    github: 'https://github.com/MathematicLove',
    headerCv: 'https://mathematicLove.github.io/my-cv/resume/resume.pdf',
    skills: [
      {
        key: 'java',
        title: 'Java',
        className: 'tag-java',
        groups: [
          { name: 'Фреймворки', items: ['Spring Core', 'Spring Boot', 'Spring Web', 'Spring WebFlux (Reactive Web)', 'Spring Data JPA', 'JDBC', 'Spring Security', 'Hibernate'] },
          { name: 'Инструменты', items: ['RabbitMQ', 'NPM (для Node-инструментов)'] },
          { name: 'Сборка', items: ['Gradle', 'Maven'] }
        ]
      },
      {
        key: 'python',
        title: 'Python',
        className: 'tag-python',
        groups: [
          { name: 'ML & Data analysis', items: ['NumPy', 'Pandas', 'Scikit-Learn', 'OpenCV', 'PyTorch'] }
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
        title: 'DevOps — Контейнеризация и оркестрация',
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
          { name: 'Инструменты', items: ['LaTeX', 'mklatex', 'pdflatex', 'Word', 'Pages'] }
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
      { name: 'Теория', className: 'tag-math', items: ['Методы оптимизации', 'Теория вероятностей', 'Математическая статистика', 'Теория графов', 'Дискретная математика', 'Математическая логика'] },
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
  };

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

    profile.skills.forEach(section => {
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

    profile.mathSections.forEach(ms => {
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

    profile.tasks.forEach(t => {
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
  renderSkills();
  renderMath();
  renderTasks();
  setYear();
  bindUI();
})();
