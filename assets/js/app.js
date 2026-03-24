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
    { re: /^Contacts$/i, id: 'contact' },
    { re: /^Контакты$/i, id: 'contact' }
  ];

  const meta = {
    ru: {
      title: 'Салимли Айзек',
      description: 'Портфолио разработчика: языки, фреймворки, DevOps, базы данных, математика и проекты.',
      siteTitle: 'Салимли Айзек',
      authorName: 'Салимли Айзек',
      authorBio: 'Студент СПбПУ, ИКНК. Математика и компьютерные науки, системы ИИ и суперкомпьютерные технологии.',
      resumeLabel: 'Скачать резюме (RU)',
      resumeHref: './resume/resume-rus.pdf',
      langToggle: 'English version 🇬🇧',
      footerName: 'Салимли Айзек',
      sectionNav: { about: 'Обо мне', tasks: 'Проекты', education: 'Образование', articles: 'Статьи', skills: 'Знания', 'learning-hub': 'Learning Hub', contact: 'Контакты' }
    },
    en: {
      title: 'Salimli Ayzek',
      description: 'Developer portfolio: languages, frameworks, DevOps, databases, mathematics and projects.',
      siteTitle: 'Salimli Ayzek',
      authorName: 'Salimli Ayzek',
      authorBio: 'Student at SPbPU, ICCS. Mathematics and Computer Science, AI Systems and Supercomputer Technologies.',
      resumeLabel: 'Download resume (ENG)',
      resumeHref: './resume/resume-eng.pdf',
      langToggle: 'Версия на русском 🇷🇺',
      footerName: 'Salimli Ayzek',
      sectionNav: { about: 'About', tasks: 'Projects', education: 'Education', articles: 'Articles', skills: 'Knowledge', 'learning-hub': 'Learning Hub', contact: 'Contacts' }
    }
  };

  function getContentPath() {
    return currentLang === 'ru' ? 'content/ru.md' : 'content/en.md';
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
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) langBtn.textContent = m.langToggle;
    const footerName = document.getElementById('footer-name');
    if (footerName) footerName.textContent = m.footerName;
    if (m.sectionNav) {
      var navIds = ['about', 'tasks', 'education', 'articles', 'learning-hub', 'contact'];
      navIds.forEach(function (id) {
        var el = document.getElementById('nav-link-' + id);
        if (el && m.sectionNav[id]) el.textContent = m.sectionNav[id];
      });
    }
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

    var aboutNav = document.getElementById('nav-link-about');
    if (aboutNav) {
      aboutNav.addEventListener(
        'click',
        function (e) {
          e.preventDefault();
          e.stopImmediatePropagation();
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
