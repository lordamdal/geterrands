/* Errand prototype — renders a demo helper: its card, and a scripted "watch it work" run.
   Needs app.js and demos.js. */

const STEP_TOOLS = {
  website: ['globe', 'Your website'], phone: ['phone', 'Phone number'], voice: ['mic', 'Voice'],
  calendar: ['calendar', 'Calendar'], email: ['mail', 'Email'], accounting: ['book', 'QuickBooks'],
  bank: ['bank', 'Bank (read only)'], payments: ['card', 'Card payments'], social: ['heart', 'Instagram and Facebook'],
  contacts: ['users', 'Customer list'], reviews: ['star', 'Google listing'], shop: ['store', 'Online shop'],
  channels: ['chat', 'More channels'], you: ['sms', 'Texts you'], rules: ['sliders', 'House rules']
};
const KIND_LABEL = { sms: 'Text messages', call: 'Phone call', chat: 'Website chat', email: 'Email', ledger: 'Bookkeeping', post: 'Instagram and Facebook' };
const KIND_ICON = { sms: 'sms', call: 'phone', chat: 'chat', email: 'mail', ledger: 'book', post: 'heart' };

function catTint(d) { return (CATS[d.cat] || CATS.customers).tint; }

function avatarHTML(d, size = '') {
  return `<span class="ava ${size}" style="--tint:${catTint(d)}">${d.name[0]}</span>`;
}

/* The helper's card — the main object of the product */
function helperCard(d, { status = 'Working', live = true } = {}) {
  const tools = d.steps.filter(s => !['you', 'rules', 'voice', 'channels'].includes(s)).map(s => {
    const [ic, label] = STEP_TOOLS[s];
    return `<span class="tag">${icon(ic)}${s === 'accounting' ? 'QuickBooks' : label}</span>`;
  }).join('');
  return `<div class="badge">
    ${d.photo ? `<div class="badge-cover"><img src="${d.photo}" alt="${esc(d.biz)}"></div>` : ''}
    <div class="badge-top">${avatarHTML(d, 'lg')}<div class="who"><strong>${d.name}</strong><span class="role">${d.role}, ${d.biz}</span></div>
      <span class="pill ${live ? 'live' : 'off'}">${status}</span></div>
    ${d.number ? `<div class="badge-row"><span class="k">Phone</span><span class="v"><span class="badge-phone num">${d.number}</span></span></div>` : ''}
    <div class="badge-row"><span class="k">Job</span><span class="v" style="font-weight:400">${d.summary}</span></div>
    <div class="badge-row"><span class="k">Uses</span><span class="v">${tools}</span></div>
    <div class="badge-row"><span class="k">Reaches you</span><span class="v">Texts ${d.owner}</span></div>
  </div>`;
}

/* A photo of the business with the helper's latest note floating on it */
function photoHTML(d, { h = 320, note = true, tag = true, cls = '' } = {}) {
  const ask = /need/i.test(d.teaser);
  return `<div class="photo ${cls}" style="height:${h}px"><img src="${d.photo}" alt="${esc(d.biz)}" loading="lazy">
    ${tag ? `<span class="tagline">${esc(d.biz)}</span>` : ''}
    ${note ? `<div class="note ${ask ? 'needs' : ''}">${avatarHTML(d)}<span><b>${d.name}</b> ${esc(d.teaser)}</span></div>` : ''}</div>`;
}

/* ---------- Watch-it-work player ---------- */
function parseLabel(d, who, text) {
  let label = who === 'a' ? d.name : who === 'o' ? d.owner : '';
  const m = text.match(/^\(([^)]+)\)\s*/);
  if (m) { label = `${who === 'a' ? d.name : label}, ${m[1].charAt(0).toLowerCase() + m[1].slice(1)}`; text = text.slice(m[0].length); }
  return { label, text };
}
function bubbleHTML(d, who, raw, otherName) {
  const { label, text } = parseLabel(d, who, raw);
  const cls = who === 'a' ? 'agent' : who === 'o' ? 'me' : 'other';
  const name = label || otherName || 'Customer';
  const photo = text.match(/^\[(\d+ )?photos?[^\]]*\]\s*/i);
  const body = photo
    ? `<div class="photo-ph">${icon('image')}<span>${esc(photo[0].replace(/[\[\]]/g, '').trim())}</span></div>${text.slice(photo[0].length) ? `<div style="margin-top:6px">${esc(text.slice(photo[0].length))}</div>` : ''}`
    : esc(text);
  return `<div class="sms ${cls}"><div class="who">${esc(name)}</div>${body}</div>`;
}

const PLAYERS = new WeakMap();

function playWatch(container, d, { onDid = () => {}, speed = 1, onDone = () => {} } = {}) {
  const run = (PLAYERS.get(container) || 0) + 1; PLAYERS.set(container, run);
  const alive = () => PLAYERS.get(container) === run;
  const w = d.watch, k = w.kind;
  const T = ms => wait(ms / speed);

  if (k === 'sms' || k === 'call' || k === 'chat') {
    const head = k === 'call'
      ? `${icon('phone')}<span>${esc(w.title)}</span><span class="num faint" data-timer style="margin-left:auto">0:00</span>`
      : k === 'chat'
        ? `${avatarHTML(d)}<span>${esc(d.biz)}<br><span class="small faint" style="font-weight:400">Chat, usually replies instantly</span></span>`
        : `${avatarHTML(d)}<span>${esc(w.title)}</span>`;
    container.innerHTML = `<div class="phone ${k === 'chat' ? 'chatbox' : ''}"><div class="phone-top">${head}</div><div class="phone-screen"></div>
      ${k === 'call' ? `<div class="callbar"><span class="small faint">Live transcript</span><span class="pill live">On the call</span></div>` : `<div class="typebar"><span>Message</span>${icon('send')}</div>`}</div>`;
    const scr = $('.phone-screen', container);
    let sec = 0; const tick = k === 'call' ? setInterval(() => { if (!alive()) return clearInterval(tick); sec++; const t = $('[data-timer]', container); if (t) t.textContent = `0:${String(sec).padStart(2, '0')}`; }, 1000) : null;
    (async () => {
      for (const [who, text, did] of w.lines) {
        await T(who === 'a' ? 1150 : 850); if (!alive()) return;
        scr.insertAdjacentHTML('beforeend', bubbleHTML(d, who, text, k === 'call' ? 'Caller' : null));
        scr.scrollTop = scr.scrollHeight;
        if (did) onDid(did);
      }
      if (tick) { clearInterval(tick); $('.callbar .pill', container).outerHTML = '<span class="pill off">Call ended</span>'; }
      onDone();
    })();
    return;
  }

  if (k === 'email') {
    container.innerHTML = `<div class="mock mail">
      <div class="mail-head"><p class="label">${esc(w.title)}</p><h3 class="h3-serif" style="margin-top:4px">${esc(w.subject)}</h3>
        <p class="small muted" style="margin-top:6px">From <strong style="font-weight:550">${esc(w.from)}</strong> to ${esc(w.to)}</p></div>
      <div class="mail-body"></div></div>`;
    const body = $('.mail-body', container);
    (async () => {
      for (const line of w.body) {
        await T(260); if (!alive()) return;
        const btn = line.match(/^\[\s*(.+?)\s*\]$/);
        body.insertAdjacentHTML('beforeend', btn ? `<p><span class="mail-btn">${esc(btn[1])}</span></p>` : `<p>${esc(line)}</p>`);
      }
      for (const [who, name, text, did] of (w.replies || [])) {
        await T(1400); if (!alive()) return;
        body.insertAdjacentHTML('beforeend', `<div class="mail-reply ${who === 'a' ? 'agent' : ''}"><p class="label">${esc(name)} replied</p><p>${esc(text)}</p></div>`);
        body.scrollTop = body.scrollHeight;
        if (did) onDid(did);
      }
      for (const did of (w.did || [])) { await T(300); if (!alive()) return; onDid(did); }
      onDone();
    })();
    return;
  }

  if (k === 'ledger') {
    container.innerHTML = `<div class="mock ledger"><div class="mail-head"><p class="label">Bank feed</p><h3 class="h3-serif" style="margin-top:4px">${esc(w.title)}</h3></div>
      <table><thead><tr><th>Date</th><th>Description</th><th class="r">Amount</th><th>Category</th></tr></thead><tbody></tbody></table></div>`;
    const tb = $('tbody', container);
    (async () => {
      for (const [date, desc, amt, cat, st] of w.rows) {
        await T(500); if (!alive()) return;
        const tr = el(`<table><tr><td class="faint">${date}</td><td>${esc(desc)}</td><td class="r num ${amt.startsWith('+') ? 'pos' : ''}">${amt}</td><td><span class="sorting">Sorting…</span></td></tr></table>`).querySelector('tr');
        tb.appendChild(tr);
        await T(650); if (!alive()) return;
        tr.lastElementChild.innerHTML = st === 'ask' ? `<span class="pill wait">${esc(cat)}</span>` : `<span class="pill on">${esc(cat)}</span>`;
      }
      for (const did of (w.did || [])) { await T(350); if (!alive()) return; onDid(did); }
      onDone();
    })();
    return;
  }

  if (k === 'post') {
    container.innerHTML = `<div class="post-wrap">
      <div class="mock post"><div class="post-head">${avatarHTML(d)}<span><strong style="font-weight:550">${esc(w.handle)}</strong><br><span class="small faint">Draft, waiting for ${esc(d.owner)}</span></span></div>
        <div class="post-img"><span>${icon('image')} Photo from ${esc(d.owner)}</span></div>
        <div class="post-cap"><p class="cap"></p><p class="tags"></p></div></div>
      <div class="post-thread"></div></div>`;
    const cap = $('.cap', container), tags = $('.tags', container), th = $('.post-thread', container);
    (async () => {
      const [first, ...rest] = w.lines;
      th.insertAdjacentHTML('beforeend', bubbleHTML(d, first[0], first[1]));
      await T(600);
      for (const word of w.caption.split(' ')) { if (!alive()) return; cap.textContent += (cap.textContent ? ' ' : '') + word; await T(45); }
      tags.textContent = w.tags;
      for (const [who, text, did] of rest) {
        await T(1100); if (!alive()) return;
        th.insertAdjacentHTML('beforeend', bubbleHTML(d, who, text));
        if (did) onDid(did);
        if (/scheduled/i.test(text)) $('.post-head .faint', container).textContent = 'Scheduled for 7:00 PM';
      }
      onDone();
    })();
  }
}

/* Small helper card used in galleries */
function demoCardHTML(d) {
  const c = CATS[d.cat];
  return `<a class="dcard" href="demo.html?d=${d.id}" data-cat="${d.cat}">
    ${photoHTML(d, { h: 210, tag: false, cls: 'dcard-photo' })}
    <div class="dcard-body">
      <p class="label" style="color:${c.ink}">${icon(CAT_ICON[d.cat])}${c.label}</p>
      <h3 class="h3-serif">${d.role}</h3>
      <p class="kicker">“${d.prompt.length > 96 ? d.prompt.slice(0, 94).replace(/\s+\S*$/, '') + '…' : d.prompt}”</p>
      <p class="small faint">${d.biz}</p>
    </div></a>`;
}

const STEP_ASK = {
  website: 'Your website, to learn your business', phone: 'A phone number: a new one or yours',
  voice: 'How it sounds on the phone', calendar: 'Your calendar, to book appointments',
  email: 'Your email, or an address of its own', accounting: 'QuickBooks, Xero or a spreadsheet',
  bank: 'Your business bank account, read only', payments: 'Stripe, Square or PayPal, for card payments',
  social: 'Your Instagram and Facebook pages', contacts: 'Who it should reach out to',
  reviews: 'Your Google business listing', shop: 'Your online shop or register',
  channels: 'Extra places to talk to customers', you: 'How it should reach you', rules: 'Your house rules'
};
