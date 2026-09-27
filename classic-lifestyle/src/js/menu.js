/**
 * MENU.JS — Food Menu Tab Navigation & Item Rendering
 * Classic Lifestyle Carwash & Shisanyama
 */

function initMenuSection() {
  const tabsContainer = document.getElementById('menuTabs');
  const itemsContainer = document.getElementById('menuItems');

  if (!tabsContainer || !itemsContainer) return;

  const siteConfig = window.siteConfig || {};
  const foodMenu = siteConfig.foodMenu;
  if (!foodMenu || !foodMenu.categories || !foodMenu.categories.length) return;

  let activeCategory = foodMenu.categories[0].id;

  // ── Build tabs ──
  foodMenu.categories.forEach((cat, i) => {
    const btn = document.createElement('button');
    btn.className = `menu-tab${i === 0 ? ' active' : ''}`;
    btn.setAttribute('data-category', cat.id);
    btn.setAttribute('aria-label', `Show ${cat.label} menu`);
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    btn.type = 'button';

    btn.innerHTML = `<span class="tab-emoji" aria-hidden="true">${cat.icon}</span> ${cat.label}`;

    btn.addEventListener('click', () => {
      activeCategory = cat.id;
      switchTab(cat.id);
    });

    tabsContainer.appendChild(btn);
  });

  // ── Render initial items ──
  renderMenuItems(activeCategory, itemsContainer, foodMenu.items);

  // ── Touch swipe support for tabs ──
  let touchStartX = 0;
  itemsContainer.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  itemsContainer.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) < 50) return;

    const cats = foodMenu.categories;
    const idx = cats.findIndex(c => c.id === activeCategory);

    if (dx < 0 && idx < cats.length - 1) {
      activeCategory = cats[idx + 1].id;
      switchTab(activeCategory);
    } else if (dx > 0 && idx > 0) {
      activeCategory = cats[idx - 1].id;
      switchTab(activeCategory);
    }
  }, { passive: true });

  function switchTab(categoryId) {
    // Update tab buttons
    tabsContainer.querySelectorAll('.menu-tab').forEach(btn => {
      const isActive = btn.dataset.category === categoryId;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Animate out → render → animate in
    itemsContainer.style.opacity = '0';
    itemsContainer.style.transform = 'translateY(8px)';

    setTimeout(() => {
      renderMenuItems(categoryId, itemsContainer, foodMenu.items);
      itemsContainer.style.transition = 'opacity 250ms ease, transform 250ms ease';
      itemsContainer.style.opacity = '1';
      itemsContainer.style.transform = 'translateY(0)';
    }, 150);
  }
}

// ──────────────────────────────────────────────
//  RENDER MENU ITEMS
// ──────────────────────────────────────────────
function renderMenuItems(categoryId, container, allItems) {
  container.innerHTML = '';
  container.style.transition = 'none';

  const items = allItems.filter(item => item.category === categoryId);

  if (!items.length) {
    container.innerHTML = `
      <p style="color:var(--color-text-muted);font-size:var(--text-sm);padding:var(--space-8);text-align:center;">
        Menu items coming soon. Ask us in store!
      </p>
    `;
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'menu-grid';
  grid.setAttribute('role', 'list');

  items.forEach(item => {
    const el = document.createElement('div');
    el.className = 'menu-item';
    el.setAttribute('role', 'listitem');
    if (!item.available) {
      el.style.opacity = '0.45';
    }

    el.innerHTML = `
      <div class="menu-item__info">
        <h4 class="menu-item__name">${item.name}${!item.available ? ' <span style="font-size:var(--text-xs);color:var(--color-text-faint);">(Unavailable)</span>' : ''}</h4>
        <p class="menu-item__desc">${item.description}</p>
      </div>
      ${item.price
        ? `<span class="menu-item__price">${item.price}</span>`
        : ''
      }
    `;

    grid.appendChild(el);
  });

  container.appendChild(grid);

  // Notice about menu & pricing
  const notice = document.createElement('div');
  notice.className = 'menu-notice';
  notice.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
    <span>Menu selections and pricing can be updated here. Please ask staff for today's braai options.</span>
  `;
  container.appendChild(notice);
}

if (typeof window !== 'undefined') {
  window.initMenuSection = initMenuSection;
}


