/* ══════════════════════════════════════════════════════
   PORTFOLIO  —  main.js
   Handles: dark mode, nav highlight, scroll reveal,
            contact form AJAX, drag-to-reorder sections
══════════════════════════════════════════════════════ */

// ── DARK MODE TOGGLE ───────────────────────────────────
const html         = document.documentElement;
const themeBtn     = document.getElementById('themeToggle');
const savedTheme   = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
themeBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

function toggleTheme() {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
}
themeBtn.addEventListener('click', toggleTheme);

// ── HAMBURGER MENU (mobile) ────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// close on nav link click (mobile)
navLinks.querySelectorAll('.nav-a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── ACTIVE NAV HIGHLIGHT ON SCROLL ────────────────────
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-a');

function updateNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAs.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── SCROLL REVEAL ──────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));

// ── CONTACT FORM (AJAX) ───────────────────────────────
const form       = document.getElementById('contactForm');
const submitBtn  = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

// Get Django CSRF token from the cookie
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    document.cookie.split(';').forEach(cookie => {
      const c = cookie.trim();
      if (c.startsWith(name + '=')) {
        cookieValue = decodeURIComponent(c.slice(name.length + 1));
      }
    });
  }
  return cookieValue;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';
  formStatus.textContent = '';
  formStatus.className = 'form-status';

  const payload = {
    name:    form.name.value.trim(),
    email:   form.email.value.trim(),
    message: form.message.value.trim(),
  };

  try {
    const res = await fetch('/contact/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken':  getCookie('csrftoken'),
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (data.ok) {
      formStatus.textContent = '✅ ' + data.message;
      formStatus.classList.add('ok');
      form.reset();
    } else {
      formStatus.textContent = '⚠️ ' + (data.error || 'Something went wrong.');
      formStatus.classList.add('err');
    }
  } catch {
    formStatus.textContent = '⚠️ Network error — please try again.';
    formStatus.classList.add('err');
  }

  submitBtn.disabled = false;
  submitBtn.textContent = 'Send Message ✈';
});

// ── DRAG-TO-REORDER SECTIONS ──────────────────────────
// Uses SortableJS (loaded from CDN in the template)
if (typeof Sortable !== 'undefined') {
  Sortable.create(document.getElementById('sortable'), {
    handle:    '.drag-handle',
    animation: 200,
    ghostClass: 'sortable-ghost',
    chosenClass:'sortable-chosen',
    onEnd: (evt) => {
      // Persist new order in sessionStorage so it survives soft refreshes
      const order = [...document.querySelectorAll('.sortable-wrap')]
        .map(el => el.dataset.id);
      sessionStorage.setItem('sectionOrder', JSON.stringify(order));
    },
  });

  // Restore saved order on page load
  const saved = sessionStorage.getItem('sectionOrder');
  if (saved) {
    try {
      const order = JSON.parse(saved);
      const container = document.getElementById('sortable');
      order.forEach(id => {
        const el = document.querySelector(`.sortable-wrap[data-id="${id}"]`);
        if (el) container.appendChild(el);
      });
    } catch (e) { /* ignore corrupt storage */ }
  }
}
