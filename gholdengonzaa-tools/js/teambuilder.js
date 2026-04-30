/**
 * Team Builder Logic
 */

(function() {
  'use strict';

  // Type chart: defender -> attacker -> multiplier
  const TYPE_CHART = {
    normal: { fighting: 2, ghost: 0 },
    fire: { fire: 0.5, water: 2, grass: 0.5, ice: 0.5, ground: 2, bug: 0.5, rock: 2, steel: 0.5, fairy: 0.5 },
    water: { fire: 0.5, water: 0.5, electric: 2, grass: 2, ice: 0.5, steel: 0.5 },
    electric: { electric: 0.5, ground: 2, flying: 0.5, steel: 0.5 },
    grass: { fire: 2, water: 0.5, grass: 0.5, electric: 0.5, ice: 2, poison: 2, ground: 0.5, flying: 2, bug: 2 },
    ice: { fire: 2, ice: 0.5, fighting: 2, rock: 2, steel: 2 },
    fighting: { flying: 2, psychic: 2, bug: 0.5, rock: 0.5, dark: 0.5, fairy: 2 },
    poison: { grass: 0.5, fighting: 0.5, poison: 0.5, ground: 2, psychic: 2, bug: 0.5, fairy: 0.5 },
    ground: { water: 2, electric: 0, grass: 2, ice: 2, poison: 0.5, rock: 0.5 },
    flying: { electric: 2, grass: 0.5, ice: 2, fighting: 0.5, ground: 0, bug: 0.5, rock: 2 },
    psychic: { fighting: 0.5, psychic: 0.5, bug: 2, ghost: 2, dark: 2 },
    bug: { fire: 2, grass: 0.5, fighting: 0.5, ground: 0.5, flying: 2, rock: 2 },
    rock: { normal: 0.5, fire: 0.5, water: 2, grass: 2, fighting: 2, poison: 0.5, ground: 2, flying: 0.5, steel: 2 },
    ghost: { normal: 0, fighting: 0, poison: 0.5, bug: 0.5, ghost: 2, dark: 2 },
    dragon: { fire: 0.5, water: 0.5, electric: 0.5, grass: 0.5, ice: 2, dragon: 2, fairy: 2 },
    dark: { fighting: 2, psychic: 0, bug: 2, ghost: 0.5, dark: 0.5, fairy: 2 },
    steel: { normal: 0.5, fire: 2, grass: 0.5, ice: 0.5, fighting: 2, poison: 0, ground: 2, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 0.5, dragon: 0.5, steel: 0.5, fairy: 0.5 },
    fairy: { fighting: 0.5, poison: 2, bug: 0.5, dragon: 0, dark: 0.5, steel: 2 }
  };

  const teamSlots = document.getElementById('teamSlots');
  const analysisGrid = document.getElementById('analysisGrid');
  const rosterGrid = document.getElementById('rosterGrid');
  const rosterSearch = document.getElementById('rosterSearch');
  const btnClearTeam = document.getElementById('btnClearTeam');

  let team = []; // Max 6

  // Load from local storage
  try {
    const saved = localStorage.getItem('gg_team');
    if (saved) {
      team = JSON.parse(saved).map(name => POKEMON_DATA.find(p => p.name === name)).filter(p => p);
    }
  } catch(e) {}

  function saveTeam() {
    localStorage.setItem('gg_team', JSON.stringify(team.map(p => p.name)));
  }

  function getMultiplier(defenderTypes, attackerType) {
    let mult = 1;
    defenderTypes.forEach(defType => {
      const defChart = TYPE_CHART[defType];
      if (defChart && defChart[attackerType] !== undefined) {
        mult *= defChart[attackerType];
      }
    });
    return mult;
  }

  function renderTeam() {
    let html = '';
    for (let i = 0; i < 6; i++) {
      if (team[i]) {
        let megaToggleHtml = '';
        if (team[i].hasMega || team[i].isMegaVariant) {
          megaToggleHtml = `<button class="mega-btn" onclick="toggleTeamMega(${i})" title="Alternar Forma (Mega X/Y)">🔮 Mega</button>`;
        }

        html += `
          <div class="team-slot filled ${team[i].isMegaVariant ? 'mega-active' : ''}">
            <button class="remove-btn" onclick="removeFromTeam(${i})" title="Quitar del equipo">X</button>
            ${megaToggleHtml}
            <a href="counters.html?p=${team[i].id}" title="Ver Counters de ${team[i].displayName || team[i].name}">
              <img src="${spriteUrl(team[i].id)}" alt="${team[i].name}" onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';">
            </a>
          </div>
        `;
      } else {
        html += `
          <div class="team-slot" style="cursor:pointer;" onclick="document.getElementById('rosterSearch').scrollIntoView({behavior: 'smooth', block: 'center'}); setTimeout(() => document.getElementById('rosterSearch').focus(), 300);" title="Buscar Pokémon para agregar">
            <span style="color: var(--surface-3); font-size: 2rem;">+</span>
          </div>
        `;
      }
    }
    teamSlots.innerHTML = html;
    renderAnalysis();
    saveTeam();
  }

  window.removeFromTeam = function(index) {
    team.splice(index, 1);
    renderTeam();
  };

  window.addToTeam = function(index) {
    if (team.length >= 6) {
      alert("¡Tu equipo ya tiene 6 Pokémon!");
      return;
    }
    const poke = POKEMON_DATA[index];
    // Check if already in team
    if (team.some(p => p.id === poke.id)) {
      alert("Ese Pokémon ya está en tu equipo.");
      return;
    }
    team.push(poke);
    renderTeam();
  };

  window.toggleTeamMega = function(slotIndex) {
    const poke = team[slotIndex];
    if (!poke) return;

    if (!poke.isMegaVariant && poke.hasMega) {
       const megas = POKEMON_DATA.filter(p => p.isMegaVariant && p.name.toLowerCase().startsWith(poke.name.toLowerCase() + '-mega'));
       if (megas.length > 0) team[slotIndex] = megas[0];
    } else if (poke.isMegaVariant) {
       const baseNameMatch = poke.name.match(/^(.*?)-mega/);
       if (baseNameMatch) {
         const baseName = baseNameMatch[1];
         const basePoke = POKEMON_DATA.find(p => p.name.toLowerCase() === baseName.toLowerCase());
         const megas = POKEMON_DATA.filter(p => p.isMegaVariant && p.name.toLowerCase().startsWith(baseName.toLowerCase() + '-mega'));
         
         const currentMegaIndex = megas.findIndex(p => p.id === poke.id);
         if (currentMegaIndex < megas.length - 1) {
            team[slotIndex] = megas[currentMegaIndex + 1];
         } else {
            team[slotIndex] = basePoke;
         }
       }
    }
    renderTeam();
  };

  function renderAnalysis() {
    const matrixHeader = document.getElementById('matrixHeader');
    const matrixBody = document.getElementById('matrixBody');
    
    // Build Header
    let headerHtml = '<th>TIPO</th>';
    for (let i = 0; i < 6; i++) {
      if (team[i]) {
        headerHtml += `<th title="Ver Counters de ${team[i].name}"><a href="counters.html?p=${team[i].id}"><img src="${spriteUrl(team[i].id)}" class="team-header-img" alt="${team[i].name}" onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';"></a></th>`;
      } else {
        headerHtml += `<th><div class="team-header-img" style="opacity:0.2;">?</div></th>`;
      }
    }
    headerHtml += '<th class="col-total">TOTAL</th>';
    matrixHeader.innerHTML = headerHtml;

    // Build Body
    let bodyHtml = '';
    ALL_TYPES.forEach(atkType => {
      bodyHtml += `<tr>`;
      bodyHtml += `<td><span class="type-badge type-${atkType}" style="font-size:0.6rem;">${atkType}</span></td>`;
      
      let teamWeak = 0;
      let teamResist = 0;
      let teamImmune = 0;

      for (let i = 0; i < 6; i++) {
        if (team[i]) {
          const mult = getMultiplier(team[i].types, atkType);
          let cellClass = 'cell-x1';
          let cellText = '';
          
          if (mult === 4) { cellClass = 'cell-x4'; cellText = '4'; teamWeak++; }
          else if (mult === 2) { cellClass = 'cell-x2'; cellText = '2'; teamWeak++; }
          else if (mult === 0.5) { cellClass = 'cell-x05'; cellText = '½'; teamResist++; }
          else if (mult === 0.25) { cellClass = 'cell-x025'; cellText = '¼'; teamResist++; }
          else if (mult === 0) { cellClass = 'cell-x0'; cellText = '0'; teamImmune++; }
          
          bodyHtml += `<td class="${cellClass}">${cellText}</td>`;
        } else {
          bodyHtml += `<td class="cell-x1"></td>`; // Empty slot
        }
      }

      // Total summary cell for this type
      let summaryHtml = '';
      if (teamWeak > 0) summaryHtml += `<span style="margin-right:8px;"><b style="color:#ffffff;">${teamWeak}</b><span style="color:#EF4444; font-weight:bold; font-size:0.85em; margin-left:2px;">W</span></span>`;
      if (teamResist > 0) summaryHtml += `<span style="margin-right:8px;"><b style="color:#ffffff;">${teamResist}</b><span style="color:#F5D76E; font-weight:bold; font-size:0.85em; margin-left:2px;">R</span></span>`;
      if (teamImmune > 0) summaryHtml += `<span><b style="color:#ffffff;">${teamImmune}</b><span style="color:#3B82F6; font-weight:bold; font-size:0.85em; margin-left:2px;">I</span></span>`;
      if (summaryHtml === '') summaryHtml = '-';

      bodyHtml += `<td class="col-total" style="font-size:0.75rem;">${summaryHtml}</td>`;
      bodyHtml += `</tr>`;
    });
    
    matrixBody.innerHTML = bodyHtml;
  }

  function renderRoster() {
    const query = rosterSearch.value.toLowerCase().trim();
    
    const filtered = POKEMON_DATA.filter(p => {
      if (p.isMegaVariant) return false;
      const name = p.displayName || p.name;
      return name.toLowerCase().includes(query);
    });

    rosterGrid.innerHTML = filtered.map(p => {
      const name = p.displayName || p.name;
      const index = POKEMON_DATA.indexOf(p);
      return `
        <div class="roster-poke" onclick="addToTeam(${index})" title="${name}">
          <img src="${spriteUrl(p.id)}" loading="lazy" alt="${name}" onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';">
          <span>${name}</span>
        </div>
      `;
    }).join('');
  }

  rosterSearch.addEventListener('input', renderRoster);
  
  rosterSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const query = rosterSearch.value.toLowerCase().trim();
      const filtered = POKEMON_DATA.filter(p => {
        if (p.isMegaVariant) return false;
        const name = p.displayName || p.name;
        return name.toLowerCase().includes(query);
      });
      if (filtered.length > 0) {
        addToTeam(POKEMON_DATA.indexOf(filtered[0]));
        rosterSearch.value = '';
        renderRoster();
      }
    }
  });
  
  btnClearTeam.addEventListener('click', () => {
    team = [];
    renderTeam();
  });

  // Initial renders
  renderTeam();
  renderRoster();

})();
