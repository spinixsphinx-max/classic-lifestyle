/**
 * MAIN.JS — Navigation, Scroll Behaviour, Mobile Menu,
 *            Scroll Reveal Animations, Hours, Hero
 * Classic Lifestyle Carwash & Shisanyama
 */

document.addEventListener('DOMContentLoaded', () => {
  injectSiteData();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initActionBar();
  buildHoursTable();
  buildCarwashServices();
  if (window.initMenuSection) window.initMenuSection();
  if (window.initGallery) window.initGallery();
  initHeroImage();
  buildFooter();
  buildContactSection();
  buildAbout();
  buildLocationCard();
});

function getSiteConfig() {
  return window.siteConfig || {};
}

// ──────────────────────────────────────────────
//  INJECT GLOBAL SITE DATA
// ──────────────────────────────────────────────
function injectSiteData() {
  const config = getSiteConfig();
  const business = config.business || {};
  const contact = config.contact || {};

  // Page title + meta already in HTML, but set dynamically too
  document.title = `${business.name} ${business.subtitle} | Blackhurst, Durban`;

  // Update all [data-phone] elements
  document.querySelectorAll('[data-phone]').forEach(el => {
    if (el.tagName === 'A') {
      el.href = `tel:${contact.phone}`;
    }
    const textEl = el.querySelector('[data-phone-text]') || el;
    if (textEl && textEl !== el) {
      textEl.textContent = contact.phoneDisplay;
    } else if (el.dataset.phone === 'display') {
      el.textContent = contact.phoneDisplay;
    }
  });
}

// ──────────────────────────────────────────────
//  NAVBAR
// ──────────────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY > 60;
        navbar.classList.toggle('scrolled', scrolled);
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on load

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__link[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(s => sectionObserver.observe(s));
}

// ──────────────────────────────────────────────
//  MOBILE MENU
// ──────────────────────────────────────────────
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!toggleBtn || !mobileMenu) return;

  let isOpen = false;

  const openMenu = () => {
    isOpen = true;
    mobileMenu.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    isOpen = false;
    mobileMenu.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    isOpen ? closeMenu() : openMenu();
  });

  // Close on link click
  mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on backdrop click
  mobileMenu.addEventListener('click', e => {
    if (e.target === mobileMenu) closeMenu();
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) closeMenu();
  });
}

// ──────────────────────────────────────────────
//  SCROLL REVEAL
// ──────────────────────────────────────────────
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  // Respect reduced-motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealEls.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

  revealEls.forEach(el => observer.observe(el));
}

// ──────────────────────────────────────────────
//  ACTION BAR
// ──────────────────────────────────────────────
function initActionBar() {
  const { contact, address } = siteConfig;

  const callBtn = document.getElementById('actionCall');
  const directionsBtn = document.getElementById('actionDirections');
  const waBtn = document.getElementById('actionWhatsapp');

  if (callBtn) {
    callBtn.href = `tel:${contact.phone}`;
  }

  if (directionsBtn) {
    directionsBtn.href = address.directionsUrl;
  }

  if (waBtn) {
    if (contact.whatsapp) {
      waBtn.href = `https://wa.me/${contact.whatsapp}`;
      waBtn.style.display = '';
    } else {
      // Fallback — link to phone
      waBtn.href = `tel:${contact.phone}`;
      waBtn.setAttribute('aria-label', 'Call us');
    }
  }
}

// ──────────────────────────────────────────────
//  HOURS TABLE
// ──────────────────────────────────────────────
function buildHoursTable() {
  const tbody = document.getElementById('hoursTableBody');
  if (!tbody) return;

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayIdx = new Date().getDay();
  const todayName = dayNames[todayIdx];

  siteConfig.hours.forEach(row => {
    const tr = document.createElement('tr');
    const isToday = row.day === todayName;
    if (isToday) tr.classList.add('today');

    const dayTd = document.createElement('td');
    dayTd.textContent = row.day;
    if (isToday) {
      dayTd.innerHTML = `${row.day} <span style="font-size:var(--text-xs);font-weight:600;letter-spacing:.06em;color:var(--color-gold);">(Today)</span>`;
    }

    const timeTd = document.createElement('td');
    if (row.isOpen) {
      timeTd.textContent = `${row.open} – ${row.close}`;
    } else {
      timeTd.textContent = 'Closed';
      timeTd.classList.add('hours-closed');
    }

    tr.appendChild(dayTd);
    tr.appendChild(timeTd);
    tbody.appendChild(tr);
  });

  // Status badge
  buildStatusBadge(todayName);
}

function buildStatusBadge(todayName) {
  const badge = document.getElementById('statusBadge');
  if (!badge) return;

  const todayConfig = siteConfig.hours.find(h => h.day === todayName);

  if (!todayConfig || !todayConfig.isOpen) {
    badge.className = 'status-badge status-badge--closed';
    badge.innerHTML = `<span class="status-badge__dot"></span> Closed Today`;
    return;
  }

  // Check if currently within hours
  const now = new Date();
  const [openH, openM] = todayConfig.open.split(':').map(Number);
  const [closeH, closeM] = todayConfig.close.split(':').map(Number);
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const openMins = openH * 60 + openM;
  const closeMins = closeH * 60 + closeM;

  const isCurrentlyOpen = nowMins >= openMins && nowMins < closeMins;

  if (isCurrentlyOpen) {
    badge.className = 'status-badge status-badge--open';
    badge.innerHTML = `<span class="status-badge__dot"></span> Open Now · Closes ${todayConfig.close}`;
  } else if (nowMins < openMins) {
    badge.className = 'status-badge status-badge--closed';
    badge.innerHTML = `<span class="status-badge__dot"></span> Opens at ${todayConfig.open}`;
  } else {
    badge.className = 'status-badge status-badge--closed';
    badge.innerHTML = `<span class="status-badge__dot"></span> Closed · Opens Tomorrow`;
  }
}

// ──────────────────────────────────────────────
//  CARWASH SERVICES
// ──────────────────────────────────────────────
function buildCarwashServices() {
  const grid = document.getElementById('carwashGrid');
  if (!grid) return;

  const icons = {
    droplets: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>`,
    sparkles: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`,
    armchair: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"/><path d="M5 18v2"/><path d="M19 18v2"/></svg>`,
    crown: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 6.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 7.02a.5.5 0 0 1 .798-.519l4.276 2.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></svg>`,
  };

  siteConfig.carwashServices.forEach((service, i) => {
    const card = document.createElement('article');
    card.className = `service-card${service.featured ? ' service-card--featured' : ''} reveal reveal-delay-${i + 1}`;
    card.setAttribute('aria-label', `${service.name} service`);

    const icon = icons[service.icon] || icons.sparkles;

    card.innerHTML = `
      ${service.featured ? '<span class="service-card__badge">Popular</span>' : ''}
      <div class="service-card__icon">${icon}</div>
      <h3 class="service-card__name">${service.name}</h3>
      <p class="service-card__desc">${service.description}</p>
      ${service.price
        ? `<div class="service-card__price">
             <span class="service-card__price-label">From</span>
             ${service.price}
           </div>`
        : `<div class="service-card__price-tag">
             Contact us for pricing
           </div>`
      }
    `;

    grid.appendChild(card);
  });
}

// ──────────────────────────────────────────────
//  HERO IMAGE
// ──────────────────────────────────────────────
function initHeroImage() {
  const heroImg = document.getElementById('heroBgImg');
  if (!heroImg || !siteConfig.heroImages.length) return;

  const images = siteConfig.heroImages;
  let currentIndex = 0;

  // Preload first
  heroImg.src = images[0];
  heroImg.alt = 'Classic Lifestyle Carwash & Shisanyama — Durban';

  if (images.length < 2) return;

  // Crossfade cycle
  setInterval(() => {
    heroImg.style.opacity = '0';
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % images.length;
      heroImg.src = images[currentIndex];
      heroImg.style.opacity = '0.45';
    }, 800);
  }, 6000);
}

// ──────────────────────────────────────────────
//  ABOUT SECTION
// ──────────────────────────────────────────────
function buildAbout() {
  const { business } = siteConfig;
  const descEl = document.getElementById('aboutDescription');
  if (descEl) {
    descEl.textContent = business.description;
  }
}

// ──────────────────────────────────────────────
//  LOCATION CARD
// ──────────────────────────────────────────────
function buildLocationCard() {
  const { address, contact } = siteConfig;

  const addressEl = document.getElementById('locationAddress');
  if (addressEl) {
    addressEl.innerHTML = `
      <span class="location-card__address-line">${address.street}</span>
      <span class="location-card__address-line">${address.suburb}</span>
      <span class="location-card__address-line">${address.city}, ${address.postalCode}</span>
      <span class="location-card__address-line">${address.province}, ${address.country}</span>
    `;
  }

  const mapFrame = document.getElementById('mapFrame');
  if (mapFrame) {
    const iframe = document.createElement('iframe');
    iframe.src = address.mapEmbedUrl;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.allowFullscreen = true;
    iframe.title = 'Classic Lifestyle Carwash location map';
    mapFrame.appendChild(iframe);
  }

  // Directions links
  document.querySelectorAll('[data-directions]').forEach(el => {
    el.href = address.directionsUrl;
    if (el.tagName === 'A') {
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    }
  });
}

// ──────────────────────────────────────────────
//  CONTACT SECTION
// ──────────────────────────────────────────────
function buildContactSection() {
  const { contact } = siteConfig;

  const phoneLink = document.getElementById('ctaPhoneLink');
  if (phoneLink) {
    phoneLink.href = `tel:${contact.phone}`;
    const textEl = phoneLink.querySelector('[data-phone-display]');
    if (textEl) textEl.textContent = `Call ${contact.phoneDisplay}`;
  }

  const waSection = document.getElementById('whatsappSection');
  const waLink = document.getElementById('ctaWhatsapp');
  if (waSection && waLink) {
    if (contact.whatsapp) {
      waLink.href = `https://wa.me/${contact.whatsapp}`;
      waLink.style.display = 'inline-flex';
      waSection.style.display = '';
    } else {
      waSection.style.display = 'none';
    }
  }
}

// ──────────────────────────────────────────────
//  FOOTER
// ──────────────────────────────────────────────
function buildFooter() {
  const { business, contact, address, social } = siteConfig;

  // Footer brand tagline
  const taglineEl = document.getElementById('footerTagline');
  if (taglineEl) taglineEl.textContent = business.tagline;

  // Footer phone
  const footerPhone = document.getElementById('footerPhone');
  if (footerPhone) {
    footerPhone.href = `tel:${contact.phone}`;
    footerPhone.textContent = contact.phoneDisplay;
  }

  // Footer location
  const footerCity = document.getElementById('footerCity');
  if (footerCity) {
    footerCity.textContent = `${address.city}, ${address.province}`;
  }

  // Social links
  const socialContainer = document.getElementById('footerSocial');
  if (socialContainer) {
    const socials = [
      { key: 'facebook',  label: 'Facebook',  svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>' },
      { key: 'instagram', label: 'Instagram', svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>' },
      { key: 'tiktok',   label: 'TikTok',    svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>' },
      { key: 'twitter',  label: 'Twitter/X',  svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l16 16M4 20L20 4"/></svg>' },
    ];

    const links = socials.filter(s => social[s.key]);
    if (links.length) {
      socialContainer.style.display = 'flex';
      links.forEach(s => {
        const a = document.createElement('a');
        a.href = social[s.key];
        a.className = 'social-link';
        a.setAttribute('aria-label', s.label);
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.innerHTML = s.svg;
        socialContainer.appendChild(a);
      });
    } else {
      socialContainer.style.display = 'none';
    }
  }

  // Copyright year
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
