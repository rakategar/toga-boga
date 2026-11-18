/* Toga Boga — dua bahasa (ID default, EN). Teks Indonesia ada di HTML; kamus di bawah hanya untuk EN. */
(() => {
  const STORE = 'tb-lang';
  const MQ = '<span>Diet Catering</span><i>✦</i><span>Rice & Pudding Tumpeng</span><i>✦</i><span>Frozen Food</span><i>✦</i><span>Cookies & Hampers</span><i>✦</i><span>Supplementary Meals for Moms & Toddlers</span><i>✦</i><span>Kids Cooking Class</span><i>✦</i><span>Food Processing Training</span><i>✦</i><span>Diet Menu Consultation</span><i>✦</i>';
  const EN = {
    skip: 'Skip to content',
    'brand.top': 'Toga Boga — back to top',
    'nav.label': 'Main navigation',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.cookies': 'Cookies',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Contact',
    'nav.cta': 'Order via WA',
    install: 'Install App',
    'install.aria': 'Install the Toga Boga app',
    'mm.about': 'About Us',
    'mm.services': 'Services & Products',
    'mm.cookies': 'Cookies 2026',
    'mm.gallery': 'Activity Gallery',
    'mm.how': 'How to Order',
    'mm.contact': 'Contact & Location',
    'mm.cta': 'Order via WhatsApp',
    'wa.ask': 'Hello Toga Boga, I would like to ask about / place an order.',
    'wa.consult': 'Hello Toga Boga, I would like a menu consultation.',
    'wa.cookies': 'Hello Toga Boga, I would like to order cookies.',
    'wa.hampers': 'Hello Toga Boga, I would like to order a cookie hamper (woven basket).',
    'wa.cc': 'Hello Toga Boga, I would like info on the kids cooking class schedule.',
    'wa.order': 'Hello Toga Boga, I would like to place an order.',
    'wa.q': 'Hello Toga Boga, I have a question.',
    'hero.eyebrow': '<span class="dot"></span> Run by a Nutritionist · Probolinggo since 2015',
    'hero.lead': 'Healthy catering with measured nutrition and local ingredients — some picked straight from our own garden, then turned into delicious dishes for every occasion.',
    'hero.cta1': 'Free Consultation',
    'hero.cta2': 'See the Menu',
    'hero.trust': '<li><b>10+</b> years of service</li><li><b>S.Gz., M.P.</b> nutritionist</li><li><b>Our own</b> garden</li>',
    'hero.trustLabel': 'Highlights',
    marquee: MQ + MQ,
    'about.photoAlt': 'Dhaniar Mudita, S.Gz., M.P., founder of Toga Boga Catering',
    'about.tag': 'Founder & Nutritionist',
    'about.since': 'since',
    'about.kicker': 'About Us',
    'about.h2': 'From our own garden, <em>crafted</em> by a nutritionist.',
    'about.p1': 'Toga Boga Catering has served Probolinggo City since 2015 and is run by nutritionist <strong>Dhaniar Mudita, S.Gz., M.P.</strong> We offer a wide range of services — from diet and non-diet catering, institutional meals and frozen food to cooking classes and food & beverage processing training.',
    'about.p2': 'Putting nutritional quality and local food first, Toga Boga offers a special experience: picking ingredients straight from our own garden and turning them into dishes.',
    'about.quote': 'With an educational background in nutrition, she built a food service business that puts nutritional quality, product variety and local food first — with a fresh concept: <em>gardening</em>.',
    'about.quoteBy': 'Short profile of Dhaniar Mudita, S.Gz., M.P. — founder & owner',
    'about.s1': 'Years serving Probolinggo',
    'about.s2': 'Frozen food varieties',
    'about.s3': 'Types of services',
    'val.kicker': 'Why Toga Boga?',
    'val.h2': 'Healthy <em>can</em> be delicious.',
    'val.sub': 'Three things we care about in every dish.',
    'val.t1': 'Measured Nutrition',
    'val.p1': 'Every menu is designed by a nutritionist — from DASH diet catering to inpatient meals and supplementary meals for pregnant women & toddlers.',
    'val.t2': 'Local Food, from the Garden',
    'val.p2': 'We prioritise local ingredients, some picked straight from the Toga Boga garden and cooked fresh.',
    'val.t3': 'A Variety of Products',
    'val.p3': 'Daily catering, tumpeng for events, convenient frozen food, cookies & hampers, all the way to cooking classes and business training.',
    'svc.kicker': 'Services & Products',
    'svc.h2': 'Pick what you <em>need</em>.',
    'svc.sub': 'Tap a card to see details & photos. All orders and consultations go straight to our WhatsApp.',
    'svc.all': 'All',
    'svc.catering': 'Catering',
    'svc.products': 'Products',
    'svc.edu': 'Classes & Education',
    'ff.h2': 'Healthy stock for your freezer, <em>all Rp30,000</em>.',
    'ff.sub': 'Just fry, steam or bake. Dumplings and galantine are also available — ask about the latest stock on WhatsApp.',
    'ff.list': 'Frozen food list, swipe sideways',
    'ff.left': 'Scroll left',
    'ff.right': 'Scroll right',
    'ck.catalog': 'See the full catalogue ↗',
    'ck.catalogCap': 'Toga Boga cookie catalogue',
    'ck.kicker': 'Togaboga Cookies Pricelist 2026',
    'ck.h2': '<em>Homemade</em> cookies, crunchy to the last bite.',
    'ck.p': 'Packed in a <strong>500 ml poppy jar</strong>. Giving it as a gift? Add a <strong>pretty woven-basket hamper (+Rp25,000)</strong>.',
    'ck.cta1': 'Order Cookies',
    'ck.cta2': 'Order a Hamper',
    'gal.kicker': 'Activity Gallery',
    'gal.h2': 'Learning, cooking and <em>growing</em> together.',
    'gal.t1': 'Cooking class with kids',
    'gal.p1': 'Picking local ingredients straight from our own garden, then turning them into tasty dishes. Learning to cook becomes more fun, closer to nature, and enjoyable!',
    'gal.cta': 'Sign up your little one',
    'gal.c2': 'Picking ingredients from the garden',
    'gal.c3': 'Kids working the dough',
    'gal.c4': 'Cooking class results',
    'gal.t2': 'BLK Vocational Training: Food & Beverage Processing',
    'gal.p2': 'A training programme run by Toga Boga in partnership with the Probolinggo City Manpower Office (Disnaker). Participants not only learn food and beverage processing skills, but also how to calculate the Cost of Goods Produced (HPP) and run a small business.',
    'gal.badge': 'In partnership with Disnaker Kota Probolinggo',
    'gal.t3': 'BLK for People with Disabilities',
    'gal.c6': 'Mentoring BLK participants',
    'gal.c7': 'Hands-on food processing',
    'gal.c8': 'Participants’ creations',
    'how.kicker': 'How to Order',
    'how.h2': 'Five steps, <em>straight</em> through WhatsApp.',
    'how.t1': 'Choose a product', 'how.p1': 'Pick the product or service you want.',
    'how.t2': 'Tap WhatsApp', 'how.p2': 'Press the “Order” or “WhatsApp” button on the product card.',
    'how.t3': 'Get connected', 'how.p3': 'You are connected straight to Toga Boga’s WhatsApp.',
    'how.t4': 'Ask for details', 'how.p4': 'Ask about the menu, price, availability and schedule.',
    'how.t5': 'Order processed', 'how.p5': 'Your order is continued and confirmed via WhatsApp.',
    'faq.kicker': 'FAQ',
    'faq.h2': '<em>Frequently</em> asked questions.',
    'faq.ask': 'Ask the Nutrition Assistant',
    'faq.q1': 'Is the diet menu consultation paid?',
    'faq.a1': 'No. Diet menu consultation at Toga Boga is <strong>free (Rp0)</strong>. Chat with us on WhatsApp, or try asking the Nutrition Assistant in the bottom-right corner first.',
    'faq.q2': 'How much is diet catering?',
    'faq.a2': 'DASH diet catering is <strong>Rp18,000</strong>/portion. Full meals for community health centres (high-energy high-protein and high-fibre) are <strong>Rp15,000</strong>/portion.',
    'faq.q3': 'Can I order a tumpeng for an event?',
    'faq.a3': 'Yes. Rice tumpeng and pudding tumpeng are available from <strong>Rp125,000 to Rp600,000</strong>, depending on size and fillings.',
    'faq.q4': 'How much is the frozen food?',
    'faq.a4': 'All frozen food varieties are <strong>Rp30,000</strong> — from siomay, snapper otak-otak, curry puffs and risoles to sosis solo.',
    'faq.q5': 'What are the PMT packages for moms & toddlers?',
    'faq.a5': 'Supplementary feeding (PMT) packages for pregnant women and toddlers, designed around their nutritional needs. <strong>Rp21,500</strong>/package.',
    'faq.q6': 'How much is the kids cooking class?',
    'faq.a6': 'The kids cooking class is <strong>Rp35,000 to Rp40,000</strong> per child. Kids pick ingredients from the garden and cook them themselves.',
    'cta.h2': 'Ready to eat healthy <em>today?</em>',
    'cta.p': 'Tell us what you need — an event, a diet, or frozen food stock. We will help you choose.',
    'ct.kicker': 'Contact & Location',
    'ct.h2': 'Drop by our <em>kitchen</em>.',
    'ct.addr': 'Address',
    'ct.maps': 'Open in Google Maps ↗',
    'ft.about': 'Catering · Healthy and Tasty. Run by a nutritionist in Probolinggo City since 2015.',
    'ft.explore': 'Explore',
    'ft.reach': 'Reach us',
    'ft.rights': 'All rights reserved.',
    'chat.open': 'Open the Toga Boga Nutrition Assistant',
    'chat.bubble': 'Nutrition question? 👋',
    'chat.name': 'Toga Boga Nutrition Assistant',
    'chat.status': '<i class="online"></i> Online · answered automatically by AI',
    'chat.close': 'Close chat',
    'chat.chips': '<button>Diet menu for high blood pressure?</button><button>Recommend food for a birthday party</button><button>What frozen food do you have?</button><button>Which cookies are in stock?</button>',
    'chat.ph': 'Type your question…',
    'chat.msg': 'Message',
    'chat.send': 'Send',
    'chat.foot': 'Nutrition info is general, not a substitute for medical diagnosis. Orders via <a data-wa="Hello Toga Boga, I would like to place an order." href="#">WhatsApp</a>.',
    ios: 'Install <b>Toga Boga</b> on your phone: tap <b>Share</b> <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M8 7l4-4 4 4M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></svg> then <b>Add to Home Screen</b>.',
  };
  const META = {
    id: { title: document.title, desc: document.querySelector('meta[name="description"]').content },
    en: {
      title: 'Toga Boga Catering — Healthy and Tasty | Healthy Catering in Probolinggo',
      desc: 'Toga Boga Catering, Probolinggo City since 2015. Run by nutritionist Dhaniar Mudita, S.Gz., M.P. Diet & non-diet catering, tumpeng, frozen food, cookies, supplementary meals, cooking classes and food processing training.',
    },
  };

  const original = new Map();
  const attrPairs = (el) => el.dataset.i18nAttr.split(';').map((p) => p.split(':'));

  let lang = 'id';
  try {
    const q = new URLSearchParams(location.search).get('lang');
    lang = q === 'en' || q === 'id' ? q : localStorage.getItem(STORE) === 'en' ? 'en' : 'id';
  } catch {}

  const apply = () => {
    const en = lang === 'en';
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n], [data-i18n-attr]').forEach((el) => {
      if (!original.has(el)) {
        const o = { html: el.dataset.i18n ? el.innerHTML : null, attrs: {} };
        if (el.dataset.i18nAttr) attrPairs(el).forEach(([a]) => { o.attrs[a] = el.getAttribute(a); });
        original.set(el, o);
      }
      const o = original.get(el);
      if (el.dataset.i18n) el.innerHTML = en ? EN[el.dataset.i18n] ?? o.html : o.html;
      if (el.dataset.i18nAttr) attrPairs(el).forEach(([a, k]) => el.setAttribute(a, en ? EN[k] ?? o.attrs[a] : o.attrs[a]));
    });
    document.title = META[lang].title;
    document.querySelector('meta[name="description"]').content = META[lang].desc;
    const btn = document.getElementById('langToggle');
    if (btn) btn.dataset.lang = lang;
  };

  window.TB_I18N = {
    get lang() { return lang; },
    /** Pilih teks sesuai bahasa aktif: tr('Teks ID', 'EN text'). */
    tr: (id, en) => (lang === 'en' ? en : id),
    set(next) {
      if (next === lang) return;
      lang = next;
      try { localStorage.setItem(STORE, lang); } catch {}
      apply();
      document.dispatchEvent(new CustomEvent('tb:lang', { detail: lang }));
    },
  };

  apply();
  document.getElementById('langToggle').addEventListener('click', () => {
    window.TB_I18N.set(lang === 'en' ? 'id' : 'en');
  });
})();
