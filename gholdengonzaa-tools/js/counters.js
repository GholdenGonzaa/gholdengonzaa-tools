/**
 * Type Effectiveness & Counter Logic
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

  const searchInput = document.getElementById('searchPoke');
  const searchResults = document.getElementById('searchResults');
  const resultsArea = document.getElementById('resultsArea');
  const pokeInfo = document.getElementById('pokeInfo');
  const weaknessList = document.getElementById('weaknessList');
  const resistList = document.getElementById('resistList');
  const immuneList = document.getElementById('immuneList');
  const immuneBox = document.getElementById('immuneBox');
  const countersList = document.getElementById('countersList');
  const btnTrickRoom = document.getElementById('btnTrickRoom');

  let trickRoomActive = false;
  let lastSelectedPoke = null;

  // Multiplier calculation for a defender's types against an attacking type
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

  // Calculate effectiveness
  function calculateEffectiveness(types) {
    const weaknesses = [];
    const resistances = [];
    const immunities = [];

    ALL_TYPES.forEach(atkType => {
      const m = getMultiplier(types, atkType);
      if (m > 1) weaknesses.push({ type: atkType, mult: m });
      else if (m === 0) immunities.push({ type: atkType, mult: m });
      else if (m < 1) resistances.push({ type: atkType, mult: m });
    });

    return { weaknesses, resistances, immunities };
  }

  function renderTypeBadge(typeData) {
    return `<span class="type-badge type-${typeData.type}">${typeData.type} <span class="stat-multiplier">${typeData.mult}x</span></span>`;
  }

  function selectPokemon(poke) {
    const eff = calculateEffectiveness(poke.types);
    
    // Header
    const name = poke.displayName || poke.name;
    const typeHtml = poke.types.map(t => `<span class="type-badge type-${t}">${t}</span>`).join(' ');
    
    let megaBtnHtml = '';
    if (poke.hasMega || poke.isMegaVariant) {
      megaBtnHtml = `<div style="margin-top: 12px;"><button class="btn btn-outline" onclick="toggleCounterMega(${poke.id})" style="border-color:var(--violet); color:var(--violet-light); padding: 4px 12px; font-size: 0.8rem;">🔮 Mega</button></div>`;
    }

    pokeInfo.innerHTML = `
      <img src="${spriteUrl(poke.id)}" alt="${name}" onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';">
      <h2>${name}</h2>
      <div>${typeHtml}</div>
      ${megaBtnHtml}
    `;

    // Lists
    weaknessList.innerHTML = eff.weaknesses.sort((a,b) => b.mult - a.mult).map(renderTypeBadge).join('');
    resistList.innerHTML = eff.resistances.sort((a,b) => a.mult - b.mult).map(renderTypeBadge).join('');
    
    if (eff.immunities.length > 0) {
      immuneBox.style.display = 'block';
      immuneList.innerHTML = eff.immunities.map(renderTypeBadge).join('');
    } else {
      immuneBox.style.display = 'none';
    }

    // Find Counters in roster
    // A counter should:
    // 1. Have a STAB advantage
    // 2. NOT be weak to the target's STABs
    // 3. Ideally be faster, or very resistant
    const suggestedCounters = POKEMON_DATA.filter(p => {
      if (p.id === poke.id) return false;
      
      // Offensive advantage
      const hasSuperEffectiveSTAB = p.types.some(t => weakTypes.includes(t));
      if (!hasSuperEffectiveSTAB) return false;

      // Defensive check: Must not be weak to defender's primary or secondary STAB
      const multFromSTAB1 = getMultiplier(p.types, poke.types[0]);
      const multFromSTAB2 = poke.types[1] ? getMultiplier(p.types, poke.types[1]) : 0;
      
      // If it's weak to ANY of the target's STABs, it's not a safe counter
      if (multFromSTAB1 > 1 || multFromSTAB2 > 1) return false;

      // Speed check: 
      // Standard: Faster is better. If slower, must resist STAB.
      // Trick Room: Slower is better. If faster, must resist STAB.
      const effectivelyFaster = trickRoomActive ? (p.speed < poke.speed) : (p.speed > poke.speed);
      
      if (!effectivelyFaster && multFromSTAB1 >= 1) return false;

      return true;
    })
    .sort((a, b) => {
      return trickRoomActive ? (a.speed - b.speed) : (b.speed - a.speed);
    })
    .slice(0, 8);

    countersList.innerHTML = suggestedCounters.map(p => {
      const name = p.displayName || p.name;
      return `
      <div class="poke-card" onclick="selectPokemonById(${POKEMON_DATA.indexOf(p)})" style="height: auto; padding-bottom: 4px; cursor: pointer; display: flex; flex-direction: column; position: relative;">
        <img src="${spriteUrl(p.id)}" alt="${name}" onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';">
        <span style="font-size: 0.65rem; font-weight: bold; color: var(--gold); text-align: center; line-height: 1; margin-top: -4px;">${name}</span>
        <span style="position: absolute; top: 2px; right: 2px; background: rgba(0,0,0,0.7); font-size: 0.5rem; color: white; padding: 1px 3px; border-radius: 4px;">S:${p.speed}</span>
      </div>
      `;
    }).join('');
    if(suggestedCounters.length === 0) countersList.innerHTML = '<span style="color:var(--text-muted)">No hay counters claros en el roster.</span>';

    // Find who this Pokemon is strong against
    const strongAgainstList = document.getElementById('strongAgainstList');
    const strongAgainst = POKEMON_DATA.filter(p => {
      if (p.id === poke.id) return false;
      return poke.types.some(myType => getMultiplier(p.types, myType) > 1);
    }).slice(0, 14); // show top 14

    strongAgainstList.innerHTML = strongAgainst.map(p => {
      const name = p.displayName || p.name;
      return `
      <div class="poke-card counter-card" onclick="selectPokemonById(${POKEMON_DATA.indexOf(p)})" style="height: auto; padding-bottom: 4px; cursor: pointer; display: flex; flex-direction: column;">
        <img src="${spriteUrl(p.id)}" alt="${name}" onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';">
        <span style="font-size: 0.65rem; font-weight: bold; color: var(--gold); text-align: center; line-height: 1; margin-top: -4px;">${name}</span>
      </div>
      `;
    }).join('');
    if(strongAgainst.length === 0) strongAgainstList.innerHTML = '<span style="color:var(--text-muted)">No tiene ventajas claras ofensivas.</span>';

    resultsArea.style.display = 'flex';
    searchResults.innerHTML = '';
    searchInput.value = '';
    lastSelectedPoke = poke;
  }

  function renderSearch() {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) {
      searchResults.innerHTML = '';
      return;
    }
    
    const matches = POKEMON_DATA.filter(p => !p.isMegaVariant && (p.displayName || p.name).toLowerCase().includes(query)).slice(0, 6);
    
    searchResults.innerHTML = matches.map(p => {
      const name = p.displayName || p.name;
      return `
        <div class="search-item" onclick="selectPokemonById(${POKEMON_DATA.indexOf(p)})">
          <img src="${spriteUrl(p.spriteId || p.id)}" alt="${name}" onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';">
          <span><strong>${name}</strong></span>
        </div>
      `;
    }).join('');
  }

  window.selectPokemonById = function(index) {
    selectPokemon(POKEMON_DATA[index]);
  };

  window.toggleCounterMega = function(pokeId) {
    const poke = POKEMON_DATA.find(p => p.id === pokeId);
    if (!poke) return;

    if (!poke.isMegaVariant && poke.hasMega) {
       const megas = POKEMON_DATA.filter(p => p.isMegaVariant && p.name.toLowerCase().startsWith(poke.name.toLowerCase() + '-mega'));
       if (megas.length > 0) selectPokemon(megas[0]);
    } else if (poke.isMegaVariant) {
       const baseNameMatch = poke.name.match(/^(.*?)-mega/);
       if (baseNameMatch) {
         const baseName = baseNameMatch[1];
         const basePoke = POKEMON_DATA.find(p => p.name.toLowerCase() === baseName.toLowerCase());
         const megas = POKEMON_DATA.filter(p => p.isMegaVariant && p.name.toLowerCase().startsWith(baseName.toLowerCase() + '-mega'));
         
         const currentMegaIndex = megas.findIndex(p => p.id === poke.id);
         if (currentMegaIndex < megas.length - 1) {
            selectPokemon(megas[currentMegaIndex + 1]);
         } else {
            selectPokemon(basePoke);
         }
       }
    }
  };

  searchInput.addEventListener('input', renderSearch);

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.toLowerCase().trim();
      const matches = POKEMON_DATA.filter(p => !p.isMegaVariant && (p.displayName || p.name).toLowerCase().includes(query)).slice(0, 6);
      if (matches.length > 0) {
        selectPokemon(matches[0]);
        searchInput.value = '';
        renderSearch();
      }
    }
  });

  if (btnTrickRoom) {
    btnTrickRoom.addEventListener('click', () => {
      trickRoomActive = !trickRoomActive;
      if (trickRoomActive) {
        btnTrickRoom.style.background = 'var(--violet)';
        btnTrickRoom.style.color = 'white';
        btnTrickRoom.textContent = '🔮 Trick Room ON';
      } else {
        btnTrickRoom.style.background = 'var(--surface-3)';
        btnTrickRoom.style.color = 'var(--text-muted)';
        btnTrickRoom.textContent = '⌛ Espacio Raro (TR)';
      }
      if (lastSelectedPoke) selectPokemon(lastSelectedPoke);
    });
  }

  // Auto-select on load
  const params = new URLSearchParams(window.location.search);
  const pokeParam = params.get('p');
  let initialPoke = POKEMON_DATA.find(p => p.name === "Charizard");
  
  if (pokeParam) {
    const found = POKEMON_DATA.find(p => p.id == pokeParam || p.name.toLowerCase() === pokeParam.toLowerCase());
    if (found) initialPoke = found;
  }
  selectPokemon(initialPoke);

})();
