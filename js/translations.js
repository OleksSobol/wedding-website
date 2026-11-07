/**
 * Translations and Language Switcher for Catherine & Oleksandr's Wedding Website
 */
(function () {
  'use strict';

  const translations = {
    en: {
      meta: {
        title: 'Catherine & Oleksandr · June 20, 2026',
        description: 'Join us as we celebrate our wedding on June 20, 2026 in Bozeman, Montana. Catherine & Oleksandr invite you to share in our special day.'
      },
      modal: {
        title: 'Welcome to Our Wedding',
        desc: 'This site is for our invited guests only. Please enter the password:',
        placeholder: 'Enter password',
        btn: 'Enter'
      },
      nav: {
        home: 'Home',
        story: 'Our Story',
        registry: 'Registry',
        share_photos: 'Share Photos',
        gallery: 'Gallery'
      },
      hero: {
        welcome: "We're Married!",
        names: 'Catherine & Oleksandr',
        date: 'June 20, 2026',
        share_photos_btn: 'Share Photos 📸',
        thankyou: 'Thank you all from Catherine and Oleksandr Sobol'
      },
      story: {
        title: 'Our Story',
        item1_date: '2022',
        item1_title: 'How We Met',
        item1_text: "We first met in 2022. Our first meeting wasn't great. Cathy had just come back from the Poland-Ukraine border, where she'd been helping people from eastern Ukraine who were forced to leave their homes because of the war. She said something in Russian to Oleks, and he was already overwhelmed by everything going on and didn't know how to react. Not exactly the best start for either of us.",
        item1_caption: 'Big Sky',
        item2_date: '2023',
        item2_title: 'A New Beginning',
        item2_text: 'Fast forward to September 2023. We took a trip to Seattle with friends — or, as a few in the group liked to say, “You crashed our girls’ trip.” That’s when things started to shift. After that trip, we began spending a lot more time together. Our relationship had a slow start, but it didn’t take long for us to grow close.',
        item2_caption: 'Seattle adventure that changed everything',
        item3_date: '2024',
        item3_title: 'Adventures Together',
        item3_text: 'By 2024, we had found our rhythm and fully embraced the things we love most: skiing, hiking, random adventures, and getting outside whenever we could. Nature became more than just a playground; it became the backdrop to many of our favorite memories.',
        item3_caption: 'Finding our rhythm in the mountains',
        item4_date: '2025',
        item4_title: 'The Proposal',
        item4_text: 'During our backpacking trip on the Continental Divide Trail, Oleksandr proposed at 12,500 feet on a mountain pass at the start of Colorado, symbolizing a new beginning as we entered a new state. He had prepared an entire speech but got nervous and forgot it, so all he managed to say was, “You know I love you very much… will you marry me?” Catherine responded with, “OMG, yes I will!”',
        item4_caption: '12,500 feet - She said yes!',
        item5_date: '2026',
        item5_title: 'Our Wedding Day',
        item5_text: 'On June 20, 2026, surrounded by our family, friends, and the towering Montana mountains, we officially said "I do." Celebrating among the peaks that shaped our journey made beginning this new chapter together unforgettable. Thank you to everyone who made our special day so magical!',
        item5_caption: 'June 20, 2026 — Officially Mr. & Mrs. Sobol'
      },
      registry: {
        title: 'Gift Registry',
        subtitle: "Your presence is what we're most excited about! But if you'd like to help us celebrate with a gift, here are a few ways to support our adventures and causes we care about.",
        gear_title: 'Adventure Gear Registry',
        gear_desc: "Help fuel our mountain adventures! We're building our collection of camping and hiking gear for all the trails and peaks we plan to explore together.",
        gear_btn: 'View REI Registry',
        home_title: 'Crate & Barrel Registry',
        home_desc: "Help us build our home together! From kitchen essentials to cozy living room pieces, we're curating the things that will make our space feel like ours.",
        home_btn: 'View C&B Registry',
        honeymoon_title: 'Honeymoon Fund',
        honeymoon_desc: "After the mountains of Montana, we're dreaming of exploring somewhere completely new — ocean escapes, international adventures, or a whole new country!",
        honeymoon_btn: 'Contribute',
        ukraine_title: 'Support Ukraine',
        ukraine_desc: "Oleksandr's Ukrainian roots are a huge part of our story! We'd be honored if you'd help support humanitarian efforts making a real difference for families in Ukraine.",
        ukraine_btn: 'Donate to United24',
        note1_title: '💝 The Real Gift? You Being There!',
        note1_text: "Seriously — having you celebrate with us in Montana is the best gift we could ask for! These registries are totally optional. If you'd like to contribute to our adventures or support Ukraine, we're grateful. If not, showing up and dancing with us is more than enough!",
        note2_title: '❓ Questions or Special Requests?',
        note2_text: 'Want to contribute a specific piece of gear? Have questions about the funds? Just want to chat? Reach us at <a href="mailto:wedding@solstice2026.party">wedding@solstice2026.party</a> — we\'d love to hear from you!'
      },
      gallery: {
        title: 'Our Adventures Together',
        roadtrip_overlay: 'From latest road trip to MT!',
        new_adventure_title: 'New Adventure',
        new_adventure_desc: 'Exploring together!',
        drone_title: 'Drone View',
        drone_desc: "Bird's eye view of our adventure!"
      },
      upload: {
        title: 'Share Your Photos',
        subtitle: 'Thank you for celebrating with us! Help us relive the day — share the photos and videos you captured.',
        btn: 'Share your photos & videos'
      },
      footer: {
        text: '© 2026 Catherine & Oleksandr Wedding. Made with ❤️'
      }
    },
    uk: {
      meta: {
        title: 'Катерина та Олександр · 20 червня 2026',
        description: 'Приєднуйтесь до святкування нашого весілля 20 червня 2026 року в Бозмені, Монтана. Катерина та Олександр запрошують вас розділити цей особливий день.'
      },
      modal: {
        title: 'Ласкаво просимо на наше весілля',
        desc: 'Цей сайт призначений лише для запрошених гостей. Будь ласка, введіть пароль:',
        placeholder: 'Введіть пароль',
        btn: 'Увійти'
      },
      nav: {
        home: 'Головна',
        story: 'Наша історія',
        registry: 'Список подарунків',
        share_photos: 'Поділитися фото',
        gallery: 'Галерея'
      },
      hero: {
        welcome: 'Ми одружилися!',
        names: 'Катерина та Олександр',
        date: '20 червня 2026',
        share_photos_btn: 'Поділитися фото 📸',
        thankyou: 'Щиро дякуємо всім від Катерина та Олександра Соболь'
      },
      story: {
        title: 'Наша історія',
        item1_date: '2022',
        item1_title: 'Як ми познайомилися',
        item1_text: 'Ми вперше зустрілися у 2022 році. Наша перша зустріч минула не найкраще. Кеті щойно повернулася з польсько-українського кордону, де допомагала людям зі сходу України, змушеним залишити свої домівки через війну. Вона сказала щось російською Олексу, а він був настільки перевантажений усім, що відбувалося, що навіть не знав, як реагувати. Не найкращий початок для нас обох.',
        item1_caption: 'Біг Скай',
        item2_date: '2023',
        item2_title: 'Новий початок',
        item2_text: 'Перенесемося у вересень 2023 року. Ми поїхали з друзями до Сіетла — або, як жартували дехто з компанії: «Ти зірвав нашу дівочу подорож». Саме тоді все почало змінюватися. Після цієї поїздки ми стали проводити набагато більше часу разом. Наші стосунки починалися повільно, але ми дуже швидко зблизилися.',
        item2_caption: 'Пригода в Сіетлі, яка змінила все',
        item3_date: '2024',
        item3_title: 'Спільні пригоди',
        item3_text: 'До 2024 року ми знайшли свій спільний ритм і насолоджувалися тим, що любимо найбільше: лижі, походи в гори, спонтанні подорожі та відпочинок на природі за будь-якої нагоди. Природа стала не просто захопленням, а тлом для багатьох наших найдорожчих спогадів.',
        item3_caption: 'Наш ритм у горах',
        item4_date: '2025',
        item4_title: 'Освідчення',
        item4_text: 'Під час нашого походу маршрутом Continental Divide Trail Олександр освідчився на гірському перевалі на висоті 3800 метрів (12 500 футів) на в\'їзді в Колорадо — що стало символом нового початку на порозі нового штату. Він підготував цілу промову, але розхвилювався і все забув, тож спромігся лише сказати: «Ти знаєш, як сильно я тебе кохаю... вийдеш за мене?» Катерина відповіла: «Боже мій, так, звісно!»',
        item4_caption: '3800 метрів — Вона сказала «Так»!',
        item5_date: '2026',
        item5_title: 'День нашого весілля',
        item5_text: '20 червня 2026 року в оточенні рідних, друзів та величних гір Монтани ми офіційно сказали одне одному «Так». Святкування серед вершин, які сформували нашу спільну історію, зробило початок цього нового розділу незабутнім. Дякуємо всім, хто зробив цей особливий день справді магічним!',
        item5_caption: '20 червня 2026 — Офіційно містер і місіс Соболь'
      },
      registry: {
        title: 'Список подарунків',
        subtitle: 'Ваша присутність — це найважливіше для нас! Але якщо ви бажаєте привітати нас подарунком, ось кілька способів підтримати наші майбутні пригоди та важливі для нас справи.',
        gear_title: 'Спорядження для пригод',
        gear_desc: 'Допоможіть нам у гірських пригодах! Ми збираємо спорядження для кемпінгу та походів стежками й вершинами, які плануємо підкорити разом.',
        gear_btn: 'Список в REI',
        home_title: 'Подарунки для затишку (Crate & Barrel)',
        home_desc: 'Допоможіть нам облаштувати наш дім! Від кухонного приладдя до затишних речей для вітальні, ми підбираємо те, що зробить наш дім справжнім родинним гніздечком.',
        home_btn: 'Список в C&B',
        honeymoon_title: 'Весільна подорож',
        honeymoon_desc: 'Після гір Монтани ми мріємо дослідити щось зовсім нове — океанське узбережжя, далекі подорожі або нову незвідану країну!',
        honeymoon_btn: 'Зробити внесок',
        ukraine_title: 'Підтримка України',
        ukraine_desc: 'Українське коріння Олександра — це важлива частина нашої історії! Для нас буде великою честю, якщо ви підтримаєте гуманітарні ініціативи, які реально допомагають родинам в Україні.',
        ukraine_btn: 'Підтримати United24',
        note1_title: '💝 Найкращий подарунок — ваша присутність!',
        note1_text: 'Чесно кажучи, ваше свято з нами в Монтані — це найкращий подарунок! Ці списки абсолютно необов\'язкові. Якщо ви хочете підтримати наші пригоди чи допомогу Україні, ми безмежно вдячні. А якщо ні — просто приїжджайте та запалюйте на танцполі разом з нами!',
        note2_title: '❓ Запитання чи побажання?',
        note2_text: 'Хочете подарувати щось конкретне зі спорядження? Маєте запитання щодо фондів чи просто хочете поспілкуватися? Напишіть нам на <a href="mailto:wedding@solstice2026.party">wedding@solstice2026.party</a> — будемо раді відповісти!'
      },
      gallery: {
        title: 'Наші спільні пригоди',
        roadtrip_overlay: 'З нещодавньої подорожі до Монтани!',
        new_adventure_title: 'Нова пригода',
        new_adventure_desc: 'Досліджуємо світ разом!',
        drone_title: 'Вид з дрона',
        drone_desc: 'Погляд з висоти пташиного польоту!'
      },
      upload: {
        title: 'Поділіться своїми фото',
        subtitle: 'Дякуємо, що розділили з нами це свято! Допоможіть нам знову пережити цей день — поділіться зробленими вами фото та відео.',
        btn: 'Поділіться своїми фото та відео'
      },
      footer: {
        text: '© 2026 Весілля Катерина та Олександра. Зроблено з ❤️'
      }
    }
  };

  function getNestedValue(obj, keyPath) {
    return keyPath.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : null), obj);
  }

  function applyLanguage(lang) {
    const dict = translations[lang] || translations.en;
    if (typeof document === 'undefined') return;

    if (document.documentElement) {
      document.documentElement.lang = lang === 'uk' ? 'uk' : 'en';
    }

    // Update text content
    if (typeof document.querySelectorAll === 'function') {
      document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        const val = getNestedValue(dict, key);
        if (val !== null) {
          el.textContent = val;
        }
      });

      // Update HTML content
      document.querySelectorAll('[data-i18n-html]').forEach((el) => {
        const key = el.getAttribute('data-i18n-html');
        const val = getNestedValue(dict, key);
        if (val !== null) {
          el.innerHTML = val;
        }
      });

      // Update placeholders
      document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
        const key = el.getAttribute('data-i18n-placeholder');
        const val = getNestedValue(dict, key);
        if (val !== null) {
          el.setAttribute('placeholder', val);
        }
      });
    }

    // Update title & description
    if (dict.meta) {
      if (dict.meta.title && typeof document !== 'undefined') document.title = dict.meta.title;
      const metaDesc = typeof document.querySelector === 'function' ? document.querySelector('meta[name="description"]') : null;
      if (metaDesc && dict.meta.description) {
        metaDesc.setAttribute('content', dict.meta.description);
      }
    }

    // Update language switcher buttons
    if (typeof document.querySelectorAll === 'function') {
      document.querySelectorAll('.lang-btn').forEach((btn) => {
        const btnLang = btn.getAttribute('data-lang');
        const normalizedBtn = (btnLang === 'ua' || btnLang === 'uk') ? 'uk' : 'en';
        if (normalizedBtn === lang) {
          btn.classList.add('active');
          btn.setAttribute('aria-pressed', 'true');
        } else {
          btn.classList.remove('active');
          btn.setAttribute('aria-pressed', 'false');
        }
      });
    }

    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('wedding_lang', lang);
      }
    } catch (e) {
      // localStorage may be disabled
    }

    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
    }
  }

  function getInitialLanguage() {
    // 1. URL parameter (?lang=ua or ?lang=uk or ?lang=en)
    if (typeof window !== 'undefined' && window.location && window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang) {
        const normalized = urlLang.toLowerCase();
        if (normalized === 'ua' || normalized === 'uk') return 'uk';
        if (normalized === 'en') return 'en';
      }
    }

    // 2. localStorage
    try {
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('wedding_lang');
        if (saved === 'uk' || saved === 'ua') return 'uk';
        if (saved === 'en') return 'en';
      }
    } catch (e) {}

    // 3. Browser language
    if (typeof navigator !== 'undefined') {
      const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
      if (browserLang.startsWith('uk')) {
        return 'uk';
      }
    }

    return 'en';
  }

  function init() {
    const currentLang = getInitialLanguage();

    // Event delegation for language switcher buttons
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.lang-btn');
      if (!btn) return;
      const targetLang = btn.getAttribute('data-lang');
      const normalized = (targetLang === 'ua' || targetLang === 'uk') ? 'uk' : 'en';
      applyLanguage(normalized);
    });

    // Apply language on DOMContentLoaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => applyLanguage(currentLang));
    } else {
      applyLanguage(currentLang);
    }
  }

  window.setLanguage = applyLanguage;
  window.weddingTranslations = translations;

  init();
})();
