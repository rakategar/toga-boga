/* Toga Boga — Asisten Gizi (DeepSeek via /api/chat) */
(() => {
  const $ = (s) => document.querySelector(s);
  const fab = $('#chatFab');
  const panel = $('#chatPanel');
  const body = $('#chatBody');
  const form = $('#chatForm');
  const input = $('#chatInput');
  const send = $('#chatSend');
  const chips = $('#chatChips');
  const I18N = window.TB_I18N;
  const tr = (id, en) => I18N.tr(id, en);
  const CATALOG = window.TB_CATALOG;
  const WA = 'https://wa.me/6285236064585?text=';
  const STORE = 'tb-chat-v1';
  const REC = /\[\[\s*rekomendasi\s*:([^\]]*)\]\]/i;
  const waIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11 11 0 0 0 3.2 17.3L2 22l4.8-1.2A11 11 0 1 0 20.5 3.5Zm-8.4 17a9 9 0 0 1-4.6-1.3l-.3-.2-2.9.8.8-2.8-.2-.3a9 9 0 1 1 7.2 3.8Zm5-6.7c-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1l-.9 1.1c-.2.2-.3.2-.6.1a7.4 7.4 0 0 1-3.6-3.2c-.3-.5.3-.4.8-1.4.1-.2 0-.3 0-.5l-.9-2c-.2-.6-.5-.5-.6-.5h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.6-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3Z"/></svg>';
  const greeting = () => tr(
    'Halo! 👋 Saya **Asisten Gizi Toga Boga**. Saya bisa bantu soal menu diet, gizi seimbang, harga produk, atau **rekomendasi menu** untuk acaramu. Mau tanya apa hari ini?',
    'Hi! 👋 I’m the **Toga Boga Nutrition Assistant**. I can help with diet menus, balanced nutrition, prices, or **menu recommendations** for your event. What would you like to know today?',
  );

  let history = [];
  try { history = JSON.parse(sessionStorage.getItem(STORE)) || []; } catch {}
  let busy = false;

  const save = () => { try { sessionStorage.setItem(STORE, JSON.stringify(history.slice(-20))); } catch {} };

  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const inline = (s) => esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*(?!\s)(.+?)\*/g, '$1<em>$2</em>')
    .replace(/(https?:\/\/[^\s<)]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
  const md = (text) => {
    const out = [];
    let list = null;
    for (const raw of text.split('\n')) {
      const line = raw.trim();
      const ul = line.match(/^[-*•]\s+(.*)/);
      const ol = line.match(/^\d+[.)]\s+(.*)/);
      if (ul || ol) {
        const type = ul ? 'ul' : 'ol';
        if (!list || list.type !== type) { if (list) out.push(`</${list.type}>`); list = { type }; out.push(`<${type}>`); }
        out.push(`<li>${inline((ul || ol)[1])}</li>`);
        continue;
      }
      if (list) { out.push(`</${list.type}>`); list = null; }
      if (line) out.push(`<p>${inline(line.replace(/^#+\s*/, ''))}</p>`);
    }
    if (list) out.push(`</${list.type}>`);
    return out.join('');
  };

  /* Pisahkan teks jawaban dari tag [[rekomendasi: ...]]; potongan tag yang belum lengkap disembunyikan saat streaming. */
  const split = (text) => {
    const m = text.match(REC);
    const ids = m ? m[1].split(',').map((s) => s.trim().toLowerCase()).filter(Boolean) : [];
    let clean = m ? text.replace(REC, '') : text;
    const open = clean.lastIndexOf('[[');
    if (open !== -1 && !clean.includes(']]', open)) clean = clean.slice(0, open);
    else if (/\[$/.test(clean)) clean = clean.slice(0, -1);
    return { clean: clean.trim(), ids };
  };

  const bubble = (role, text, extra = '') => {
    const el = document.createElement('div');
    el.className = `msg msg--${role === 'user' ? 'me' : 'bot'} ${extra}`;
    if (role === 'user') el.textContent = text; else el.innerHTML = md(text);
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
    return el;
  };

  const waOrder = (item) => WA + encodeURIComponent(tr(
    `Halo Toga Boga, saya dari website. Saya tertarik dengan ${item.name} (${item.price}). Apakah tersedia?`,
    `Hello Toga Boga, I found you on your website. I’m interested in ${item.name} (${item.price}). Is it available?`,
  ));

  const cards = (ids, after) => {
    const items = [...new Set(ids)].map((id) => CATALOG?.get(id)).filter(Boolean).slice(0, 4);
    if (!items.length) return false;
    const wrap = document.createElement('div');
    wrap.className = 'recs';
    wrap.innerHTML = `<div class="recs__track" role="list" aria-label="${tr('Rekomendasi menu', 'Recommended menu')}">${items.map((it, i) => `
      <article class="rec${it.sold ? ' rec--sold' : ''}" role="listitem" style="--i:${i}">
        ${it.svc ? `<button class="rec__img" data-svc-open="${it.svc}" aria-label="${tr('Lihat detail', 'View details of')} ${esc(it.name)}">` : '<div class="rec__img">'}
          <img src="${it.img}" alt="" loading="lazy">
          <span class="rec__price">${esc(it.price)}</span>
          ${it.sold ? '<span class="rec__sold">Sold out</span>' : ''}
        ${it.svc ? '</button>' : '</div>'}
        <div class="rec__body">
          <span class="rec__cat">${esc(it.cat)}</span>
          <b class="rec__name">${esc(it.name)}</b>
          <a class="rec__wa" href="${waOrder(it)}" target="_blank" rel="noopener">${waIcon}${it.sold ? tr('Tanya stok', 'Ask stock') : tr('Pesan via WA', 'Order via WA')}</a>
        </div>
      </article>`).join('')}</div>`;
    const ready = items.filter((it) => !it.sold);
    if (ready.length > 1) {
      const all = document.createElement('a');
      all.className = 'recs__all';
      all.target = '_blank';
      all.rel = 'noopener';
      const list = ready.map((it) => `- ${it.name} (${it.price})`).join('\n');
      all.href = WA + encodeURIComponent(tr(
        `Halo Toga Boga, saya dari website. Saya ingin pesan/tanya:\n${list}\nMohon info ketersediaan dan total harganya. Terima kasih!`,
        `Hello Toga Boga, I found you on your website. I’d like to order / ask about:\n${list}\nPlease let me know availability and the total price. Thank you!`,
      ));
      all.innerHTML = `${waIcon}${tr(`Pesan ${ready.length} menu ini via WhatsApp`, `Order these ${ready.length} items via WhatsApp`)}`;
      wrap.appendChild(all);
    }
    after.after(wrap);
    body.scrollTop = body.scrollHeight;
    return true;
  };

  const addWa = (el, text) => {
    if (!/whatsapp|pesan|order|0852/i.test(text)) return;
    const lastUser = [...history].reverse().find((m) => m.role === 'user');
    const a = document.createElement('a');
    a.className = 'msg-wa';
    a.target = '_blank';
    a.rel = 'noopener';
    a.href = WA + encodeURIComponent(`${tr('Halo Toga Boga, saya dari website.', 'Hello Toga Boga, I found you on your website.')} ${lastUser ? `${tr('Pertanyaan saya', 'My question')}: ${lastUser.content}` : ''}`.trim());
    a.textContent = tr('Lanjut di WhatsApp →', 'Continue on WhatsApp →');
    el.appendChild(a);
  };

  /* Balasan asisten: teks + kartu, atau tombol WA bila tidak ada kartu. */
  const finish = (el, reply) => {
    const { clean, ids } = split(reply);
    el.innerHTML = md(clean);
    if (!cards(ids, el)) addWa(el, clean);
  };

  const render = () => {
    body.innerHTML = '';
    bubble('assistant', greeting());
    history.forEach((m) => {
      const el = bubble(m.role, m.role === 'user' ? m.content : '');
      if (m.role === 'assistant') finish(el, m.content);
    });
    chips.hidden = history.length > 0;
  };

  const open = (state) => {
    panel.hidden = !state;
    fab.setAttribute('aria-expanded', state);
    document.body.classList.toggle('chat-open', state);
    if (state) {
      fab.classList.add('seen');
      if (!body.childElementCount) render();
      body.scrollTop = body.scrollHeight;
      if (matchMedia('(pointer: fine)').matches) input.focus();
    }
  };

  fab.addEventListener('click', () => open(panel.hidden));
  $('#chatClose').addEventListener('click', () => { open(false); fab.focus(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden && !document.querySelector('dialog[open]')) open(false); });
  document.querySelectorAll('[data-open-chat]').forEach((b) => b.addEventListener('click', () => open(true)));
  body.addEventListener('click', (e) => {
    const b = e.target.closest('[data-svc-open]');
    if (b) CATALOG?.openService(b.dataset.svcOpen);
  });
  document.addEventListener('tb:lang', () => { if (body.childElementCount && !busy) render(); });

  const ask = async (text) => {
    if (busy || !text.trim()) return;
    busy = true;
    send.disabled = true;
    chips.hidden = true;
    history.push({ role: 'user', content: text.trim() });
    bubble('user', text.trim());
    save();

    const bot = bubble('assistant', '');
    bot.innerHTML = '<span class="typing"><i></i><i></i><i></i></span>';
    let reply = '';
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: history, lang: I18N.lang }),
      });
      if (!res.ok || !res.body) {
        throw new Error(res.status === 429
          ? tr('Terlalu banyak pesan. Coba lagi beberapa menit lagi.', 'Too many messages. Please try again in a few minutes.')
          : tr('Maaf, asisten sedang tidak bisa dihubungi.', 'Sorry, the assistant is unavailable right now.'));
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += dec.decode(value, { stream: true });
        const { clean } = split(reply);
        if (clean) bot.innerHTML = md(clean);
        body.scrollTop = body.scrollHeight;
      }
      if (!reply.trim()) throw new Error(tr('Maaf, belum ada jawaban. Coba ulangi pertanyaanmu.', 'Sorry, no answer yet. Please try asking again.'));
      history.push({ role: 'assistant', content: reply });
      save();
      finish(bot, reply);
    } catch (err) {
      bot.classList.add('msg--err');
      bot.innerHTML = md(`${err.message || tr('Terjadi kesalahan.', 'Something went wrong.')} ${tr('Kamu juga bisa langsung chat kami di WhatsApp.', 'You can also chat with us directly on WhatsApp.')}`);
      const a = document.createElement('a');
      a.className = 'msg-wa';
      a.href = WA + encodeURIComponent(`${tr('Halo Toga Boga, saya ingin bertanya', 'Hello Toga Boga, I have a question')}: ${text}`);
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = tr('Chat WhatsApp →', 'Chat on WhatsApp →');
      bot.appendChild(a);
      history.pop();
      save();
    } finally {
      busy = false;
      send.disabled = false;
    }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const t = input.value;
    input.value = '';
    input.style.height = '';
    ask(t);
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); form.requestSubmit(); }
  });
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = `${Math.min(input.scrollHeight, 120)}px`;
  });
  chips.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (b) ask(b.textContent);
  });
})();
