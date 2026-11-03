/* Errand studio — shared workspace data and the studio shell (sidebar + top bar).
   Needs app.js, demos.js, render.js. */

const WS = {
  name: 'Moretti Shoe Repair', photo: 'assets/shoe.jpg', plan: 'Small shop',
  me: 'sal',
  team: [
    { id: 'sal',   name: 'Sal Moretti',   first: 'Sal',   role: 'owner',    how: 'Owner',              photo: 'assets/shoe.jpg', contact: '(216) 555-0192', online: true },
    { id: 'marco', name: 'Marco Moretti', first: 'Marco', role: 'editor',   how: 'Grandson, helps with the tech', contact: 'marco.moretti@gmail.com', online: true, tint: '#E0EAF4' },
    { id: 'ana',   name: 'Ana Ruiz',      first: 'Ana',   role: 'approver', how: 'Works the counter, Tue to Sat', contact: '(216) 555-0144', online: false, tint: '#F5E6D8' },
    { id: 'dana',  name: 'Dana Whitfield',first: 'Dana',  role: 'viewer',   how: 'Accountant', contact: 'dana@whitfieldcpa.com', online: false, tint: '#E6EEE2', helpers: ['penny', 'max'] }
  ],
  invites: [{ name: 'Lucia Moretti', contact: '(216) 555-0170', role: 'approver', sent: 'Yesterday' }],
  helpers: [
    { id: 'rosa',  demo: 'receptionist', status: 'working', today: 'Answered 9 calls and booked 3 drop-offs', week: [12, 15, 9, 14, 18, 22, 9], unit: 'calls', needs: 1, edited: ['marco', '10 min ago'], draft: 2 },
    { id: 'penny', demo: 'bookkeeper',   status: 'working', today: 'Sorted 38 transactions', week: [30, 41, 28, 35, 44, 52, 38], unit: 'transactions', needs: 1, edited: ['sal', 'Monday'], draft: 0 },
    { id: 'max',   demo: 'invoices',     status: 'working', today: 'Collected $640 from 2 invoices', week: [2, 1, 3, 0, 2, 4, 2], unit: 'payments', needs: 1, edited: ['sal', 'Oct 28'], draft: 0 },
    { id: 'remy',  demo: 'reviews',      status: 'working', today: 'Asked 6 customers, 2 new reviews', week: [4, 6, 5, 7, 3, 8, 6], unit: 'requests', needs: 0, edited: ['marco', 'Oct 30'], draft: 0 },
    { id: 'willa', demo: 'winback',      status: 'paused',  today: 'Paused by Sal for the holidays', week: [5, 3, 4, 0, 0, 0, 0], unit: 'invites', needs: 0, edited: ['sal', 'Nov 1'], draft: 0 },
    { id: 'otto',  demo: 'inventory',    status: 'draft',   today: 'Setup not finished: connect your register', week: [0, 0, 0, 0, 0, 0, 0], unit: 'orders', needs: 0, edited: ['marco', 'Yesterday'], draft: 0 }
  ],
  inbox: [
    { id: 'i1', h: 'rosa', title: 'Mrs. Patel needs her boots by Saturday for a wedding', who: 'Mrs. Patel', when: '3:58 PM', assignee: 'sal', state: 'open',
      detail: "You don't take rush jobs on Saturdays, so Rosa told her she'd check with you.",
      suggest: 'Make an exception: ready Saturday at 2pm.',
      actions: ['Yes, make an exception', 'No, offer Monday', "I'll call her"],
      convo: [['c', 'Hi, I need my boots fixed by Saturday, my daughter is getting married!'], ['a', "Congratulations! Saturdays are usually full, so let me ask Sal and I'll text you back within the hour."]],
      comments: [['ana', 'She comes in every month, I think we should say yes.', '4:02 PM']] },
    { id: 'i2', h: 'penny', title: 'A $650 Venmo payment to "J Ortiz": what was it for?', who: 'Bank feed', when: '11:20 AM', assignee: 'sal', state: 'open',
      detail: "Penny couldn't match this payment to a bill or receipt.",
      suggest: 'Mark it as "Contract labor" if it was for the weekend help.',
      actions: ['Contract labor', 'Personal, not business', 'Ask me later'],
      convo: [['a', 'Nov 4: VENMO *J ORTIZ, -$650.00. No receipt found in your email.']], comments: [] },
    { id: 'i3', h: 'max', title: 'Janet Hughes still owes $385 after two reminders', who: 'Janet Hughes', when: '9:05 AM', assignee: 'ana', state: 'open',
      detail: 'Max sent reminders on day 7 and day 14. Your rules say ask before a third.',
      suggest: 'Send one more friendly reminder with the pay link.',
      actions: ['Send the reminder', "I'll call her", 'Stop chasing'],
      convo: [['a', 'Reminder 2 sent Oct 31: "Hi Janet, just a friendly reminder that invoice #1042 is still open…"']],
      comments: [['marco', 'She paid late last year too but always pays.', '9:30 AM']] },
    { id: 'i4', h: 'remy', title: 'Draft reply to a 2-star review about a lost heel tip', who: 'Google review', when: 'Yesterday', assignee: 'marco', state: 'done', doneBy: 'marco',
      detail: 'Remy drafted an apology and offered a free repair.', suggest: '', actions: [], convo: [['c', '2 stars: "They lost the heel tip I brought in."'], ['a', 'Draft: "We\'re so sorry, Tom. Please come in and we\'ll make it right, free."']], comments: [] }
  ],
  activity: [
    ['marco', 'changed Rosa\'s greeting', 'rosa', '10 min ago'],
    ['ana', 'commented on Mrs. Patel\'s rush request', 'rosa', '4:02 PM'],
    ['rosa', 'booked Dana for Thursday at 10', 'rosa', '4:05 PM'],
    ['sal', 'paused Willa for the holidays', 'willa', 'Nov 1'],
    ['marco', 'started setting up Otto', 'otto', 'Yesterday'],
    ['dana', 'downloaded October\'s profit report from Penny', 'penny', 'Oct 31']
  ]
};

const ROLES = {
  owner:    { label: 'Owner', d: 'Everything, including billing and removing people.' },
  editor:   { label: 'Can change helpers', d: 'Edit instructions and rules, turn things on and off. Changes wait for the owner to publish.' },
  approver: { label: 'Can handle requests', d: 'Answer "needs you" requests and talk to helpers. Can\'t change how helpers work.' },
  viewer:   { label: 'Can only look', d: 'See activity and reports for the helpers you choose. Can\'t change or approve anything.' }
};

const person = id => WS.team.find(p => p.id === id);
const wsHelper = id => WS.helpers.find(h => h.id === id);
const helperDemo = h => ({ ...demoById(h.demo), name: h.id[0].toUpperCase() + h.id.slice(1) });
const STATUS = { working: ['Working', 'live'], paused: ['Paused', 'off'], draft: ['Not finished', 'wait'] };

function personAva(p, size = 32) {
  if (!p) return '';
  if (p.photo) return `<img class="pava" src="${p.photo}" alt="${esc(p.name)}" style="width:${size}px;height:${size}px">`;
  return `<span class="pava" style="width:${size}px;height:${size}px;background:${p.tint || '#EEE'};font-size:${Math.round(size * .42)}px">${p.first[0]}</span>`;
}
function helperAva(h, size = 32) {
  const d = helperDemo(h);
  return `<span class="ava" style="--tint:${(CATS[d.cat] || CATS.customers).tint};width:${size}px;height:${size}px;font-size:${Math.round(size * .45)}px">${d.name[0]}</span>`;
}
function spark(arr, w = 96, h = 28) {
  const max = Math.max(1, ...arr), step = w / (arr.length - 1);
  const pts = arr.map((v, i) => `${(i * step).toFixed(1)},${(h - 2 - (v / max) * (h - 6)).toFixed(1)}`).join(' ');
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true"><polyline points="${pts}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}
function toast(msg) {
  let t = $('#toast'); if (!t) { t = el('<div id="toast" class="toast" role="status"></div>'); document.body.appendChild(t); }
  t.innerHTML = `${icon('check')}<span></span>`; t.querySelector('span').textContent = msg;
  t.classList.add('show'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2600);
}

/* Studio shell: sidebar + slim top bar. active = 'home' | 'inbox' | 'helper:<id>' | 'team' | 'connections' */
function studioShell(active) {
  const open = WS.inbox.filter(i => i.state === 'open').length;
  const nav = (href, ic, label, key, extra = '') => `<a href="${href}" ${active === key ? 'aria-current="page"' : ''}>${icon(ic)}<span>${label}</span>${extra}</a>`;
  const side = `<nav class="sside" aria-label="Workspace">
    <button class="ws-switch" type="button"><img src="${WS.photo}" alt=""><span><strong>${WS.name}</strong><span class="small faint">${WS.helpers.length} helpers, ${WS.team.length} people</span></span>${icon('sliders')}</button>
    ${nav('workspace.html', 'home', 'Home', 'home')}
    ${nav('inbox.html', 'inbox', 'Needs you', 'inbox', open ? `<span class="count">${open}</span>` : '')}
    <p class="side-label">Helpers</p>
    <div class="side-helpers">${WS.helpers.map(h => { const d = helperDemo(h); const st = STATUS[h.status];
      return `<a href="helper.html?h=${h.id}" ${active === 'helper:' + h.id ? 'aria-current="page"' : ''}>${helperAva(h, 26)}<span>${d.name}<span class="small faint" style="display:block;line-height:1.1">${d.role}</span></span><i class="sdot ${st[1]}" title="${st[0]}"></i></a>`; }).join('')}
      <a href="index.html#helpers" class="add">${icon('plus')}<span>New helper</span></a></div>
    <div class="side-sep"></div>
    ${nav('team.html', 'users', 'Team', 'team')}
    ${nav('connections.html', 'link', 'Connections', 'connections')}
    ${nav('ux-notes.html', 'sliders', 'Settings', 'settings')}
    <button class="btn btn-sm invite-side" type="button" onclick="location.href='team.html#invite'">${icon('plus')} Invite people</button>
  </nav>`;
  const top = `<header class="stop">
    <button class="icon-btn menu-btn" type="button" aria-label="Menu" onclick="document.body.classList.toggle('side-open')">${icon('menu')}</button>
    <a class="brand" href="index.html">errand<i>.</i></a>
    <label class="ssearch">${icon('search')}<input placeholder="Search helpers, customers, conversations" aria-label="Search"></label>
    <div class="row" style="gap:8px">
      <div class="presence" title="Online now">${WS.team.filter(p => p.online).map(p => personAva(p, 30)).join('')}</div>
      <a class="btn btn-primary btn-sm" href="index.html#top">${icon('plus')} New helper</a>
    </div></header>`;
  document.body.insertAdjacentHTML('afterbegin', top + `<div class="sshell">${side}<main class="smain" id="smain"></main></div>`);
  const content = $('#content'); if (content) $('#smain').appendChild(content);
}
