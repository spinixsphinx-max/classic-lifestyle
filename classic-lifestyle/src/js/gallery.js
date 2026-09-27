/**
 * GALLERY.JS — Gallery Grid Rendering + Lightbox
 * Classic Lifestyle Carwash & Shisanyama
 */

function initGallery() {
  const galleryGrid = document.getElementById('galleryGrid');
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  if (!galleryGrid) return;

  const siteConfig = window.siteConfig || {};
  const images = siteConfig.gallery;
  if (!images || !images.length) return;

  let currentIndex = 0;

  // ── Build gallery grid ──
  images.forEach((imgData, i) => {
    const item = document.createElement('div');
    item.className = 'gallery-item reveal';
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', `View photo: ${imgData.alt}`);

    const img = document.createElement('img');
    img.src = imgData.src;
    img.alt = imgData.alt;
    img.loading = 'lazy';
    img.decoding = 'async';

    const overlay = document.createElement('div');
    overlay.className = 'gallery-item__overlay';
    overlay.innerHTML = `
      <div class="gallery-item__zoom" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          <path d="M11 8v6"/><path d="M8 11h6"/>
        </svg>
      </div>
    `;

    item.appendChild(img);
    item.appendChild(overlay);

    // Open lightbox
    const open = () => {
      if (!lightbox || !lightboxImg) return;
      currentIndex = i;
      lightboxImg.src = imgData.src;
      lightboxImg.alt = imgData.alt;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      lightboxImg.focus();
    };

    item.addEventListener('click', open);
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open();
      }
    });

    galleryGrid.appendChild(item);
  });

  // ── Lightbox controls ──
  if (!lightbox) return;

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const showImage = (idx) => {
    currentIndex = ((idx % images.length) + images.length) % images.length;
    const imgData = images[currentIndex];

    lightboxImg.style.opacity = '0';
    lightboxImg.style.transform = 'scale(0.96)';

    setTimeout(() => {
      lightboxImg.src = imgData.src;
      lightboxImg.alt = imgData.alt;
      lightboxImg.style.transition = 'opacity 250ms ease, transform 250ms ease';
      lightboxImg.style.opacity = '1';
      lightboxImg.style.transform = 'scale(1)';
    }, 150);
  };

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => showImage(currentIndex - 1));
  if (lightboxNext) lightboxNext.addEventListener('click', () => showImage(currentIndex + 1));

  // Close on backdrop click
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });

  // Touch swipe in lightbox
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) < 50) return;
    if (dx < 0) showImage(currentIndex + 1);
    else showImage(currentIndex - 1);
  }, { passive: true });
}

if (typeof window !== 'undefined') {
  window.initGallery = initGallery;
}

