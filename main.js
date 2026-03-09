/* ═══════════════════════════════════════════════
   C4CHESS WEBSITE — main.js
═══════════════════════════════════════════════ */

/* ── Scroll Reveal ── */
const srObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        srObserver.unobserve(entry.target); // fire once
      }
    });
  },
  { threshold: 0.10, rootMargin: '0px 0px -28px 0px' }
);
document.querySelectorAll('.sr').forEach((el) => srObserver.observe(el));

/* ── Nav: scrolled class ── */
const mainNav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  mainNav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── Nav: active link highlight ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links .nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 130) current = sec.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle('on', link.getAttribute('href') === '#' + current);
  });
}, { passive: true });

/* ── Mobile nav toggle ── */
const navHam = document.getElementById('navHam');
const navMob = document.getElementById('navMob');

function toggleNav() {
  const isOpen = navMob.classList.toggle('open');
  navHam.classList.toggle('open', isOpen);
  navHam.setAttribute('aria-expanded', isOpen);
}

function closeNav() {
  navMob.classList.remove('open');
  navHam.classList.remove('open');
  navHam.setAttribute('aria-expanded', 'false');
}

/* ── FAQ accordion ── */
function toggleFaq(questionEl) {
  const item   = questionEl.closest('.faq-item');
  const isOpen = item.classList.contains('open');

  // Close all open items
  document.querySelectorAll('.faq-item.open').forEach((i) => i.classList.remove('open'));

  // Open clicked item if it wasn't already open
  if (!isOpen) item.classList.add('open');
}

/* ── Progress bars: animate on scroll into view ── */
const lcard   = document.getElementById('lcard');
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.pfill').forEach((bar) => {
          // Restart the animation
          bar.style.animation = 'none';
          bar.offsetHeight; // reflow
          bar.style.animation = '';
        });
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.30 }
);
if (lcard) barObserver.observe(lcard);

/* ── Trial form submission ── */
function submitForm(event) {
  event.preventDefault();

  const btn  = document.getElementById('fBtn');
  const form = document.getElementById('trialForm');
  const success = document.getElementById('fSuccess');

  btn.textContent = 'Sending…';
  btn.style.opacity = '.65';
  btn.disabled = true;

  // ──────────────────────────────────────────────────────
  // TODO: Replace the setTimeout below with a real backend
  // call, e.g.:
  //
  //   const data = {
  //     name:  document.getElementById('fn').value,
  //     email: document.getElementById('fe').value,
  //     phone: document.getElementById('fw').value,
  //     level: document.getElementById('fl').value,
  //   };
  //
  //   fetch('/api/trial', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(data),
  //   })
  //   .then(res => res.json())
  //   .then(() => { form.style.display = 'none'; success.style.display = 'block'; })
  //   .catch(() => { btn.textContent = 'Try again'; btn.style.opacity = '1'; btn.disabled = false; });
  //
  // ──────────────────────────────────────────────────────
  setTimeout(() => {
    form.style.display    = 'none';
    success.style.display = 'block';
  }, 1200);
}

/* ── Smooth scroll for all anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      closeNav(); // close mobile menu if open
    }
  });
});