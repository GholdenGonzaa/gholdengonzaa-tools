/**
 * Speed Tiers Calculator Logic
 */

(function() {
  'use strict';

  const speedTableBody = document.getElementById('speedTableBody');
  const speedSearch = document.getElementById('speedSearch');
  const btnScarf = document.getElementById('btnScarf');
  const btnTailwind = document.getElementById('btnTailwind');
  const btnTrickRoom = document.getElementById('btnTrickRoom');
  
  let activeMod = 'none'; // 'none', 'scarf', 'tailwind'
  let trickRoomActive = false;

  // Formula for Level 50 Stats
  // Stat = Math.floor((Math.floor((2 * Base + IV + Math.floor(EV / 4)) * 50 / 100) + 5) * Nature)
  function calcSpeed(base, iv, ev, natureMult) {
    const core = Math.floor((2 * base + iv + Math.floor(ev / 4)) * 50 / 100) + 5;
    return Math.floor(core * natureMult);
  }

  function getModMultiplier() {
    if (activeMod === 'scarf') return 1.5;
    if (activeMod === 'tailwind') return 2.0;
    return 1.0;
  }

  function generateSpeedData() {
    const mult = getModMultiplier();
    
    return POKEMON_DATA.map(p => {
      const base = p.speed || 100; // fallback
      let maxSpeed = calcSpeed(base, 31, 252, 1.1);
      let neutralSpeed = calcSpeed(base, 31, 252, 1.0);
      let minSpeed = calcSpeed(base, 0, 0, 0.9);
      
      if (mult > 1.0) {
        maxSpeed = Math.floor(maxSpeed * mult);
        neutralSpeed = Math.floor(neutralSpeed * mult);
        // Scarf/Tailwind usually don't mix with Trick Room but we calculate it anyway
        minSpeed = Math.floor(minSpeed * mult);
      }

      return {
        ...p,
        base,
        maxSpeed,
        neutralSpeed,
        minSpeed
      };
    }).sort((a, b) => {
      if (trickRoomActive) {
        return a.minSpeed - b.minSpeed; // Sort by min speed ascending
      } else {
        return b.maxSpeed - a.maxSpeed; // Sort by max speed descending
      }
    });
  }

  function renderTable() {
    const data = generateSpeedData();
    const query = speedSearch.value.toLowerCase().trim();
    const multLabel = activeMod === 'scarf' ? ' <span style="font-size:0.7em">(x1.5)</span>' : (activeMod === 'tailwind' ? ' <span style="font-size:0.7em">(x2)</span>' : '');

    speedTableBody.innerHTML = data.map(p => {
      const name = p.displayName || p.name;
      const isHighlighted = query && name.toLowerCase().includes(query);
      
      return `
        <tr class="${isHighlighted ? 'highlight-row' : ''}" ${isHighlighted ? 'id="highlighted-row"' : ''}>
          <td>
            <div class="poke-cell">
              <img src="${spriteUrl(p.id)}" alt="${name}" onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';">
              <span>${name}</span>
            </div>
          </td>
          <td class="${trickRoomActive ? 'stat-base' : 'stat-max'}">${p.maxSpeed}${!trickRoomActive ? multLabel : ''}</td>
          <td class="stat-neutral">${p.neutralSpeed}</td>
          <td class="${trickRoomActive ? 'stat-max' : 'stat-min'}">${p.minSpeed}${trickRoomActive ? multLabel : ''}</td>
          <td class="stat-base">${p.base}</td>
        </tr>
      `;
    }).join('');

    // Scroll to first highlighted row
    if (query) {
      const target = document.getElementById('highlighted-row');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  speedSearch.addEventListener('input', renderTable);
  
  function updateModButtons() {
    btnScarf.className = activeMod === 'scarf' ? 'btn btn-gold speed-mod-btn' : 'btn btn-outline speed-mod-btn';
    btnTailwind.className = activeMod === 'tailwind' ? 'btn btn-gold speed-mod-btn' : 'btn btn-outline speed-mod-btn';
  }

  btnScarf.addEventListener('click', () => {
    activeMod = activeMod === 'scarf' ? 'none' : 'scarf';
    updateModButtons();
    renderTable();
  });

  btnTailwind.addEventListener('click', () => {
    activeMod = activeMod === 'tailwind' ? 'none' : 'tailwind';
    updateModButtons();
    renderTable();
  });

  btnTrickRoom.addEventListener('click', () => {
    trickRoomActive = !trickRoomActive;
    if (trickRoomActive) {
      btnTrickRoom.classList.add('btn-gold');
      btnTrickRoom.classList.remove('btn-outline');
    } else {
      btnTrickRoom.classList.remove('btn-gold');
      btnTrickRoom.classList.add('btn-outline');
    }
    renderTable();
  });

  // Initial render
  renderTable();

})();
