const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Nav: hairline on scroll + mobile menu ----------
const nav = document.getElementById('nav');
const toggle = document.getElementById('nav-toggle');
if (nav) {
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('no-scroll', open);
  });
}

// ---------- Fade sections in as they enter the viewport ----------
const revealEls = document.querySelectorAll<HTMLElement>('.reveal');
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach((el) => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target as HTMLElement;
      el.classList.add('is-visible');
      io.unobserve(el);
      // Drop the stagger once revealed so hover effects respond instantly
      setTimeout(() => { el.style.transitionDelay = ''; }, 1400);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

  // Stagger siblings slightly, e.g. the cards in a grid
  revealEls.forEach((el) => {
    const siblings = [...(el.parentElement?.children ?? [])].filter((c) => c.classList.contains('reveal'));
    el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 4) * 80}ms`;
    io.observe(el);
  });
}

// ---------- Segmented-control filters ----------
// <div data-filter-group="x"> <button data-filter="all|kind"> ... and items with data-kind in [data-filter-items="x"]
document.querySelectorAll<HTMLElement>('[data-filter-group]').forEach((group) => {
  const name = group.dataset.filterGroup;
  const items = document.querySelectorAll<HTMLElement>(`[data-filter-items="${name}"] [data-kind]`);
  group.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      group.querySelectorAll('[data-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      const kind = btn.dataset.filter;
      items.forEach((item) => {
        item.hidden = kind !== 'all' && item.dataset.kind !== kind;
      });
    });
  });
});

// ---------- Copy-to-clipboard buttons ----------
document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const source = btn.dataset.copy ? document.getElementById(btn.dataset.copy) : null;
    const text = source?.textContent?.trim() ?? '';
    try {
      await navigator.clipboard.writeText(text);
      const label = btn.textContent;
      btn.textContent = 'Copied';
      btn.classList.add('is-done');
      setTimeout(() => { btn.textContent = label; btn.classList.remove('is-done'); }, 1600);
    } catch {
      btn.textContent = 'Press Ctrl+C';
    }
  });
});

// ---------- Lightbox (AIGC gallery) ----------
const lightbox = document.getElementById('lightbox') as HTMLDialogElement | null;
if (lightbox) {
  const media = lightbox.querySelector<HTMLElement>('.lightbox__media')!;
  const titleEl = lightbox.querySelector<HTMLElement>('.lightbox__title')!;
  const metaEl = lightbox.querySelector<HTMLElement>('.lightbox__meta')!;
  const promptEl = lightbox.querySelector<HTMLElement>('#lightbox-prompt')!;

  document.querySelectorAll<HTMLElement>('[data-lightbox]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const d = trigger.dataset;
      media.innerHTML = '';
      if (d.embed) {
        const iframe = document.createElement('iframe');
        iframe.src = d.embed;
        iframe.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
        iframe.allowFullscreen = true;
        media.append(iframe);
      } else if (d.video) {
        const video = document.createElement('video');
        video.src = d.video;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        media.append(video);
      } else if (d.image) {
        const img = document.createElement('img');
        img.src = d.image;
        img.alt = d.title ?? '';
        media.append(img);
      } else {
        const ph = document.createElement('div');
        ph.className = `lightbox__placeholder ${d.placeholder ?? ''}`;
        media.append(ph);
      }
      titleEl.textContent = d.title ?? '';
      metaEl.textContent = d.meta ?? '';
      promptEl.textContent = d.prompt ?? '';
      promptEl.closest('.lightbox__prompt')?.toggleAttribute('hidden', !d.prompt);
      lightbox.showModal();
    });
  });

  const close = () => lightbox.close();
  lightbox.querySelector('.lightbox__close')?.addEventListener('click', close);
  // Click on the backdrop closes the dialog
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  // Stop videos when closing
  lightbox.addEventListener('close', () => { media.innerHTML = ''; });
}

// ---------- macOS Dock magnification (desktop pointers only) ----------
const dock = document.getElementById('dock');
const canMagnify = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 768px)');
if (dock && !reduceMotion) {
  const apps = [...dock.querySelectorAll<HTMLElement>('.app')];
  const MAX_SCALE = 1.6;
  const RANGE = 150; // px from cursor where icons start to grow
  let frame = 0;

  dock.addEventListener('mousemove', (e) => {
    if (!canMagnify.matches) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      apps.forEach((app) => {
        const rect = app.getBoundingClientRect();
        const distance = Math.abs(e.clientX - (rect.left + rect.width / 2));
        const t = Math.min(distance / RANGE, 1);
        const scale = 1 + (MAX_SCALE - 1) * (Math.cos(t * Math.PI) + 1) / 2;
        app.style.setProperty('--s', scale.toFixed(3));
      });
    });
  });

  dock.addEventListener('mouseleave', () => {
    cancelAnimationFrame(frame);
    apps.forEach((app) => app.style.setProperty('--s', '1'));
  });
}
