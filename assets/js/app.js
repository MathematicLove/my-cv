(function () {
  const SECTION_IDS = ['about', 'tasks', 'education', 'experience', 'articles', 'contact'];
  let currentLang = localStorage.getItem('lang') || 'ru';

  const meta = {
    ru: {
      title: 'Салимли Айзек',
      description: 'Портфолио разработчика: языки, фреймворки, DevOps, базы данных, математика и проекты.',
      siteTitle: 'Салимли Айзек',
      authorName: 'Салимли Айзек',
      authorBio: 'Студент СПбПУ, ИКНК. Математика и компьютерные науки, системы ИИ и суперкомпьютерные технологии.',
      resumeLabel: 'Скачать резюме',
      resumeHref: './resume/resume-rus.pdf',
      langToggle: 'Switch to English 🇬🇧',
      footerName: 'Салимли Айзек',
      sectionNav: { about: 'Обо мне', tasks: 'Проекты', education: 'Образование', articles: 'Статьи', skills: 'Knowledge', contact: 'Контакты' }
    },
    en: {
      title: 'Salimli Ayzek',
      description: 'Developer portfolio: languages, frameworks, DevOps, databases, mathematics and projects.',
      siteTitle: 'Salimli Ayzek',
      authorName: 'Salimli Ayzek',
      authorBio: 'Student at SPbPU, ICCS. Mathematics and Computer Science, AI Systems and Supercomputer Technologies.',
      resumeLabel: 'Download resume',
      resumeHref: './resume/resume-eng.pdf',
      langToggle: 'На Русском 🇷🇺',
      footerName: 'Salimli Ayzek',
      sectionNav: { about: 'About', tasks: 'Projects', education: 'Education', articles: 'Articles', skills: 'Knowledge', contact: 'Contacts' }
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
    if (resumeEl) resumeEl.href = m.resumeHref;
    const resumeLabel = document.getElementById('resume-label');
    if (resumeLabel) resumeLabel.textContent = m.resumeLabel;
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) langBtn.textContent = m.langToggle;
    const footerName = document.getElementById('footer-name');
    if (footerName) footerName.textContent = m.footerName;
    if (m.sectionNav) {
      ['about', 'tasks', 'education', 'articles', 'skills', 'contact'].forEach(function (id) {
        var el = document.getElementById('nav-link-' + id);
        if (el && m.sectionNav[id]) el.textContent = m.sectionNav[id];
      });
    }
  }

  function assignSectionIds(root) {
    const h2s = root.querySelectorAll('h2');
    h2s.forEach((h2, i) => {
      if (SECTION_IDS[i]) h2.id = SECTION_IDS[i];
    });
  }

  function renderMarkdown(html) {
    const root = document.getElementById('markdown-root');
    if (!root) return;
    root.innerHTML = html;
    assignSectionIds(root);
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
        if (root) root.innerHTML = '<p>Не удалось загрузить контент.</p>';
        console.error(err);
      });
  }

  function setLanguage(lang) {
    if (lang === currentLang) return;
    currentLang = lang;
    localStorage.setItem('lang', lang);
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

    document.querySelectorAll('.section-nav__link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        if (href && href.indexOf('#') === 0) {
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
