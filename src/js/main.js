/* Toga Boga — interaksi halaman */
(() => {
  const WA = '6285236064585';
  const waLink = (text) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const IMG = '/src/img/produk/';
  const waIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11 11 0 0 0 3.2 17.3L2 22l4.8-1.2A11 11 0 1 0 20.5 3.5Zm-8.4 17a9 9 0 0 1-4.6-1.3l-.3-.2-2.9.8.8-2.8-.2-.3a9 9 0 1 1 7.2 3.8Zm5-6.7c-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1l-.9 1.1c-.2.2-.3.2-.6.1a7.4 7.4 0 0 1-3.6-3.2c-.3-.5.3-.4.8-1.4.1-.2 0-.3 0-.5l-.9-2c-.2-.6-.5-.5-.6-.5h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.6-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3Z"/></svg>';

  /* ---------- Data ---------- */
  const I18N = window.TB_I18N;
  const tr = (id, en) => I18N.tr(id, en);
  const L = (o, k) => (I18N.lang === 'en' && o.en?.[k] != null ? o.en[k] : o[k]);

  const services = [
    { id: 'diet', group: 'makan', cat: 'Katering Diet', title: 'Katering Diet DASH', price: 'Rp18.000', unit: '/porsi', badge: 'Favorit',
      desc: 'Menu diet DASH (Dietary Approaches to Stop Hypertension) yang dirancang ahli gizi — kaya sayur, buah, dan protein rendah lemak dengan garam terkontrol.',
      imgs: ['diet-dash', 'diet-1', 'diet-2', 'diet-3', 'diet-4', 'diet-6', 'diet-7', 'diet-8'],
      en: { cat: 'Diet Catering', title: 'DASH Diet Catering', price: 'Rp18,000', unit: '/portion', badge: 'Favourite',
        desc: 'DASH (Dietary Approaches to Stop Hypertension) diet menus designed by a nutritionist — rich in vegetables, fruit and lean protein, with controlled salt.' } },
    { id: 'institusi', group: 'makan', cat: 'Makanan Institusi', title: 'Full Meal Pasien Puskesmas', price: 'Rp15.000', unit: '/porsi',
      desc: 'Makanan full meal untuk pasien rawat inap Puskesmas: diet TETP (Tinggi Energi Tinggi Protein) dan tinggi serat.',
      imgs: ['diet-puskesmas'],
      en: { cat: 'Institutional Meals', title: 'Full Meals for Health Centre Inpatients', price: 'Rp15,000', unit: '/portion',
        desc: 'Full meals for community health centre (Puskesmas) inpatients: high-energy high-protein (TETP) and high-fibre diets.' } },
    { id: 'tumpeng', group: 'makan', cat: 'Katering Non-Diet', title: 'Tumpeng Nasi & Tumpeng Puding', price: 'Rp125rb – 600rb', unit: '',
      desc: 'Tumpeng nasi lengkap dengan lauk dan tumpeng puding warna-warni untuk syukuran, ulang tahun, dan acara kantor. Harga mulai Rp125.000 s.d. Rp600.000.',
      imgs: ['tumpeng-nasi-2', 'tumpeng-nasi', 'tumpeng-puding'],
      en: { cat: 'Non-Diet Catering', title: 'Rice Tumpeng & Pudding Tumpeng', price: 'Rp125k – 600k',
        desc: 'A rice tumpeng with complete side dishes and colourful pudding tumpeng for thanksgivings, birthdays and office events. From Rp125,000 to Rp600,000.' } },
    { id: 'pmt', group: 'makan', cat: 'PMT', title: 'PMT Ibu Hamil & Balita', price: 'Rp21.500', unit: '/paket',
      desc: 'Paket Pemberian Makanan Tambahan untuk ibu hamil (Bumil) dan balita, disusun sesuai kebutuhan gizi kelompok rentan.',
      imgs: ['pmt-bumil', 'pmt-balita'],
      en: { cat: 'Supplementary Meals', title: 'Supplementary Meals for Pregnant Women & Toddlers', price: 'Rp21,500', unit: '/package',
        desc: 'Supplementary feeding (PMT) packages for pregnant women and toddlers, put together around the nutritional needs of vulnerable groups.' } },
    { id: 'frozen', group: 'produk', cat: 'Frozen Food', title: 'Frozen Food Rumahan', price: 'Rp30.000', unit: '/pack',
      desc: 'Pao waluh, siomay, otak-otak kakap, bakso, kaki naga, dumpling, sempol, galantin, ekado, karipap, nugget, risol, tahu bakso, sosis solo, dan lainnya. Semua varian Rp30.000.',
      imgs: ['ff-otak-otak', 'ff-siomay', 'ff-kaki-naga', 'ff-karipap'], anchor: '#frozen',
      en: { title: 'Homemade Frozen Food', price: 'Rp30,000',
        desc: 'Pumpkin bao, siomay, snapper otak-otak, meatballs, kaki naga, dumplings, sempol, galantine, ekado, curry puffs, nuggets, risoles, meatball tofu, sosis solo and more. Every variety is Rp30,000.' } },
    { id: 'kue', group: 'produk', cat: 'Kue Kering', title: 'Kue Kering & Hampers', price: 'Mulai Rp35rb', unit: '/toples',
      desc: 'Nastar, kastengels, cheese balls, lidah kucing, dan aneka kue kering rumahan dalam toples poppy 500 ml. Tersedia hampers keranjang anyam (+Rp25.000).',
      imgs: ['kukis', 'kue-kering', 'katalog-kue'], anchor: '#kue',
      en: { cat: 'Cookies', title: 'Cookies & Hampers', price: 'From Rp35k', unit: '/jar',
        desc: 'Nastar, kastengels, cheese balls, cat’s tongue and other homemade cookies in 500 ml poppy jars. Woven-basket hampers available (+Rp25,000).' } },
    { id: 'konsultasi', group: 'edukasi', cat: 'Konsultasi Diet', title: 'Konsultasi Menu Diet', price: 'Gratis', unit: '', badge: 'Rp0',
      desc: 'Konsultasi menu diet bersama ahli gizi tanpa biaya. Ceritakan kebutuhanmu, kami bantu susun pilihan menu yang sesuai.',
      imgs: ['konsultasi'],
      en: { cat: 'Diet Consultation', title: 'Diet Menu Consultation', price: 'Free',
        desc: 'Free diet menu consultation with a nutritionist. Tell us what you need and we will help put together the right menu options.' } },
    { id: 'cooking', group: 'edukasi', cat: 'Cooking Class', title: 'Cooking Class Anak-Anak', price: 'Rp35rb – 40rb', unit: '/anak',
      desc: 'Anak-anak memetik bahan pangan langsung dari kebun, lalu mengolahnya menjadi hidangan. Belajar memasak jadi seru dan dekat dengan alam.',
      imgs: ['cooking-class'],
      en: { title: 'Kids Cooking Class', price: 'Rp35k – 40k', unit: '/child',
        desc: 'Kids pick ingredients straight from the garden, then cook them into dishes. Learning to cook becomes fun and close to nature.' } },
    { id: 'pelatihan', group: 'edukasi', cat: 'Pelatihan', title: 'Pelatihan Pengolahan Makanan & Minuman', price: 'Hubungi kami', unit: '',
      desc: 'Pelatihan pengolahan makanan/minuman — termasuk menghitung HPP dan mengelola usaha sederhana. Telah bekerja sama dengan Disnaker Kota Probolinggo (BLK Kejuruan & BLK Disabilitas).',
      imgs: ['pelatihan-kejuruan', 'pelatihan-disabilitas'],
      en: { cat: 'Training', title: 'Food & Beverage Processing Training', price: 'Contact us',
        desc: 'Food/beverage processing training — including calculating production cost (HPP) and running a small business. Delivered with the Probolinggo City Manpower Office (vocational & disability BLK).' } },
    { id: 'pemateri', group: 'edukasi', cat: 'Pemateri', title: 'Pemateri Gizi & Nutrisi', price: 'Hubungi kami', unit: '',
      desc: 'Undang Dhaniar Mudita, S.Gz., M.P. sebagai pemateri edukasi gizi — seperti kelas “Edukasi Gizi Nutrisi Anak”.',
      imgs: ['pemateri'],
      en: { cat: 'Speaker', title: 'Nutrition Speaker', price: 'Contact us',
        desc: 'Invite Dhaniar Mudita, S.Gz., M.P. to speak on nutrition education — such as the “Child Nutrition Education” class.' } },
  ];

  // [id, nama, nama EN]; id = nama file foto
  const frozen = [
    ['ff-otak-otak', 'Otak-Otak Kakap', 'Snapper Otak-Otak'], ['ff-siomay', 'Siomay', 'Siomay'], ['ff-kaki-naga', 'Kaki Naga', 'Kaki Naga (Fish Drumsticks)'],
    ['ff-karipap', 'Karipap', 'Curry Puffs'], ['ff-risol-mac', 'Risol Mac & Cheese', 'Mac & Cheese Risoles'],
    ['ff-risol-ragout', 'Risol Creamy Ragout', 'Creamy Ragout Risoles'], ['ff-pao-waluh', 'Pao Waluh', 'Pumpkin Bao'],
    ['ff-bakso-ayam-sapi', 'Bakso Ayam Mix Sapi', 'Chicken & Beef Meatballs'], ['ff-bakso-lohoa', 'Bakso Lohoa', 'Lohoa Meatballs'],
    ['ff-sempol', 'Sempol', 'Sempol'], ['ff-nugget', 'Nugget', 'Nuggets'], ['ff-tahu-bakso', 'Tahu Bakso', 'Meatball-Stuffed Tofu'],
    ['ff-sosis-solo', 'Sosis Solo', 'Sosis Solo'], ['ff-ekado', 'Ekado', 'Ekado'], ['ff-rolade', 'Rolade Ayam Kelor', 'Chicken & Moringa Roulade'],
  ];

  // [id, nama, nama EN, harga (rb), sold out]
  const cookies = [
    ['ck-putri-salju', 'Putri Salju', 'Putri Salju (Snow Crescents)', 50, true], ['ck-choco-stick', 'Choco Stick', 'Choco Stick', 55, true],
    ['ck-choco-mede', 'Choco Mede', 'Choco Cashew', 60, true], ['ck-emping-keju', 'Emping Keju', 'Cheese Emping', 50],
    ['ck-nastar', 'Nastar Klasik', 'Classic Nastar', 65], ['ck-monde', 'Monde Milky', 'Monde Milky', 40],
    ['ck-semprit-dubai', 'Semprit Dubai (pistachio + mawar)', 'Dubai Semprit (pistachio + rose)', 45, true],
    ['ck-pindakas', 'Pindakas Kue Kacang', 'Peanut Butter Cookies', 35], ['ck-lesung-mede', 'Lesung Mede Stroberi', 'Strawberry Cashew Thumbprints', 50],
    ['ck-cheese-balls', 'Cheese Balls', 'Cheese Balls', 60], ['ck-lidah-kucing', 'Lidah Kucing Kenari', 'Kenari Cat’s Tongue', 50, true],
    ['ck-larut-pandan', 'Larut Pandan Keju', 'Pandan Cheese Melts', 35], ['ck-chui-kao-so', 'Chui Kao So Emping Keju', 'Chui Kao So Cheese Emping', 40],
    ['ck-kastengels', 'Kastengels', 'Kastengels', 55],
  ];

  /* Katalog bersama untuk kartu rekomendasi di chat (chat.js). */
  window.TB_CATALOG = {
    get(id) {
      const s = services.find((x) => x.id === id);
      if (s) {
        return { id, img: IMG + s.imgs[0] + '.webp', cat: L(s, 'cat'), name: L(s, 'title'), price: L(s, 'price') + (L(s, 'unit') || ''), svc: id };
      }
      const f = frozen.find((x) => x[0] === id);
      if (f) return { id, img: IMG + f[0] + '.webp', cat: 'Frozen Food', name: tr(f[1], f[2]), price: tr('Rp30.000', 'Rp30,000') };
      const c = cookies.find((x) => x[0] === id);
      if (c) {
        return { id, img: IMG + 'kukis.webp', cat: tr('Kue Kering', 'Cookies'), name: tr(c[1], c[2]), price: tr(`Rp${c[3]}.000`, `Rp${c[3]},000`) + tr('/toples', '/jar'), sold: !!c[4] };
      }
      return null;
    },
    waLink,
    openService: (id) => openModal(id),
  };

  /* ---------- Render ---------- */
  const grid = $('#svcGrid');
  const scroller = $('#ffScroller');
  const renderAll = () => {
    grid.innerHTML = services.map((s, i) => `
    <article class="svc reveal" data-group="${s.group}" style="--d:${(i % 3) * 0.08}s">
      <button class="svc-open" data-svc="${s.id}" aria-label="${tr('Lihat detail', 'View details of')} ${L(s, 'title')}"></button>
      <div class="svc__img">
        <img src="${IMG + s.imgs[0]}.webp" alt="${L(s, 'title')}" loading="lazy" width="900" height="675">
        <span class="svc__price">${L(s, 'price')}<small style="font-weight:600">${L(s, 'unit')}</small></span>
        ${s.badge ? `<span class="svc__badge">${L(s, 'badge')}</span>` : ''}
      </div>
      <div class="svc__body">
        <span class="svc__cat">${L(s, 'cat')}</span>
        <h3 class="svc__title">${L(s, 'title')}</h3>
        <p class="svc__desc">${L(s, 'desc')}</p>
        <div class="svc__foot">
          <span class="svc__more">${tr('Lihat detail', 'View details')}</span>
          <a class="svc__wa" href="${waLink(tr(`Halo Toga Boga, saya ingin tanya/pesan: ${s.title}`, `Hello Toga Boga, I would like to ask about / order: ${s.en.title}`))}" target="_blank" rel="noopener" aria-label="${tr('Pesan', 'Order')} ${L(s, 'title')} ${tr('via WhatsApp', 'via WhatsApp')}">${waIcon}</a>
        </div>
      </div>
    </article>`).join('');

    scroller.innerHTML = frozen.map(([img, name, nameEn], i) => `
    <a class="ff-card" href="${waLink(tr(`Halo Toga Boga, saya ingin pesan frozen food: ${name} (Rp30.000)`, `Hello Toga Boga, I would like to order frozen food: ${nameEn} (Rp30,000)`))}" target="_blank" rel="noopener">
      <img src="${IMG + img}.webp" alt="Frozen food ${tr(name, nameEn)}" loading="lazy">
      <span class="ff-card__no">${String(i + 1).padStart(2, '0')}</span>
      <span class="ff-card__body">
        <span class="ff-card__name">${tr(name, nameEn)}</span>
        <span class="ff-card__row"><span class="ff-card__price">${tr('Rp30.000', 'Rp30,000')}</span><span class="ff-card__go">${tr('Pesan', 'Order')} →</span></span>
      </span>
    </a>`).join('');

    $('#cookieList').innerHTML = cookies.map(([, n, nEn, p, sold]) => `
    <li class="${sold ? 'sold' : ''}"><span class="n">${tr(n, nEn)}</span>${sold ? '<span class="sold-tag">Sold out</span>' : ''}<span class="dots"></span><span class="p">${p}k</span></li>`).join('');

    /* ---------- WhatsApp links ---------- */
    $$('[data-wa]').forEach((a) => {
      a.href = waLink(a.dataset.wa);
      a.target = '_blank';
      a.rel = 'noopener';
    });
  };
  renderAll();

  /* ---------- Nav ---------- */
  const nav = $('#nav');
  const burger = $('#burger');
  const menu = $('#mobileMenu');
  const toggleMenu = (open) => {
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? tr('Tutup menu', 'Close menu') : tr('Buka menu', 'Open menu'));
    menu.hidden = !open;
  };
  burger.addEventListener('click', () => toggleMenu(menu.hidden));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) toggleMenu(false); });

  let lastY = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY;
    nav.classList.toggle('is-hidden', y > lastY && y > 400 && menu.hidden);
    lastY = y;
  }, { passive: true });

  const links = $$('.nav__links a');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === `#${en.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach((s) => spy.observe(s));

  /* ---------- Reveal + counters ---------- */
  const countUp = (el) => {
    const end = +el.dataset.count;
    if (reduceMotion) { el.textContent = end; return; }
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / 1400);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add('is-in');
      $$('[data-count]', en.target).forEach(countUp);
      io.unobserve(en.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach((el) => io.observe(el));

  /* ---------- Hero parallax ---------- */
  const plates = $$('.plate');
  if (!reduceMotion && matchMedia('(pointer: fine)').matches) {
    const hero = $('.hero');
    hero.addEventListener('pointermove', (e) => {
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      plates.forEach((p) => {
        const d = +p.dataset.depth;
        p.style.translate = `${x * d}px ${y * d}px`;
      });
    });
  }

  /* ---------- Tilt cards & button glow ---------- */
  if (!reduceMotion && matchMedia('(pointer: fine)').matches) {
    $$('.tilt').forEach((c) => {
      c.addEventListener('pointermove', (e) => {
        const r = c.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
      });
      c.addEventListener('pointerleave', () => { c.style.transform = ''; });
    });
    document.addEventListener('pointermove', (e) => {
      const b = e.target.closest?.('.btn');
      if (!b) return;
      const r = b.getBoundingClientRect();
      b.style.setProperty('--mx', `${e.clientX - r.left}px`);
      b.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  }

  /* ---------- Service filter ---------- */
  $('#svcFilter').addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    $$('.chip').forEach((c) => {
      const on = c === chip;
      c.classList.toggle('is-active', on);
      c.setAttribute('aria-selected', on);
    });
    const f = chip.dataset.f;
    $$('.svc', grid).forEach((card) => {
      const show = f === 'all' || card.dataset.group === f;
      card.classList.toggle('is-hidden', !show);
      if (show && !reduceMotion) card.animate([{ opacity: 0, transform: 'translateY(16px) scale(.98)' }, { opacity: 1, transform: 'none' }], { duration: 450, easing: 'cubic-bezier(.2,.8,.2,1)' });
    });
  });

  /* ---------- Service modal ---------- */
  const modal = $('#svcModal');
  function openModal(id) {
    const s = services.find((x) => x.id === id);
    if (!s) return;
    $('#svcModalMedia').innerHTML = s.imgs.map((im) => `<img src="${IMG + im}.webp" alt="${L(s, 'title')}" loading="lazy">`).join('');
    $('#svcModalCat').textContent = L(s, 'cat');
    $('#svcModalTitle').textContent = L(s, 'title');
    $('#svcModalPrice').textContent = L(s, 'price') + (L(s, 'unit') || '');
    $('#svcModalDesc').textContent = L(s, 'desc') + (s.imgs.length > 1 ? tr(' Geser foto untuk melihat lebih banyak.', ' Swipe the photos to see more.') : '');
    $('#svcModalWa').href = waLink(tr(`Halo Toga Boga, saya ingin tanya/pesan: ${s.title}`, `Hello Toga Boga, I would like to ask about / order: ${s.en.title}`));
    modal.showModal();
    $('#svcModalMedia').scrollLeft = 0;
  }
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-svc]');
    if (btn) openModal(btn.dataset.svc);
  });

  /* ---------- Lightbox ---------- */
  const lb = $('#lightbox');
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-lightbox]');
    if (!t) return;
    $('#lbImg').src = t.dataset.lightbox;
    $('#lbImg').alt = t.dataset.caption || '';
    $('#lbCap').textContent = t.dataset.caption || '';
    lb.showModal();
  });
  [modal, lb].forEach((d) => {
    d.addEventListener('click', (e) => {
      if (e.target === d || e.target.closest('[data-close]')) d.close();
    });
  });

  /* ---------- Frozen scroller ---------- */
  const bar = $('#ffBar');
  const updateBar = () => {
    const max = scroller.scrollWidth - scroller.clientWidth;
    const vis = scroller.clientWidth / scroller.scrollWidth;
    bar.style.width = `${Math.max(vis, max ? (scroller.scrollLeft / max) * (1 - vis) + vis : 1) * 100}%`;
  };
  scroller.addEventListener('scroll', updateBar, { passive: true });
  addEventListener('resize', updateBar);
  updateBar();
  $$('[data-scroll]').forEach((b) => b.addEventListener('click', () => {
    scroller.scrollBy({ left: +b.dataset.scroll * scroller.clientWidth * 0.8, behavior: 'smooth' });
  }));

  $('#year').textContent = new Date().getFullYear();

  /* ---------- Ganti bahasa ---------- */
  document.addEventListener('tb:lang', () => {
    const f = $('.chip.is-active')?.dataset.f || 'all';
    renderAll();
    $$('.svc', grid).forEach((card) => {
      card.classList.add('is-in');
      card.classList.toggle('is-hidden', f !== 'all' && card.dataset.group !== f);
    });
    burger.setAttribute('aria-label', menu.hidden ? tr('Buka menu', 'Open menu') : tr('Tutup menu', 'Close menu'));
    updateBar();
  });

  /* ---------- PWA ---------- */
  if ('serviceWorker' in navigator) {
    addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
  }
  const installBtn = $('#installBtn');
  let deferred;
  addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferred = e;
    installBtn.hidden = false;
  });
  installBtn.addEventListener('click', async () => {
    if (!deferred) return;
    deferred.prompt();
    await deferred.userChoice;
    deferred = null;
    installBtn.hidden = true;
  });
  addEventListener('appinstalled', () => { installBtn.hidden = true; });

  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  let hintSeen = false;
  try { hintSeen = localStorage.getItem('tb-ios-hint') === '1'; } catch {}
  if (isIOS && !standalone && !hintSeen) {
    setTimeout(() => { $('#iosHint').hidden = false; }, 6000);
    $('#iosHintClose').addEventListener('click', () => {
      $('#iosHint').hidden = true;
      try { localStorage.setItem('tb-ios-hint', '1'); } catch {}
    });
  }
})();
