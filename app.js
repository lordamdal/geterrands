/* Errand prototype — shared behaviour: icons, prototype navigation, helpers. */

const ICONS = {
  phone: '<path d="M5 4h3.5l1.8 4.6-2.2 1.4a11 11 0 0 0 5.9 5.9l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z"/>',
  sms: '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/>',
  whatsapp: '<path d="M4 20l1.4-4.2A8 8 0 1 1 8.4 18.7z"/><path d="M9 9.2c0 3.1 2.6 5.6 5.7 5.7l1-1.5-2-1-1 .9a3.6 3.6 0 0 1-2-2l.9-1-1-2z"/>',
  telegram: '<path d="M21 4L3 11l6 2 2 6 3-4 5 4z"/><path d="M9 13l12-9"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  chat: '<path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-5 4z"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  play: '<path d="M8 5l11 7-11 7z"/>',
  right: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  left: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  shield: '<path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  sliders: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',
  home: '<path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><path d="M10 21v-6h4v6"/>',
  map: '<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
  link: '<path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1"/><path d="M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1"/>',
  bell: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>',
  card: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 10h19M6 15h4"/>',
  star: '<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8z"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
  heart: '<path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/>',
  inbox: '<path d="M3 13l3-8h12l3 8v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M3 13h5l1 3h6l1-3h5"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21h15"/>',
  doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
  family: '<circle cx="8" cy="7" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 20c0-4 3-6 6-6s6 2 6 6M14 20c0-3 1.5-5 3-5s5 1 5 5"/>',
  truck: '<path d="M2 6h12v10H2zM14 10h4l3 3v3h-7z"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  refresh: '<path d="M20 11a8 8 0 1 0-2 6"/><path d="M20 4v7h-7"/>',
  receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
  chart: '<path d="M4 20V4M4 20h16"/><path d="M7 15l4-4 3 3 5-6"/>',
  megaphone: '<path d="M3 10v4h4l7 4V6L7 10z"/><path d="M17 9a3 3 0 0 1 0 6M7 14l1 5h3l-1-5"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5c2 .6 3.5 2.4 3.5 5.5"/>',
  box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.3-4.3"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>',
  upload: '<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>',
  bank: '<path d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',
  dollar: '<path d="M12 3v18M16.5 7.5c-.8-1.2-2.4-2-4.5-2-2.7 0-4.5 1.3-4.5 3.2 0 4.6 9 2.4 9 6.8 0 2-1.9 3.3-4.5 3.3-2.3 0-4-.9-4.8-2.4"/>',
  send: '<path d="M21 3L10 14M21 3l-7 18-4-7-7-4z"/>',
  sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>',
  store: '<path d="M4 9l1.5-5h13L20 9"/><path d="M4 9v11h16V9"/><path d="M4 9c0 1.7 1.3 3 3 3s2.7-1.3 2.7-3c0 1.7 1.2 3 2.6 3s2.7-1.3 2.7-3c0 1.7 1.3 3 3 3s2-1.3 2-3"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  pausec: '<circle cx="12" cy="12" r="9"/><path d="M10 9v6M14 9v6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  pin: '<path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>'
};
const CAT_ICON = { money: 'dollar', sales: 'briefcase', marketing: 'megaphone', customers: 'users', ops: 'box' };

function icon(name, cls = '') {
  return `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ''}</svg>`;
}
function hydrateIcons(root = document) {
  root.querySelectorAll('i[data-icon]').forEach(el => { el.outerHTML = icon(el.dataset.icon, el.className || ''); });
}

/* Prototype navigation: carries ?d= (which demo) between the demo pages */
const FLOW = [
  { file: 'index.html',       name: 'Home' },
  { file: 'demo.html',        name: 'A demo helper', keep: true },
  { file: 'build.html',       name: 'Build', keep: true },
  { file: 'test.html',        name: 'Try it', keep: true },
  { file: 'live.html',        name: 'Live', keep: true },
  { file: 'workspace.html',   name: 'Workspace' },
  { file: 'helper.html',      name: 'Edit a helper' },
  { file: 'inbox.html',       name: 'Needs someone' },
  { file: 'team.html',        name: 'Team' },
  { file: 'connections.html', name: 'Connections' },
  { file: 'anywhere.html',    name: 'Talk anywhere' },
  { file: 'ux-notes.html',    name: 'UX notes' },
  { file: 'map.html',         name: 'Prototype map' }
];
function protoBar() {
  const here = location.pathname.split('/').pop() || 'index.html';
  let i = FLOW.findIndex(f => f.file === here); if (i < 0) i = 0;
  const q = new URLSearchParams(location.search).get('d');
  const href = f => f.file + (f.keep ? `?d=${q || 'receptionist'}` : '');
  const prev = FLOW[i - 1], next = FLOW[i + 1];
  const bar = document.createElement('div');
  bar.className = 'proto'; bar.setAttribute('aria-label', 'Prototype navigation');
  bar.innerHTML = `<span class="tagp">Prototype</span>
    <a href="map.html" title="Map of all screens">${icon('map')}</a>
    ${prev ? `<a href="${href(prev)}" title="Previous: ${prev.name}">${icon('left')}</a>` : ''}
    <span class="where">${FLOW[i].name}</span>
    ${next ? `<a href="${href(next)}" title="Next: ${next.name}">${icon('right')}</a>` : ''}`;
  document.body.appendChild(bar);
  document.addEventListener('keydown', e => {
    if (e.target.closest('input, textarea') || !e.altKey) return;
    if (e.key === 'ArrowRight' && next) location.href = href(next);
    if (e.key === 'ArrowLeft' && prev) location.href = href(prev);
  });
}

/* Helpers */
const wait = ms => new Promise(r => setTimeout(r, ms));
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
function el(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim(); hydrateIcons(t.content);
  return t.content.firstElementChild;
}
function openScrim(id) { const s = document.getElementById(id); s.classList.add('open'); const f = s.querySelector('.modal button, .modal input'); f && f.focus(); }
function closeScrim(id) { document.getElementById(id).classList.remove('open'); }

document.addEventListener('click', e => {
  const t = e.target.closest('.toggle');
  if (t) t.setAttribute('aria-checked', t.getAttribute('aria-checked') === 'true' ? 'false' : 'true');
  const close = e.target.closest('[data-close]');
  if (close) closeScrim(close.dataset.close);
  const s = e.target.closest('.scrim');
  if (s && e.target === s) s.classList.remove('open');
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') $$('.scrim.open, .drawer.open').forEach(x => x.classList.remove('open')); });

const STORE = {
  get(k, d) { try { return JSON.parse(localStorage.getItem('errand:' + k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem('errand:' + k, JSON.stringify(v)); } catch {} }
};
function agentName() { return STORE.get('name', 'Rosa'); }
function fillNames() { $$('[data-agent-name]').forEach(n => n.textContent = agentName()); }

function topbarScroll() {
  const t = $('.topbar'); if (!t) return;
  const on = () => t.classList.toggle('scrolled', scrollY > 8);
  on(); addEventListener('scroll', on, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => { hydrateIcons(); fillNames(); protoBar(); topbarScroll(); });
