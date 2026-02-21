/* ============================================================
   TRACKINN — Customer / Traveller App JS  (user.js)
   ============================================================ */

// ---- Active Bottom Nav ----
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'dashboard.html';
  document.querySelectorAll('.bnav-item, .user-sidebar-item').forEach(item => {
    const href = item.getAttribute('href') || '';
    if (href.includes(page)) item.classList.add('active');
  });
}

// ---- Modal ----
function openModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.add('active'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.remove('active'); document.body.style.overflow = ''; }
}
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay') && e.target.classList.contains('active')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(m => {
      m.classList.remove('active'); document.body.style.overflow = '';
    });
  }
});

// ---- Tabs ----
function switchTab(tabId) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const panel = document.getElementById('tab-' + tabId);
  if (panel) panel.classList.add('active');
  if (event && event.target) event.target.classList.add('active');
}

// ---- Filter Chips ----
function toggleChip(el) {
  el.classList.toggle('active');
}

// ---- Payment selection ----
function selectPayment(el) {
  document.querySelectorAll('.pay-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
}

// ---- Toast ----
function showToast(msg, duration = 2500) {
  let toast = document.getElementById('userToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'userToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
}

// ---- Star Rating Render ----
function renderStars(rating, max = 5) {
  let html = '<div class="stars">';
  for (let i = 1; i <= max; i++) {
    html += `<span class="star ${i <= Math.round(rating) ? 'filled' : 'empty'}">★</span>`;
  }
  html += '</div>';
  return html;
}

// ---- Date Helpers ----
function formatDate(d) {
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(d);
}

// ---- On Load ----
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();

  // Set today's date on any #currentDate span
  const dateEl = document.getElementById('currentDate');
  if (dateEl) {
    dateEl.textContent = new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: 'numeric', month: 'long' }).format(new Date());
  }
});
