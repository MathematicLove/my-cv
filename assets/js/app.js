(function () {
  function normalizeLang(lang) {
    if (!lang || typeof lang !== 'string') return 'en';
    return lang.toLowerCase() === 'ru' ? 'ru' : 'en';
  }

  let currentLang = normalizeLang(localStorage.getItem('lang') || 'en');

  const SECTION_H2_RULES = [
    { re: /^About$/i, id: 'about' },
    { re: /^Обо мне$/i, id: 'about' },
    { re: /^Projects$/i, id: 'tasks' },
    { re: /^Проекты$/i, id: 'tasks' },
    { re: /^Education$/i, id: 'education' },
    { re: /^Образование$/i, id: 'education' },
    { re: /^Experience$/i, id: 'experience' },
    { re: /^Опыт работы$/i, id: 'experience' },
    { re: /^Articles$/i, id: 'articles' },
    { re: /^Статьи$/i, id: 'articles' },
    { re: /^Дипломы и Сертификаты$/i, id: 'certificates' },
    { re: /^Diplomas and Certificates$/i, id: 'certificates' },
    { re: /^Contacts$/i, id: 'contact' },
    { re: /^Контакты$/i, id: 'contact' }
  ];

  const meta = {
    ru: {
      title: 'Салимли Айзек',
      description: 'Портфолио разработчика: языки, фреймворки, DevOps, базы данных, математика и проекты.',
      siteTitle: 'Салимли Айзек',
      authorName: 'Салимли Айзек',
      authorBio: 'Data Scientist. Магистр 1-го курса, СПбПУ, ИКНК. Математика и компьютерные науки, машинное обучение и искусственный интеллект.',
      resumeLabel: 'Скачать резюме (RU)',
      resumeHref: './resume/resume-rus.pdf',
      portfolioLabel: 'Скачать это портфолио',
      portfolioHref: './cv/ru.pdf',
      langToggle: 'English version 🇬🇧',
      footerName: 'Салимли Айзек',
      sectionNav: {
        about: 'Обо мне',
        tasks: 'Проекты',
        education: 'Образование',
        articles: 'Статьи',
        certificates: 'Дипломы и Сертификаты',
        experience: 'Опыт',
        skills: 'Навыки',
        'learning-hub': 'Learning Hub',
        contact: 'Контакты'
      },
      navToggleLabel: 'Меню'
    },
    en: {
      title: 'Salimli Ayzek',
      description: 'Developer portfolio: languages, frameworks, DevOps, databases, mathematics and projects.',
      siteTitle: 'Salimli Ayzek',
      authorName: 'Salimli Ayzek',
      authorBio: "Data Scientist. 1st-year master's student, SPbSTU, ICCS. Mathematics and Computer Science, Machine Learning and Artificial Intelligence.",
      resumeLabel: 'Download resume (ENG)',
      resumeHref: './resume/resume-eng.pdf',
      portfolioLabel: 'Download this portfolio',
      portfolioHref: './cv/en.pdf',
      langToggle: 'Версия на русском 🇷🇺',
      footerName: 'Salimli Ayzek',
      sectionNav: {
        about: 'About',
        tasks: 'Projects',
        education: 'Education',
        articles: 'Articles',
        certificates: 'Diplomas and Certificates',
        experience: 'Experience',
        skills: 'Skills',
        'learning-hub': 'Learning Hub',
        contact: 'Contacts'
      },
      navToggleLabel: 'Menu'
    }
  };

  var CONTENT_VERSION = '31';

  function getContentPath() {
    var base = currentLang === 'ru' ? 'content/ru.md' : 'content/en.md';
    return base + '?v=' + CONTENT_VERSION;
  }

  function applyMeta() {
    const m = meta[currentLang];
    document.title = m.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', m.description);
    document.documentElement.lang = currentLang;
  }

  function updateUI() {
    const m = meta[currentLang];
    const siteTitleEl = document.getElementById('site-title');
    if (siteTitleEl) siteTitleEl.textContent = m.siteTitle;
    const authorNameEl = document.getElementById('author-name');
    if (authorNameEl) authorNameEl.textContent = m.authorName;
    const authorBioEl = document.getElementById('author-bio');
    if (authorBioEl) authorBioEl.textContent = m.authorBio;
    const resumeEl = document.getElementById('resume-pdf');
    if (resumeEl) {
      resumeEl.href = m.resumeHref;
      resumeEl.setAttribute('aria-label', m.resumeLabel);
    }
    const resumeLabel = document.getElementById('resume-label');
    if (resumeLabel) resumeLabel.textContent = m.resumeLabel;
    const portfolioEl = document.getElementById('portfolio-pdf');
    if (portfolioEl) {
      portfolioEl.href = m.portfolioHref;
      portfolioEl.setAttribute('aria-label', m.portfolioLabel);
    }
    const portfolioLabel = document.getElementById('portfolio-label');
    if (portfolioLabel) portfolioLabel.textContent = m.portfolioLabel;
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) langBtn.textContent = m.langToggle;
    const footerName = document.getElementById('footer-name');
    if (footerName) footerName.textContent = m.footerName;
    if (m.sectionNav) {
      var navIds = ['about', 'tasks', 'education', 'experience', 'articles', 'certificates', 'learning-hub', 'contact'];
      navIds.forEach(function (id) {
        var el = document.getElementById('nav-link-' + id);
        if (el && m.sectionNav[id]) el.textContent = m.sectionNav[id];
      });
    }
    var navToggle = document.getElementById('nav-toggle');
    if (navToggle && m.navToggleLabel) {
      navToggle.setAttribute('aria-label', m.navToggleLabel);
    }
  }

  function isTouchDevice() {
    return window.matchMedia('(hover: none), (pointer: coarse)').matches;
  }

  function closeMobileNav() {
    var sectionNav = document.getElementById('section-nav');
    var navToggle = document.getElementById('nav-toggle');
    if (sectionNav) sectionNav.classList.remove('is-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  }

  function assignSectionIds(root) {
    root.querySelectorAll('h2').forEach(function (h2) {
      var text = h2.textContent.trim();
      for (var i = 0; i < SECTION_H2_RULES.length; i++) {
        if (SECTION_H2_RULES[i].re.test(text)) {
          h2.id = SECTION_H2_RULES[i].id;
          return;
        }
      }
    });
  }

  function ensureLearningHubAnchor(root) {
    if (document.getElementById('learning-hub')) return;
    var h2s = root.querySelectorAll('h2');
    for (var i = 0; i < h2s.length; i++) {
      if (/^Learning Hub/i.test(h2s[i].textContent.trim())) {
        var a = document.createElement('div');
        a.id = 'learning-hub';
        a.className = 'section-anchor';
        a.setAttribute('aria-hidden', 'true');
        h2s[i].parentNode.insertBefore(a, h2s[i]);
        return;
      }
    }
  }

  function renderMarkdown(html) {
    const root = document.getElementById('markdown-root');
    if (!root) return;
    root.innerHTML = html;
    assignSectionIds(root);
    ensureLearningHubAnchor(root);
    initProjectShotPreviews();
  }

  function initProjectShotPreviews() {
    if (isTouchDevice()) return;

    var preview = document.getElementById('project-shot-preview');
    if (!preview) {
      preview = document.createElement('div');
      preview.id = 'project-shot-preview';
      preview.className = 'project-shot-preview';
      preview.innerHTML = '<img alt="">';
      document.body.appendChild(preview);
    }

    var previewImg = preview.querySelector('img');
    var activeLink = null;

    function hidePreview() {
      preview.classList.remove('is-visible');
      activeLink = null;
    }

    function positionPreview(e) {
      var pad = 14;
      preview.classList.add('is-visible');
      var w = preview.offsetWidth;
      var h = preview.offsetHeight;
      var x = e.clientX + pad;
      var y = e.clientY + pad;
      if (x + w > window.innerWidth - pad) x = e.clientX - w - pad;
      if (y + h > window.innerHeight - pad) y = e.clientY - h - pad;
      preview.style.left = Math.max(pad, x) + 'px';
      preview.style.top = Math.max(pad, y) + 'px';
    }

    document.querySelectorAll('.project-panel__shot').forEach(function (link) {
      var img = link.querySelector('img');
      if (!img) return;

      link.addEventListener('mouseenter', function (e) {
        activeLink = link;
        previewImg.src = img.currentSrc || img.src;
        previewImg.alt = img.alt || '';
        var show = function (ev) {
          if (activeLink === link) positionPreview(ev || e);
        };
        if (previewImg.complete) {
          show(e);
        } else {
          previewImg.onload = function () {
            show(e);
          };
        }
      });

      link.addEventListener('mousemove', function (e) {
        if (activeLink === link && preview.classList.contains('is-visible')) {
          positionPreview(e);
        }
      });

      link.addEventListener('mouseleave', hidePreview);
    });
  }

  function loadContent() {
    const path = getContentPath();
    fetch(path)
      .then(r => {
        if (!r.ok) throw new Error('Failed to load ' + path);
        return r.text();
      })
      .then(md => {
        if (typeof marked !== 'undefined') {
          marked.setOptions({ gfm: true });
          renderMarkdown(marked.parse(md));
        } else {
          renderMarkdown('<pre>' + md.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</pre>');
        }
      })
      .catch(err => {
        const root = document.getElementById('markdown-root');
        if (root) root.innerHTML = '<p>Не удалось загрузить :(</p>';
        console.error(err);
      });
  }

  function setLanguage(lang) {
    var next = normalizeLang(lang);
    if (next === currentLang) return;
    currentLang = next;
    localStorage.setItem('lang', currentLang);
    applyMeta();
    updateUI();
    loadContent();
  }

  function toggleLanguage() {
    setLanguage(currentLang === 'ru' ? 'en' : 'ru');
  }

  function setYear() {
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  function init() {
    applyMeta();
    updateUI();
    loadContent();
    setYear();

    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) langBtn.addEventListener('click', toggleLanguage);

    var followBtn = document.querySelector('.author__urls-btn');
    var urlsList = document.querySelector('.author__urls');
    if (followBtn && urlsList) {
      if (window.matchMedia('(max-width: 924px)').matches) {
        urlsList.setAttribute('hidden', '');
      }
      followBtn.addEventListener('click', function () {
        if (urlsList.hasAttribute('hidden')) {
          urlsList.removeAttribute('hidden');
        } else {
          urlsList.setAttribute('hidden', '');
        }
      });
    }

    var navToggle = document.getElementById('nav-toggle');
    var sectionNav = document.getElementById('section-nav');
    if (navToggle && sectionNav) {
      navToggle.addEventListener('click', function () {
        var open = sectionNav.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      window.matchMedia('(min-width: 925px)').addEventListener('change', function (e) {
        if (e.matches) closeMobileNav();
      });
    }

    var aboutNav = document.getElementById('nav-link-about');
    if (aboutNav) {
      aboutNav.addEventListener(
        'click',
        function (e) {
          e.preventDefault();
          e.stopImmediatePropagation();
          closeMobileNav();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          if (window.history && window.history.replaceState) {
            window.history.replaceState(null, '', window.location.pathname + (window.location.search || ''));
          }
        },
        true
      );
    }

    document.querySelectorAll('.section-nav__link').forEach(function (link) {
      if (link.id === 'nav-link-about') return;
      link.addEventListener('click', function (e) {
        closeMobileNav();
        var href = link.getAttribute('href');
        if (href && href.indexOf('#') === 0 && href.length > 1) {
          var id = href.slice(1);
          var target = document.getElementById(id);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });

    const NAMESPACE = 'mathematiclove-cv';

    function incrementCounter(key) {
      console.log('count++:', key);
      const url = `https://countapi.mileshilliard.com/api/v1/hit/${key}`;

      if (navigator.sendBeacon) {
        navigator.sendBeacon(url);
      } else {
        fetch(url, { mode: 'no-cors' }).catch(() => { });
      }
    }

    if (window.location.pathname === '/' ||
      window.location.pathname === '/index.html' ||
      window.location.pathname.endsWith('/my-cv/')) {
      incrementCounter('mathematiclove-cv-site-views');
    }

    document.addEventListener('click', function (e) {
      const link = e.target.closest('a[data-counter]');
      if (link) {
        const key = link.getAttribute('data-counter');
        console.log('Клик по ссылке:', key);
        if (key) incrementCounter('mathematiclove-cv-' + key);
        return;
      }
      // Clicks on a project's preview images count toward that project's title counter
      const panelLink = e.target.closest('.project-panel a[href]');
      if (panelLink) {
        const panel = panelLink.closest('.project-panel');
        const titleLink = panel && panel.querySelector('.project-panel__title a[data-counter]');
        const key = titleLink && titleLink.getAttribute('data-counter');
        if (key) incrementCounter('mathematiclove-cv-' + key);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();