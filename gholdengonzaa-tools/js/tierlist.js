/**
 * GholdenGonzaa Tools — Tier List Logic
 * Drag & Drop, Filters, Search, URL sharing
 */

(function() {
  'use strict';

  const rosterPool = document.getElementById('rosterPool');
  const searchInput = document.getElementById('searchInput');
  const pokeCount = document.getElementById('pokeCount');
  const btnReset = document.getElementById('btnReset');
  const btnShare = document.getElementById('btnShare');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const tierZones = document.querySelectorAll('.tier-pokemon');

  let draggedEl = null;
  let activeFilter = 'all';

  // --- Create a Pokémon card element ---
  function createPokeCard(poke) {
    const card = document.createElement('div');
    const isMega = poke.isMegaVariant || false;
    card.className = 'poke-card' + (isMega ? ' mega' : '');
    card.draggable = true;
    card.dataset.name = poke.name;
    card.dataset.types = poke.types.join(',');
    card.dataset.id = poke.id;

    const img = document.createElement('img');
    const sid = poke.spriteId || poke.id;
    img.src = spriteUrl(sid);
    img.alt = poke.displayName || poke.name;
    img.loading = 'lazy';
    img.onerror = function() { this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><rect width="48" height="48" rx="8" fill="%23333"/><text x="24" y="28" text-anchor="middle" fill="%23999" font-size="10">?</text></svg>'; };

    const tooltip = document.createElement('div');
    tooltip.className = 'poke-tooltip';
    const displayName = poke.displayName || poke.name;
    tooltip.innerHTML = `<span class="name">${displayName}</span><br>${poke.types.map(t => `<span class="type-badge type-${t}">${t}</span>`).join(' ')}${isMega ? '<br><span style="color:#8B5CF6;font-size:0.7rem;">MEGA</span>' : ''}`;

    card.appendChild(img);
    card.appendChild(tooltip);

    // Drag events
    card.addEventListener('dragstart', onDragStart);
    card.addEventListener('dragend', onDragEnd);
    // Touch support
    card.addEventListener('touchstart', onTouchStart, { passive: false });
    card.addEventListener('touchmove', onTouchMove, { passive: false });
    card.addEventListener('touchend', onTouchEnd);

    // Click to add to first tier (Tier S) if in pool
    card.addEventListener('click', (e) => {
      // Don't trigger if it was a dblclick (handled below) or if we are dragging
      if (card.parentElement === rosterPool) {
        const tierS = document.getElementById('tier-s');
        if (tierS) {
          tierS.appendChild(card);
          updateCount();
          saveTiers();
          // Scroll up to see it in the tier
          window.scrollTo({ top: document.getElementById('tierContainer').offsetTop - 100, behavior: 'smooth' });
        }
      }
    });

    // Double click to remove from tier list
    card.addEventListener('dblclick', (e) => {
      e.stopPropagation(); // Prevent click event
      if (card.parentElement !== rosterPool) {
        rosterPool.appendChild(card);
        updateCount();
        saveTiers();
      }
    });

    return card;
  }

  // --- Render all Pokémon into the roster pool ---
  function renderRoster() {
    rosterPool.innerHTML = '';
    POKEMON_DATA.forEach(poke => {
      rosterPool.appendChild(createPokeCard(poke));
    });
    updateCount();
  }

  // --- Apply default tier placements ---
  function applyDefaultTiers() {
    for (const [tier, names] of Object.entries(DEFAULT_TIERS)) {
      const zone = document.getElementById(`tier-${tier}`);
      names.forEach(name => {
        const card = rosterPool.querySelector(`[data-name="${name}"]`);
        if (card) zone.appendChild(card);
      });
    }
    updateCount();
  }

  // --- Update Pokémon count ---
  function updateCount() {
    const inPool = rosterPool.querySelectorAll('.poke-card').length;
    const total = POKEMON_DATA.length;
    pokeCount.textContent = `${inPool} de ${total} sin clasificar`;
  }

  // === DRAG & DROP ===
  function onDragStart(e) {
    draggedEl = e.target.closest('.poke-card');
    draggedEl.style.opacity = '0.4';
    e.dataTransfer.effectAllowed = 'move';
  }

  function onDragEnd(e) {
    if (draggedEl) draggedEl.style.opacity = '1';
    draggedEl = null;
    document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
    updateCount();
    saveTiers();
  }

  function getDragAfterElement(container, x, y) {
    const draggableElements = [...container.querySelectorAll('.poke-card:not([style*="opacity: 0.4"])')];
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const centerY = box.top + box.height / 2;
      const centerX = box.left + box.width / 2;
      if (y > box.top - 10 && y < box.bottom + 10) {
        if (x < centerX && (centerX - x) < closest.dist) {
          return { dist: centerX - x, element: child };
        }
      }
      return closest;
    }, { dist: Number.POSITIVE_INFINITY }).element;
  }

  function setupDropZones() {
    const allZones = [...tierZones, rosterPool];
    allZones.forEach(zone => {
      zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        zone.classList.add('drag-over');
        const afterElement = getDragAfterElement(zone, e.clientX, e.clientY);
        if (draggedEl) {
          if (afterElement == null) {
            zone.appendChild(draggedEl);
          } else {
            zone.insertBefore(draggedEl, afterElement);
          }
        }
      });
      zone.addEventListener('dragleave', () => {
        zone.classList.remove('drag-over');
      });
      zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        if (draggedEl) {
          updateCount();
          saveTiers();
        }
      });
    });
  }

  // === TOUCH SUPPORT (mobile) ===
  let touchClone = null;
  let touchOffsetX = 0, touchOffsetY = 0;

  function onTouchStart(e) {
    const card = e.target.closest('.poke-card');
    if (!card) return;
    draggedEl = card;
    const touch = e.touches[0];
    const rect = card.getBoundingClientRect();
    touchOffsetX = touch.clientX - rect.left;
    touchOffsetY = touch.clientY - rect.top;
    touchClone = card.cloneNode(true);
    touchClone.style.position = 'fixed';
    touchClone.style.zIndex = '9999';
    touchClone.style.pointerEvents = 'none';
    touchClone.style.opacity = '0.8';
    touchClone.style.width = rect.width + 'px';
    document.body.appendChild(touchClone);
    card.style.opacity = '0.3';
  }

  function onTouchMove(e) {
    if (!touchClone) return;
    e.preventDefault();
    const touch = e.touches[0];
    touchClone.style.left = (touch.clientX - touchOffsetX) + 'px';
    touchClone.style.top = (touch.clientY - touchOffsetY) + 'px';
  }

  function onTouchEnd(e) {
    if (!touchClone || !draggedEl) return;
    const touch = e.changedTouches[0];
    if (touchClone.parentNode) touchClone.parentNode.removeChild(touchClone);
    touchClone = null;
    draggedEl.style.opacity = '1';

    // Find drop target
    const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
    const zone = dropTarget ? dropTarget.closest('.tier-pokemon, .roster-pool') : null;
    if (zone) {
      zone.appendChild(draggedEl);
    }
    draggedEl = null;
    updateCount();
    saveTiers();
  }

  // === FILTERS ===
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      applyFilters();
    });
  });

  function applyFilters() {
    const query = searchInput.value.toLowerCase().trim();
    const allCards = document.querySelectorAll('.poke-card');
    allCards.forEach(card => {
      const name = (card.dataset.name || '').toLowerCase();
      const types = (card.dataset.types || '').toLowerCase();
      const isMega = card.classList.contains('mega');
      let matchFilter = activeFilter === 'all' ||
        (activeFilter === 'mega' && isMega) ||
        types.includes(activeFilter);
      let matchSearch = !query || name.includes(query);
      card.style.display = (matchFilter && matchSearch) ? '' : 'none';
    });
  }

  searchInput.addEventListener('input', () => {
    applyFilters();
    // Scroll down to roster pool so user sees the results
    const poolPos = rosterPool.offsetTop - 150;
    if (window.scrollY < poolPos - 200) {
      window.scrollTo({ top: poolPos, behavior: 'smooth' });
    }
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const visibleCards = [...rosterPool.querySelectorAll('.poke-card')].filter(c => c.style.display !== 'none');
      if (visibleCards.length > 0) {
        const tierS = document.getElementById('tier-s');
        if (tierS) {
          tierS.appendChild(visibleCards[0]);
          updateCount();
          saveTiers();
          searchInput.value = '';
          applyFilters();
          window.scrollTo({ top: document.getElementById('tierContainer').offsetTop - 100, behavior: 'smooth' });
        }
      }
    }
  });

  // === SAVE / LOAD (LocalStorage) ===
  function saveTiers() {
    const data = {};
    tierZones.forEach(zone => {
      const tier = zone.dataset.tier;
      data[tier] = [...zone.querySelectorAll('.poke-card')].map(c => c.dataset.name);
    });
    localStorage.setItem('gg_tierlist', JSON.stringify(data));
  }

  function loadTiers() {
    const saved = localStorage.getItem('gg_tierlist');
    if (!saved) return false;
    try {
      const data = JSON.parse(saved);
      for (const [tier, names] of Object.entries(data)) {
        const zone = document.getElementById(`tier-${tier}`);
        if (!zone) continue;
        names.forEach(name => {
          const card = rosterPool.querySelector(`[data-name="${name}"]`) ||
            document.querySelector(`.poke-card[data-name="${name}"]`);
          if (card) zone.appendChild(card);
        });
      }
      updateCount();
      return true;
    } catch { return false; }
  }

  // === RESET ===
  btnReset.addEventListener('click', () => {
    localStorage.removeItem('gg_tierlist');
    // Move everything back to pool
    document.querySelectorAll('.tier-pokemon .poke-card').forEach(card => {
      rosterPool.appendChild(card);
    });
    applyDefaultTiers();
    updateCount();
  });

  // === SHARE ===
  btnShare.addEventListener('click', () => {
    const data = {};
    tierZones.forEach(zone => {
      const tier = zone.dataset.tier;
      const names = [...zone.querySelectorAll('.poke-card')].map(c => c.dataset.name);
      if (names.length) data[tier] = names;
    });
    const encoded = btoa(JSON.stringify(data));
    const url = window.location.origin + window.location.pathname + '?t=' + encoded;
    navigator.clipboard.writeText(url).then(() => {
      btnShare.textContent = '✅ Copiado!';
      setTimeout(() => { btnShare.textContent = '📋 Copiar Link'; }, 2000);
    }).catch(() => {
      prompt('Copiá este link:', url);
    });
  });

  // === Load from URL param ===
  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('t');
    if (!t) return false;
    try {
      const data = JSON.parse(atob(t));
      for (const [tier, names] of Object.entries(data)) {
        const zone = document.getElementById(`tier-${tier}`);
        if (!zone) continue;
        names.forEach(name => {
          const card = document.querySelector(`.poke-card[data-name="${name}"]`);
          if (card) zone.appendChild(card);
        });
      }
      updateCount();
      return true;
    } catch { return false; }
  }

  // === INIT ===
  function init() {
    renderRoster();
    setupDropZones();
    if (!loadFromURL()) {
      if (!loadTiers()) {
        applyDefaultTiers();
      }
    }
  }

  // Add drag-over visual style
  const style = document.createElement('style');
  style.textContent = `.drag-over { background: rgba(212,160,23,0.08) !important; border-color: var(--gold) !important; }`;
  document.head.appendChild(style);

  init();
})();
