/**
 * Pokemon Champions - Full Roster Data (Regulation M-A)
 * 186 Species + 59 Mega Evolutions
 * Source: Bulbapedia - List of Pokémon in Pokémon Champions
 * Sprites from PokeAPI: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png
 */

const SPRITE_BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

// Helper to get sprite URL. For regional/alternate forms we use the standard sprite.
function spriteUrl(id) {
  const poke = POKEMON_DATA.find(p => p.id === id);
  if (poke && poke.isMegaVariant) {
    let showdownName = poke.name.replace('-mega-x', '-megax').replace('-mega-y', '-megay');
    if (showdownName === 'greninja-mega') showdownName = 'greninja-ash';
    // Some custom megas might not exist in showdown, but it's the safest fallback.
    return `https://play.pokemonshowdown.com/sprites/gen5/${showdownName}.png`;
  }
  return `${SPRITE_BASE}${id}.png`;
}

const POKEMON_DATA = [
  {
    id: 3,
    name: "Venusaur",
    types: [
      "grass",
      "poison"
    ],
    mega: true,
    speed: 80,
    hasMega: true
  },
  {
    id: 10033,
    name: "venusaur-mega",
    displayName: "Mega Venusaur",
    types: [
      "grass",
      "poison"
    ],
    isMegaVariant: true,
    speed: 80
  },
  {
    id: 6,
    name: "Charizard",
    types: [
      "fire",
      "flying"
    ],
    mega: true,
    speed: 100,
    hasMega: true
  },
  {
    id: 10034,
    name: "charizard-mega-x",
    displayName: "Mega Charizard X",
    types: [
      "fire",
      "dragon"
    ],
    isMegaVariant: true,
    speed: 100
  },
  {
    id: 10035,
    name: "charizard-mega-y",
    displayName: "Mega Charizard Y",
    types: [
      "fire",
      "flying"
    ],
    isMegaVariant: true,
    speed: 100
  },
  {
    id: 9,
    name: "Blastoise",
    types: [
      "water"
    ],
    mega: true,
    speed: 78,
    hasMega: true
  },
  {
    id: 10036,
    name: "blastoise-mega",
    displayName: "Mega Blastoise",
    types: [
      "water"
    ],
    isMegaVariant: true,
    speed: 78
  },
  {
    id: 15,
    name: "Beedrill",
    types: [
      "bug",
      "poison"
    ],
    mega: true,
    speed: 75,
    hasMega: true
  },
  {
    id: 10090,
    name: "beedrill-mega",
    displayName: "Mega Beedrill",
    types: [
      "bug",
      "poison"
    ],
    isMegaVariant: true,
    speed: 145
  },
  {
    id: 18,
    name: "Pidgeot",
    types: [
      "normal",
      "flying"
    ],
    mega: true,
    speed: 101,
    hasMega: true
  },
  {
    id: 10073,
    name: "pidgeot-mega",
    displayName: "Mega Pidgeot",
    types: [
      "normal",
      "flying"
    ],
    isMegaVariant: true,
    speed: 121
  },
  {
    id: 24,
    name: "Arbok",
    types: [
      "poison"
    ],
    speed: 80
  },
  {
    id: 25,
    name: "Pikachu",
    types: [
      "electric"
    ],
    speed: 90
  },
  {
    id: 26,
    name: "Raichu",
    types: [
      "electric"
    ],
    speed: 110
  },
  {
    id: 36,
    name: "Clefable",
    types: [
      "fairy"
    ],
    mega: true,
    speed: 60,
    hasMega: true
  },
  {
    id: 10278,
    name: "clefable-mega",
    displayName: "Mega Clefable",
    types: [
      "fairy",
      "flying"
    ],
    isMegaVariant: true,
    speed: 70
  },
  {
    id: 38,
    name: "Ninetales",
    types: [
      "fire"
    ],
    speed: 100
  },
  {
    id: 59,
    name: "Arcanine",
    types: [
      "fire"
    ],
    speed: 95
  },
  {
    id: 65,
    name: "Alakazam",
    types: [
      "psychic"
    ],
    mega: true,
    speed: 120,
    hasMega: true
  },
  {
    id: 10037,
    name: "alakazam-mega",
    displayName: "Mega Alakazam",
    types: [
      "psychic"
    ],
    isMegaVariant: true,
    speed: 150
  },
  {
    id: 68,
    name: "Machamp",
    types: [
      "fighting"
    ],
    speed: 55
  },
  {
    id: 71,
    name: "Victreebel",
    types: [
      "grass",
      "poison"
    ],
    mega: true,
    speed: 70,
    hasMega: true
  },
  {
    id: 10279,
    name: "victreebel-mega",
    displayName: "Mega Victreebel",
    types: [
      "grass",
      "poison"
    ],
    isMegaVariant: true,
    speed: 70
  },
  {
    id: 80,
    name: "Slowbro",
    types: [
      "water",
      "psychic"
    ],
    mega: true,
    speed: 30,
    hasMega: true
  },
  {
    id: 10071,
    name: "slowbro-mega",
    displayName: "Mega Slowbro",
    types: [
      "water",
      "psychic"
    ],
    isMegaVariant: true,
    speed: 30
  },
  {
    id: 94,
    name: "Gengar",
    types: [
      "ghost",
      "poison"
    ],
    mega: true,
    speed: 110,
    hasMega: true
  },
  {
    id: 10038,
    name: "gengar-mega",
    displayName: "Mega Gengar",
    types: [
      "ghost",
      "poison"
    ],
    isMegaVariant: true,
    speed: 130
  },
  {
    id: 115,
    name: "Kangaskhan",
    types: [
      "normal"
    ],
    mega: true,
    speed: 90,
    hasMega: true
  },
  {
    id: 10039,
    name: "kangaskhan-mega",
    displayName: "Mega Kangaskhan",
    types: [
      "normal"
    ],
    isMegaVariant: true,
    speed: 100
  },
  {
    id: 121,
    name: "Starmie",
    types: [
      "water",
      "psychic"
    ],
    mega: true,
    speed: 115,
    hasMega: true
  },
  {
    id: 10280,
    name: "starmie-mega",
    displayName: "Mega Starmie",
    types: [
      "water",
      "psychic"
    ],
    isMegaVariant: true,
    speed: 120
  },
  {
    id: 127,
    name: "Pinsir",
    types: [
      "bug"
    ],
    mega: true,
    speed: 85,
    hasMega: true
  },
  {
    id: 10040,
    name: "pinsir-mega",
    displayName: "Mega Pinsir",
    types: [
      "bug",
      "flying"
    ],
    isMegaVariant: true,
    speed: 105
  },
  {
    id: 128,
    name: "Tauros",
    types: [
      "normal"
    ],
    speed: 110
  },
  {
    id: 130,
    name: "Gyarados",
    types: [
      "water",
      "flying"
    ],
    mega: true,
    speed: 81,
    hasMega: true
  },
  {
    id: 10041,
    name: "gyarados-mega",
    displayName: "Mega Gyarados",
    types: [
      "water",
      "dark"
    ],
    isMegaVariant: true,
    speed: 81
  },
  {
    id: 132,
    name: "Ditto",
    types: [
      "normal"
    ],
    speed: 48
  },
  {
    id: 134,
    name: "Vaporeon",
    types: [
      "water"
    ],
    speed: 65
  },
  {
    id: 135,
    name: "Jolteon",
    types: [
      "electric"
    ],
    speed: 130
  },
  {
    id: 136,
    name: "Flareon",
    types: [
      "fire"
    ],
    speed: 65
  },
  {
    id: 142,
    name: "Aerodactyl",
    types: [
      "rock",
      "flying"
    ],
    mega: true,
    speed: 130,
    hasMega: true
  },
  {
    id: 10042,
    name: "aerodactyl-mega",
    displayName: "Mega Aerodactyl",
    types: [
      "rock",
      "flying"
    ],
    isMegaVariant: true,
    speed: 150
  },
  {
    id: 143,
    name: "Snorlax",
    types: [
      "normal"
    ],
    speed: 30
  },
  {
    id: 149,
    name: "Dragonite",
    types: [
      "dragon",
      "flying"
    ],
    mega: true,
    speed: 80,
    hasMega: true
  },
  {
    id: 10281,
    name: "dragonite-mega",
    displayName: "Mega Dragonite",
    types: [
      "dragon",
      "flying"
    ],
    isMegaVariant: true,
    speed: 100
  },
  {
    id: 154,
    name: "Meganium",
    types: [
      "grass"
    ],
    mega: true,
    speed: 80,
    hasMega: true
  },
  {
    id: 10282,
    name: "meganium-mega",
    displayName: "Mega Meganium",
    types: [
      "grass",
      "fairy"
    ],
    isMegaVariant: true,
    speed: 80
  },
  {
    id: 157,
    name: "Typhlosion",
    types: [
      "fire"
    ],
    speed: 100
  },
  {
    id: 160,
    name: "Feraligatr",
    types: [
      "water"
    ],
    mega: true,
    speed: 78,
    hasMega: true
  },
  {
    id: 10283,
    name: "feraligatr-mega",
    displayName: "Mega Feraligatr",
    types: [
      "water",
      "dragon"
    ],
    isMegaVariant: true,
    speed: 78
  },
  {
    id: 168,
    name: "Ariados",
    types: [
      "bug",
      "poison"
    ],
    speed: 40
  },
  {
    id: 181,
    name: "Ampharos",
    types: [
      "electric"
    ],
    mega: true,
    speed: 55,
    hasMega: true
  },
  {
    id: 10045,
    name: "ampharos-mega",
    displayName: "Mega Ampharos",
    types: [
      "electric",
      "dragon"
    ],
    isMegaVariant: true,
    speed: 45
  },
  {
    id: 184,
    name: "Azumarill",
    types: [
      "water",
      "fairy"
    ],
    speed: 50
  },
  {
    id: 186,
    name: "Politoed",
    types: [
      "water"
    ],
    speed: 70
  },
  {
    id: 196,
    name: "Espeon",
    types: [
      "psychic"
    ],
    speed: 110
  },
  {
    id: 197,
    name: "Umbreon",
    types: [
      "dark"
    ],
    speed: 65
  },
  {
    id: 199,
    name: "Slowking",
    types: [
      "water",
      "psychic"
    ],
    speed: 30
  },
  {
    id: 205,
    name: "Forretress",
    types: [
      "bug",
      "steel"
    ],
    speed: 40
  },
  {
    id: 208,
    name: "Steelix",
    types: [
      "steel",
      "ground"
    ],
    mega: true,
    speed: 30,
    hasMega: true
  },
  {
    id: 10072,
    name: "steelix-mega",
    displayName: "Mega Steelix",
    types: [
      "steel",
      "ground"
    ],
    isMegaVariant: true,
    speed: 30
  },
  {
    id: 212,
    name: "Scizor",
    types: [
      "bug",
      "steel"
    ],
    mega: true,
    speed: 65,
    hasMega: true
  },
  {
    id: 10046,
    name: "scizor-mega",
    displayName: "Mega Scizor",
    types: [
      "bug",
      "steel"
    ],
    isMegaVariant: true,
    speed: 75
  },
  {
    id: 214,
    name: "Heracross",
    types: [
      "bug",
      "fighting"
    ],
    mega: true,
    speed: 85,
    hasMega: true
  },
  {
    id: 10047,
    name: "heracross-mega",
    displayName: "Mega Heracross",
    types: [
      "bug",
      "fighting"
    ],
    isMegaVariant: true,
    speed: 75
  },
  {
    id: 227,
    name: "Skarmory",
    types: [
      "steel",
      "flying"
    ],
    mega: true,
    speed: 70,
    hasMega: true
  },
  {
    id: 10284,
    name: "skarmory-mega",
    displayName: "Mega Skarmory",
    types: [
      "steel",
      "flying"
    ],
    isMegaVariant: true,
    speed: 110
  },
  {
    id: 229,
    name: "Houndoom",
    types: [
      "dark",
      "fire"
    ],
    mega: true,
    speed: 95,
    hasMega: true
  },
  {
    id: 10048,
    name: "houndoom-mega",
    displayName: "Mega Houndoom",
    types: [
      "dark",
      "fire"
    ],
    isMegaVariant: true,
    speed: 115
  },
  {
    id: 248,
    name: "Tyranitar",
    types: [
      "rock",
      "dark"
    ],
    mega: true,
    speed: 61,
    hasMega: true
  },
  {
    id: 10049,
    name: "tyranitar-mega",
    displayName: "Mega Tyranitar",
    types: [
      "rock",
      "dark"
    ],
    isMegaVariant: true,
    speed: 71
  },
  {
    id: 279,
    name: "Pelipper",
    types: [
      "water",
      "flying"
    ],
    speed: 65
  },
  {
    id: 282,
    name: "Gardevoir",
    types: [
      "psychic",
      "fairy"
    ],
    mega: true,
    speed: 80,
    hasMega: true
  },
  {
    id: 10051,
    name: "gardevoir-mega",
    displayName: "Mega Gardevoir",
    types: [
      "psychic",
      "fairy"
    ],
    isMegaVariant: true,
    speed: 100
  },
  {
    id: 302,
    name: "Sableye",
    types: [
      "dark",
      "ghost"
    ],
    mega: true,
    speed: 50,
    hasMega: true
  },
  {
    id: 10066,
    name: "sableye-mega",
    displayName: "Mega Sableye",
    types: [
      "dark",
      "ghost"
    ],
    isMegaVariant: true,
    speed: 20
  },
  {
    id: 306,
    name: "Aggron",
    types: [
      "steel",
      "rock"
    ],
    mega: true,
    speed: 50,
    hasMega: true
  },
  {
    id: 10053,
    name: "aggron-mega",
    displayName: "Mega Aggron",
    types: [
      "steel"
    ],
    isMegaVariant: true,
    speed: 50
  },
  {
    id: 308,
    name: "Medicham",
    types: [
      "fighting",
      "psychic"
    ],
    mega: true,
    speed: 80,
    hasMega: true
  },
  {
    id: 10054,
    name: "medicham-mega",
    displayName: "Mega Medicham",
    types: [
      "fighting",
      "psychic"
    ],
    isMegaVariant: true,
    speed: 100
  },
  {
    id: 310,
    name: "Manectric",
    types: [
      "electric"
    ],
    mega: true,
    speed: 105,
    hasMega: true
  },
  {
    id: 10055,
    name: "manectric-mega",
    displayName: "Mega Manectric",
    types: [
      "electric"
    ],
    isMegaVariant: true,
    speed: 135
  },
  {
    id: 319,
    name: "Sharpedo",
    types: [
      "water",
      "dark"
    ],
    mega: true,
    speed: 95,
    hasMega: true
  },
  {
    id: 10070,
    name: "sharpedo-mega",
    displayName: "Mega Sharpedo",
    types: [
      "water",
      "dark"
    ],
    isMegaVariant: true,
    speed: 105
  },
  {
    id: 323,
    name: "Camerupt",
    types: [
      "fire",
      "ground"
    ],
    mega: true,
    speed: 40,
    hasMega: true
  },
  {
    id: 10087,
    name: "camerupt-mega",
    displayName: "Mega Camerupt",
    types: [
      "fire",
      "ground"
    ],
    isMegaVariant: true,
    speed: 20
  },
  {
    id: 324,
    name: "Torkoal",
    types: [
      "fire"
    ],
    speed: 20
  },
  {
    id: 334,
    name: "Altaria",
    types: [
      "dragon",
      "flying"
    ],
    mega: true,
    speed: 80,
    hasMega: true
  },
  {
    id: 10067,
    name: "altaria-mega",
    displayName: "Mega Altaria",
    types: [
      "dragon",
      "fairy"
    ],
    isMegaVariant: true,
    speed: 80
  },
  {
    id: 350,
    name: "Milotic",
    types: [
      "water"
    ],
    speed: 81
  },
  {
    id: 351,
    name: "Castform",
    types: [
      "normal"
    ],
    mega: true,
    speed: 70,
    hasMega: true
  },
  {
    id: 354,
    name: "Banette",
    types: [
      "ghost"
    ],
    mega: true,
    speed: 65,
    hasMega: true
  },
  {
    id: 10056,
    name: "banette-mega",
    displayName: "Mega Banette",
    types: [
      "ghost"
    ],
    isMegaVariant: true,
    speed: 75
  },
  {
    id: 358,
    name: "Chimecho",
    types: [
      "psychic"
    ],
    mega: true,
    speed: 65,
    hasMega: true
  },
  {
    id: 10306,
    name: "chimecho-mega",
    displayName: "Mega Chimecho",
    types: [
      "psychic",
      "steel"
    ],
    isMegaVariant: true,
    speed: 65
  },
  {
    id: 359,
    name: "Absol",
    types: [
      "dark"
    ],
    mega: true,
    speed: 75,
    hasMega: true
  },
  {
    id: 10057,
    name: "absol-mega",
    displayName: "Mega Absol",
    types: [
      "dark"
    ],
    isMegaVariant: true,
    speed: 115
  },
  {
    id: 362,
    name: "Glalie",
    types: [
      "ice"
    ],
    mega: true,
    speed: 80,
    hasMega: true
  },
  {
    id: 10074,
    name: "glalie-mega",
    displayName: "Mega Glalie",
    types: [
      "ice"
    ],
    isMegaVariant: true,
    speed: 100
  },
  {
    id: 389,
    name: "Torterra",
    types: [
      "grass",
      "ground"
    ],
    speed: 56
  },
  {
    id: 392,
    name: "Infernape",
    types: [
      "fire",
      "fighting"
    ],
    speed: 108
  },
  {
    id: 395,
    name: "Empoleon",
    types: [
      "water",
      "steel"
    ],
    speed: 60
  },
  {
    id: 405,
    name: "Luxray",
    types: [
      "electric"
    ],
    speed: 70
  },
  {
    id: 407,
    name: "Roserade",
    types: [
      "grass",
      "poison"
    ],
    speed: 90
  },
  {
    id: 409,
    name: "Rampardos",
    types: [
      "rock"
    ],
    speed: 58
  },
  {
    id: 411,
    name: "Bastiodon",
    types: [
      "rock",
      "steel"
    ],
    speed: 30
  },
  {
    id: 428,
    name: "Lopunny",
    types: [
      "normal"
    ],
    mega: true,
    speed: 105,
    hasMega: true
  },
  {
    id: 10088,
    name: "lopunny-mega",
    displayName: "Mega Lopunny",
    types: [
      "normal",
      "fighting"
    ],
    isMegaVariant: true,
    speed: 135
  },
  {
    id: 442,
    name: "Spiritomb",
    types: [
      "ghost",
      "dark"
    ],
    speed: 35
  },
  {
    id: 445,
    name: "Garchomp",
    types: [
      "dragon",
      "ground"
    ],
    mega: true,
    speed: 102,
    hasMega: true
  },
  {
    id: 10058,
    name: "garchomp-mega",
    displayName: "Mega Garchomp",
    types: [
      "dragon",
      "ground"
    ],
    isMegaVariant: true,
    speed: 92
  },
  {
    id: 448,
    name: "Lucario",
    types: [
      "fighting",
      "steel"
    ],
    mega: true,
    speed: 90,
    hasMega: true
  },
  {
    id: 10059,
    name: "lucario-mega",
    displayName: "Mega Lucario",
    types: [
      "fighting",
      "steel"
    ],
    isMegaVariant: true,
    speed: 112
  },
  {
    id: 450,
    name: "Hippowdon",
    types: [
      "ground"
    ],
    speed: 47
  },
  {
    id: 454,
    name: "Toxicroak",
    types: [
      "poison",
      "fighting"
    ],
    speed: 85
  },
  {
    id: 460,
    name: "Abomasnow",
    types: [
      "grass",
      "ice"
    ],
    mega: true,
    speed: 60,
    hasMega: true
  },
  {
    id: 10060,
    name: "abomasnow-mega",
    displayName: "Mega Abomasnow",
    types: [
      "grass",
      "ice"
    ],
    isMegaVariant: true,
    speed: 30
  },
  {
    id: 461,
    name: "Weavile",
    types: [
      "dark",
      "ice"
    ],
    speed: 125
  },
  {
    id: 464,
    name: "Rhyperior",
    types: [
      "ground",
      "rock"
    ],
    speed: 40
  },
  {
    id: 470,
    name: "Leafeon",
    types: [
      "grass"
    ],
    speed: 95
  },
  {
    id: 471,
    name: "Glaceon",
    types: [
      "ice"
    ],
    speed: 65
  },
  {
    id: 472,
    name: "Gliscor",
    types: [
      "ground",
      "flying"
    ],
    speed: 95
  },
  {
    id: 473,
    name: "Mamoswine",
    types: [
      "ice",
      "ground"
    ],
    speed: 80
  },
  {
    id: 475,
    name: "Gallade",
    types: [
      "psychic",
      "fighting"
    ],
    mega: true,
    speed: 80,
    hasMega: true
  },
  {
    id: 10068,
    name: "gallade-mega",
    displayName: "Mega Gallade",
    types: [
      "psychic",
      "fighting"
    ],
    isMegaVariant: true,
    speed: 110
  },
  {
    id: 478,
    name: "Froslass",
    types: [
      "ice",
      "ghost"
    ],
    mega: true,
    speed: 110,
    hasMega: true
  },
  {
    id: 10285,
    name: "froslass-mega",
    displayName: "Mega Froslass",
    types: [
      "ice",
      "ghost"
    ],
    isMegaVariant: true,
    speed: 120
  },
  {
    id: 479,
    name: "Rotom",
    types: [
      "electric",
      "ghost"
    ],
    speed: 91
  },
  {
    id: 497,
    name: "Serperior",
    types: [
      "grass"
    ],
    speed: 113
  },
  {
    id: 500,
    name: "Emboar",
    types: [
      "fire",
      "fighting"
    ],
    mega: true,
    speed: 65,
    hasMega: true
  },
  {
    id: 10286,
    name: "emboar-mega",
    displayName: "Mega Emboar",
    types: [
      "fire",
      "fighting"
    ],
    isMegaVariant: true,
    speed: 75
  },
  {
    id: 503,
    name: "Samurott",
    types: [
      "water"
    ],
    speed: 70
  },
  {
    id: 505,
    name: "Watchog",
    types: [
      "normal"
    ],
    speed: 77
  },
  {
    id: 510,
    name: "Liepard",
    types: [
      "dark"
    ],
    speed: 106
  },
  {
    id: 512,
    name: "Simisage",
    types: [
      "grass"
    ],
    speed: 101
  },
  {
    id: 514,
    name: "Simisear",
    types: [
      "fire"
    ],
    speed: 101
  },
  {
    id: 516,
    name: "Simipour",
    types: [
      "water"
    ],
    speed: 101
  },
  {
    id: 530,
    name: "Excadrill",
    types: [
      "ground",
      "steel"
    ],
    mega: true,
    speed: 88,
    hasMega: true
  },
  {
    id: 10287,
    name: "excadrill-mega",
    displayName: "Mega Excadrill",
    types: [
      "ground",
      "steel"
    ],
    isMegaVariant: true,
    speed: 103
  },
  {
    id: 531,
    name: "Audino",
    types: [
      "normal"
    ],
    mega: true,
    speed: 50,
    hasMega: true
  },
  {
    id: 10069,
    name: "audino-mega",
    displayName: "Mega Audino",
    types: [
      "normal",
      "fairy"
    ],
    isMegaVariant: true,
    speed: 50
  },
  {
    id: 534,
    name: "Conkeldurr",
    types: [
      "fighting"
    ],
    speed: 45
  },
  {
    id: 547,
    name: "Whimsicott",
    types: [
      "grass",
      "fairy"
    ],
    speed: 116
  },
  {
    id: 553,
    name: "Krookodile",
    types: [
      "ground",
      "dark"
    ],
    speed: 92
  },
  {
    id: 563,
    name: "Cofagrigus",
    types: [
      "ghost"
    ],
    speed: 30
  },
  {
    id: 569,
    name: "Garbodor",
    types: [
      "poison"
    ],
    speed: 75
  },
  {
    id: 571,
    name: "Zoroark",
    types: [
      "dark"
    ],
    speed: 105
  },
  {
    id: 579,
    name: "Reuniclus",
    types: [
      "psychic"
    ],
    speed: 30
  },
  {
    id: 584,
    name: "Vanilluxe",
    types: [
      "ice"
    ],
    speed: 79
  },
  {
    id: 587,
    name: "Emolga",
    types: [
      "electric",
      "flying"
    ],
    speed: 103
  },
  {
    id: 609,
    name: "Chandelure",
    types: [
      "ghost",
      "fire"
    ],
    mega: true,
    speed: 80,
    hasMega: true
  },
  {
    id: 10291,
    name: "chandelure-mega",
    displayName: "Mega Chandelure",
    types: [
      "ghost",
      "fire"
    ],
    isMegaVariant: true,
    speed: 90
  },
  {
    id: 614,
    name: "Beartic",
    types: [
      "ice"
    ],
    speed: 50
  },
  {
    id: 618,
    name: "Stunfisk",
    types: [
      "ground",
      "electric"
    ],
    speed: 32
  },
  {
    id: 623,
    name: "Golurk",
    types: [
      "ground",
      "ghost"
    ],
    mega: true,
    speed: 55,
    hasMega: true
  },
  {
    id: 10313,
    name: "golurk-mega",
    displayName: "Mega Golurk",
    types: [
      "ground",
      "ghost"
    ],
    isMegaVariant: true,
    speed: 55
  },
  {
    id: 635,
    name: "Hydreigon",
    types: [
      "dark",
      "dragon"
    ],
    speed: 98
  },
  {
    id: 637,
    name: "Volcarona",
    types: [
      "bug",
      "fire"
    ],
    speed: 100
  },
  {
    id: 652,
    name: "Chesnaught",
    types: [
      "grass",
      "fighting"
    ],
    mega: true,
    speed: 64,
    hasMega: true
  },
  {
    id: 10292,
    name: "chesnaught-mega",
    displayName: "Mega Chesnaught",
    types: [
      "grass",
      "fighting"
    ],
    isMegaVariant: true,
    speed: 44
  },
  {
    id: 655,
    name: "Delphox",
    types: [
      "fire",
      "psychic"
    ],
    mega: true,
    speed: 104,
    hasMega: true
  },
  {
    id: 10293,
    name: "delphox-mega",
    displayName: "Mega Delphox",
    types: [
      "fire",
      "psychic"
    ],
    isMegaVariant: true,
    speed: 134
  },
  {
    id: 658,
    name: "Greninja",
    types: [
      "water",
      "dark"
    ],
    mega: true,
    speed: 122,
    hasMega: true
  },
  {
    id: 10294,
    name: "greninja-mega",
    displayName: "Mega Greninja",
    types: [
      "water",
      "dark"
    ],
    isMegaVariant: true,
    speed: 142
  },
  {
    id: 660,
    name: "Diggersby",
    types: [
      "normal",
      "ground"
    ],
    speed: 78
  },
  {
    id: 663,
    name: "Talonflame",
    types: [
      "fire",
      "flying"
    ],
    speed: 126
  },
  {
    id: 666,
    name: "Vivillon",
    types: [
      "bug",
      "flying"
    ],
    mega: true,
    speed: 89,
    hasMega: true
  },
  {
    id: 670,
    name: "Floette",
    types: [
      "fairy"
    ],
    mega: true,
    speed: 52,
    hasMega: true
  },
  {
    id: 10296,
    name: "floette-mega",
    displayName: "Mega Floette",
    types: [
      "fairy"
    ],
    isMegaVariant: true,
    speed: 102
  },
  {
    id: 671,
    name: "Florges",
    types: [
      "fairy"
    ],
    mega: true,
    speed: 75,
    hasMega: true
  },
  {
    id: 675,
    name: "Pangoro",
    types: [
      "fighting",
      "dark"
    ],
    speed: 58
  },
  {
    id: 676,
    name: "Furfrou",
    types: [
      "normal"
    ],
    mega: true,
    speed: 102,
    hasMega: true
  },
  {
    id: 678,
    name: "Meowstic",
    types: [
      "psychic"
    ],
    mega: true,
    speed: 104,
    hasMega: true
  },
  {
    id: 10314,
    name: "meowstic-mega",
    displayName: "Mega Meowstic",
    types: [
      "psychic"
    ],
    isMegaVariant: true,
    speed: 124
  },
  {
    id: 681,
    name: "Aegislash",
    types: [
      "steel",
      "ghost"
    ],
    mega: true,
    speed: 60,
    hasMega: true
  },
  {
    id: 683,
    name: "Aromatisse",
    types: [
      "fairy"
    ],
    speed: 29
  },
  {
    id: 685,
    name: "Slurpuff",
    types: [
      "fairy"
    ],
    speed: 72
  },
  {
    id: 693,
    name: "Clawitzer",
    types: [
      "water"
    ],
    speed: 59
  },
  {
    id: 695,
    name: "Heliolisk",
    types: [
      "electric",
      "normal"
    ],
    speed: 109
  },
  {
    id: 697,
    name: "Tyrantrum",
    types: [
      "rock",
      "dragon"
    ],
    speed: 71
  },
  {
    id: 699,
    name: "Aurorus",
    types: [
      "rock",
      "ice"
    ],
    speed: 58
  },
  {
    id: 700,
    name: "Sylveon",
    types: [
      "fairy"
    ],
    speed: 60
  },
  {
    id: 701,
    name: "Hawlucha",
    types: [
      "fighting",
      "flying"
    ],
    mega: true,
    speed: 118,
    hasMega: true
  },
  {
    id: 10300,
    name: "hawlucha-mega",
    displayName: "Mega Hawlucha",
    types: [
      "fighting",
      "flying"
    ],
    isMegaVariant: true,
    speed: 118
  },
  {
    id: 702,
    name: "Dedenne",
    types: [
      "electric",
      "fairy"
    ],
    speed: 101
  },
  {
    id: 706,
    name: "Goodra",
    types: [
      "dragon"
    ],
    speed: 80
  },
  {
    id: 707,
    name: "Klefki",
    types: [
      "steel",
      "fairy"
    ],
    speed: 75
  },
  {
    id: 709,
    name: "Trevenant",
    types: [
      "ghost",
      "grass"
    ],
    speed: 56
  },
  {
    id: 711,
    name: "Gourgeist",
    types: [
      "ghost",
      "grass"
    ],
    speed: 84
  },
  {
    id: 713,
    name: "Avalugg",
    types: [
      "ice"
    ],
    speed: 28
  },
  {
    id: 715,
    name: "Noivern",
    types: [
      "flying",
      "dragon"
    ],
    speed: 123
  },
  {
    id: 724,
    name: "Decidueye",
    types: [
      "grass",
      "ghost"
    ],
    speed: 70
  },
  {
    id: 727,
    name: "Incineroar",
    types: [
      "fire",
      "dark"
    ],
    speed: 60
  },
  {
    id: 730,
    name: "Primarina",
    types: [
      "water",
      "fairy"
    ],
    speed: 60
  },
  {
    id: 733,
    name: "Toucannon",
    types: [
      "normal",
      "flying"
    ],
    speed: 60
  },
  {
    id: 740,
    name: "Crabominable",
    types: [
      "fighting",
      "ice"
    ],
    mega: true,
    speed: 43,
    hasMega: true
  },
  {
    id: 10315,
    name: "crabominable-mega",
    displayName: "Mega Crabominable",
    types: [
      "fighting",
      "ice"
    ],
    isMegaVariant: true,
    speed: 33
  },
  {
    id: 745,
    name: "Lycanroc",
    types: [
      "rock"
    ],
    speed: 112
  },
  {
    id: 748,
    name: "Toxapex",
    types: [
      "poison",
      "water"
    ],
    speed: 35
  },
  {
    id: 750,
    name: "Mudsdale",
    types: [
      "ground"
    ],
    speed: 35
  },
  {
    id: 752,
    name: "Araquanid",
    types: [
      "water",
      "bug"
    ],
    speed: 42
  },
  {
    id: 758,
    name: "Salazzle",
    types: [
      "poison",
      "fire"
    ],
    speed: 117
  },
  {
    id: 763,
    name: "Tsareena",
    types: [
      "grass"
    ],
    speed: 72
  },
  {
    id: 765,
    name: "Oranguru",
    types: [
      "normal",
      "psychic"
    ],
    speed: 60
  },
  {
    id: 766,
    name: "Passimian",
    types: [
      "fighting"
    ],
    speed: 80
  },
  {
    id: 778,
    name: "Mimikyu",
    types: [
      "ghost",
      "fairy"
    ],
    speed: 96
  },
  {
    id: 780,
    name: "Drampa",
    types: [
      "normal",
      "dragon"
    ],
    speed: 36
  },
  {
    id: 784,
    name: "Kommo-o",
    types: [
      "dragon",
      "fighting"
    ],
    speed: 85
  },
  {
    id: 823,
    name: "Corviknight",
    types: [
      "flying",
      "steel"
    ],
    speed: 67
  },
  {
    id: 841,
    name: "Flapple",
    types: [
      "grass",
      "dragon"
    ],
    speed: 70
  },
  {
    id: 842,
    name: "Appletun",
    types: [
      "grass",
      "dragon"
    ],
    speed: 30
  },
  {
    id: 844,
    name: "Sandaconda",
    types: [
      "ground"
    ],
    speed: 71
  },
  {
    id: 855,
    name: "Polteageist",
    types: [
      "ghost"
    ],
    speed: 70
  },
  {
    id: 858,
    name: "Hatterene",
    types: [
      "psychic",
      "fairy"
    ],
    speed: 29
  },
  {
    id: 866,
    name: "Mr. Rime",
    types: [
      "ice",
      "psychic"
    ],
    speed: 70
  },
  {
    id: 867,
    name: "Runerigus",
    types: [
      "ground",
      "ghost"
    ],
    speed: 30
  },
  {
    id: 869,
    name: "Alcremie",
    types: [
      "fairy"
    ],
    speed: 64
  },
  {
    id: 877,
    name: "Morpeko",
    types: [
      "electric",
      "dark"
    ],
    speed: 97
  },
  {
    id: 887,
    name: "Dragapult",
    types: [
      "dragon",
      "ghost"
    ],
    speed: 142
  },
  {
    id: 899,
    name: "Wyrdeer",
    types: [
      "normal",
      "psychic"
    ],
    speed: 65
  },
  {
    id: 900,
    name: "Kleavor",
    types: [
      "bug",
      "rock"
    ],
    speed: 85
  },
  {
    id: 902,
    name: "Basculegion",
    types: [
      "water",
      "ghost"
    ],
    speed: 78
  },
  {
    id: 903,
    name: "Sneasler",
    types: [
      "fighting",
      "poison"
    ],
    speed: 120
  },
  {
    id: 908,
    name: "Meowscarada",
    types: [
      "grass",
      "dark"
    ],
    speed: 123
  },
  {
    id: 911,
    name: "Skeledirge",
    types: [
      "fire",
      "ghost"
    ],
    speed: 66
  },
  {
    id: 914,
    name: "Quaquaval",
    types: [
      "water",
      "fighting"
    ],
    speed: 85
  },
  {
    id: 925,
    name: "Maushold",
    types: [
      "normal"
    ],
    speed: 111
  },
  {
    id: 934,
    name: "Garganacl",
    types: [
      "rock"
    ],
    speed: 35
  },
  {
    id: 936,
    name: "Armarouge",
    types: [
      "fire",
      "psychic"
    ],
    speed: 75
  },
  {
    id: 937,
    name: "Ceruledge",
    types: [
      "fire",
      "ghost"
    ],
    speed: 85
  },
  {
    id: 939,
    name: "Bellibolt",
    types: [
      "electric"
    ],
    speed: 45
  },
  {
    id: 952,
    name: "Scovillain",
    types: [
      "grass",
      "fire"
    ],
    speed: 75
  },
  {
    id: 956,
    name: "Espathra",
    types: [
      "psychic"
    ],
    speed: 105
  },
  {
    id: 959,
    name: "Tinkaton",
    types: [
      "fairy",
      "steel"
    ],
    speed: 94
  },
  {
    id: 964,
    name: "Palafin",
    types: [
      "water"
    ],
    speed: 100
  },
  {
    id: 968,
    name: "Orthworm",
    types: [
      "steel"
    ],
    speed: 65
  },
  {
    id: 970,
    name: "Glimmora",
    types: [
      "rock",
      "poison"
    ],
    speed: 86
  },
  {
    id: 981,
    name: "Farigiraf",
    types: [
      "normal",
      "psychic"
    ],
    speed: 60
  },
  {
    id: 983,
    name: "Kingambit",
    types: [
      "dark",
      "steel"
    ],
    speed: 50
  },
  {
    id: 1013,
    name: "Sinistcha",
    types: [
      "grass",
      "ghost"
    ],
    speed: 70
  },
  {
    id: 1018,
    name: "Archaludon",
    types: [
      "steel",
      "dragon"
    ],
    speed: 85
  },
  {
    id: 1019,
    name: "Hydrapple",
    types: [
      "grass",
      "dragon"
    ],
    speed: 44
  }
];

// Default suggested tier list (S-tier based on community meta as of April 2026)
const DEFAULT_TIERS = {
  s: ["Charizard","Gengar","Greninja","Dragonite","Floette"],
  a: ["Tyranitar","Delphox","Meganium","Garchomp","Kingambit","Incineroar"],
  b: ["Torkoal","Pelipper","Whimsicott","Gardevoir","Scizor"],
  c: [],
  d: []
};

// All 18 types
const ALL_TYPES = [
  "normal","fire","water","electric","grass","ice","fighting","poison",
  "ground","flying","psychic","bug","rock","ghost","dragon","dark","steel","fairy"
];

