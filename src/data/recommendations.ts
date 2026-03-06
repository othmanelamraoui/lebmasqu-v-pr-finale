export interface Recommendation {
  id: string;
  name: string;
  brand: string;
  image: string;
  notes: string[];
  profile: 'fresh' | 'floral' | 'oriental' | 'woody';
  gender: 'male' | 'female' | 'unisex';
  siteProductId?: string; // ID if sold on site
}

const defaultImage = 'https://drive.google.com/thumbnail?id=1JhT_mXN6tC9OIcJ5uldDErLLOUy_MMUA&sz=w1000';

export const recommendations: Recommendation[] = [
  // --- FRESH ---
  {
    id: 'rec-fresh-1',
    name: 'Sauvage',
    brand: 'Dior',
    image: defaultImage,
    notes: ['Bergamote', 'Poivre', 'Ambroxan'],
    profile: 'fresh',
    gender: 'male',
    siteProductId: '11'
  },
  {
    id: 'rec-fresh-2',
    name: 'Y Eau de Parfum',
    brand: 'Yves Saint Laurent',
    image: defaultImage,
    notes: ['Pomme', 'Sauge', 'Bois Ambré'],
    profile: 'fresh',
    gender: 'male',
    siteProductId: '13'
  },
  {
    id: 'rec-fresh-3',
    name: 'Acqua Di Giò',
    brand: 'Giorgio Armani',
    image: defaultImage,
    notes: ['Notes Marines', 'Bergamote', 'Romarin'],
    profile: 'fresh',
    gender: 'male',
    siteProductId: '18'
  },
  {
    id: 'rec-fresh-4',
    name: 'Eros',
    brand: 'Versace',
    image: defaultImage,
    notes: ['Menthe', 'Pomme', 'Vanille'],
    profile: 'fresh',
    gender: 'male',
    siteProductId: '16'
  },
  {
    id: 'rec-fresh-5',
    name: 'Aventus',
    brand: 'Creed',
    image: defaultImage,
    notes: ['Ananas', 'Bouleau', 'Musc'],
    profile: 'fresh',
    gender: 'male',
    siteProductId: '25'
  },
  {
    id: 'rec-fresh-6',
    name: 'Light Blue',
    brand: 'Dolce & Gabbana',
    image: defaultImage,
    notes: ['Citron', 'Pomme', 'Cèdre'],
    profile: 'fresh',
    gender: 'female'
  },
  {
    id: 'rec-fresh-7',
    name: 'CK One',
    brand: 'Calvin Klein',
    image: defaultImage,
    notes: ['Citron', 'Thé Vert', 'Musc'],
    profile: 'fresh',
    gender: 'unisex'
  },
  {
    id: 'rec-fresh-8',
    name: 'Chrome',
    brand: 'Azzaro',
    image: defaultImage,
    notes: ['Citron', 'Romarin', 'Ananas'],
    profile: 'fresh',
    gender: 'male'
  },
  {
    id: 'rec-fresh-9',
    name: 'L\'Eau d\'Issey',
    brand: 'Issey Miyake',
    image: defaultImage,
    notes: ['Lotus', 'Melon', 'Bois'],
    profile: 'fresh',
    gender: 'female'
  },
  {
    id: 'rec-fresh-10',
    name: 'Versace Pour Homme',
    brand: 'Versace',
    image: defaultImage,
    notes: ['Citron', 'Néroli', 'Jacinthe'],
    profile: 'fresh',
    gender: 'male'
  },
  {
    id: 'rec-fresh-11',
    name: 'Wood Sage & Sea Salt',
    brand: 'Jo Malone',
    image: defaultImage,
    notes: ['Sel Marin', 'Sauge', 'Pamplemousse'],
    profile: 'fresh',
    gender: 'unisex'
  },
  {
    id: 'rec-fresh-12',
    name: 'Un Jardin sur le Nil',
    brand: 'Hermès',
    image: defaultImage,
    notes: ['Mangue Verte', 'Lotus', 'Encens'],
    profile: 'fresh',
    gender: 'unisex'
  },
  {
    id: 'rec-fresh-13',
    name: 'Chance Eau Fraîche',
    brand: 'Chanel',
    image: defaultImage,
    notes: ['Cédrat', 'Jasmin', 'Bois de Teck'],
    profile: 'fresh',
    gender: 'female'
  },
  {
    id: 'rec-fresh-14',
    name: 'Silver Mountain Water',
    brand: 'Creed',
    image: defaultImage,
    notes: ['Thé Vert', 'Cassis', 'Musc'],
    profile: 'fresh',
    gender: 'unisex'
  },
  {
    id: 'rec-fresh-15',
    name: 'Neroli Portofino',
    brand: 'Tom Ford',
    image: defaultImage,
    notes: ['Néroli', 'Bergamote', 'Ambre'],
    profile: 'fresh',
    gender: 'unisex'
  },
  {
    id: 'rec-fresh-16',
    name: 'Bal d\'Afrique',
    brand: 'Byredo',
    image: defaultImage,
    notes: ['Tagète', 'Citron', 'Vétiver'],
    profile: 'fresh',
    gender: 'unisex'
  },

  // --- FLORAL ---
  {
    id: 'rec-floral-1',
    name: 'Libre',
    brand: 'Yves Saint Laurent',
    image: defaultImage,
    notes: ['Lavande', 'Fleur d\'Oranger', 'Vanille'],
    profile: 'floral',
    gender: 'female',
    siteProductId: '1'
  },
  {
    id: 'rec-floral-2',
    name: 'L\'Interdit',
    brand: 'Givenchy',
    image: defaultImage,
    notes: ['Fleur Blanche', 'Tubéreuse', 'Patchouli'],
    profile: 'floral',
    gender: 'female',
    siteProductId: '2'
  },
  {
    id: 'rec-floral-3',
    name: 'Paradoxe',
    brand: 'Prada',
    image: defaultImage,
    notes: ['Poire', 'Ambre', 'Musc Blanc'],
    profile: 'floral',
    gender: 'female',
    siteProductId: '7'
  },
  {
    id: 'rec-floral-4',
    name: 'My Way',
    brand: 'Giorgio Armani',
    image: defaultImage,
    notes: ['Fleur d\'Oranger', 'Tubéreuse', 'Vanille'],
    profile: 'floral',
    gender: 'female',
    siteProductId: '8'
  },
  {
    id: 'rec-floral-5',
    name: 'J\'adore',
    brand: 'Dior',
    image: defaultImage,
    notes: ['Ylang-Ylang', 'Rose', 'Jasmin'],
    profile: 'floral',
    gender: 'female',
    siteProductId: '10'
  },
  {
    id: 'rec-floral-6',
    name: 'Miss Dior',
    brand: 'Dior',
    image: defaultImage,
    notes: ['Rose', 'Pivoine', 'Musc'],
    profile: 'floral',
    gender: 'female'
  },
  {
    id: 'rec-floral-7',
    name: 'Flowerbomb',
    brand: 'Viktor&Rolf',
    image: defaultImage,
    notes: ['Orchidée', 'Rose', 'Patchouli'],
    profile: 'floral',
    gender: 'female'
  },
  {
    id: 'rec-floral-8',
    name: 'Gucci Bloom',
    brand: 'Gucci',
    image: defaultImage,
    notes: ['Tubéreuse', 'Jasmin', 'Rangoon Creeper'],
    profile: 'floral',
    gender: 'female'
  },
  {
    id: 'rec-floral-9',
    name: 'Chloé Eau de Parfum',
    brand: 'Chloé',
    image: defaultImage,
    notes: ['Pivoine', 'Rose', 'Miel'],
    profile: 'floral',
    gender: 'female'
  },
  {
    id: 'rec-floral-10',
    name: 'Delina',
    brand: 'Parfums de Marly',
    image: defaultImage,
    notes: ['Litchi', 'Rose Turque', 'Rhubarbe'],
    profile: 'floral',
    gender: 'female',
    siteProductId: '32'
  },
  {
    id: 'rec-floral-11',
    name: 'Dior Homme Intense',
    brand: 'Dior',
    image: defaultImage,
    notes: ['Iris', 'Ambrette', 'Cèdre'],
    profile: 'floral',
    gender: 'male'
  },
  {
    id: 'rec-floral-12',
    name: 'L\'Homme',
    brand: 'Prada',
    image: defaultImage,
    notes: ['Iris', 'Néroli', 'Ambre'],
    profile: 'floral',
    gender: 'male'
  },
  {
    id: 'rec-floral-13',
    name: 'Portrait of a Lady',
    brand: 'Frédéric Malle',
    image: defaultImage,
    notes: ['Rose', 'Patchouli', 'Encens'],
    profile: 'floral',
    gender: 'female'
  },
  {
    id: 'rec-floral-14',
    name: 'Carnal Flower',
    brand: 'Frédéric Malle',
    image: defaultImage,
    notes: ['Tubéreuse', 'Eucalyptus', 'Coco'],
    profile: 'floral',
    gender: 'unisex'
  },
  {
    id: 'rec-floral-15',
    name: 'Do Son',
    brand: 'Diptyque',
    image: defaultImage,
    notes: ['Tubéreuse', 'Fleur d\'Oranger', 'Jasmin'],
    profile: 'floral',
    gender: 'unisex'
  },

  // --- ORIENTAL ---
  {
    id: 'rec-oriental-1',
    name: 'Baccarat Rouge 540',
    brand: 'Maison Francis Kurkdjian',
    image: defaultImage,
    notes: ['Safran', 'Jasmin', 'Bois Ambré'],
    profile: 'oriental',
    gender: 'unisex',
    siteProductId: '21'
  },
  {
    id: 'rec-oriental-2',
    name: 'Black Opium',
    brand: 'Yves Saint Laurent',
    image: defaultImage,
    notes: ['Café', 'Vanille', 'Fleur Blanche'],
    profile: 'oriental',
    gender: 'female',
    siteProductId: '5'
  },
  {
    id: 'rec-oriental-3',
    name: 'La Vie Est Belle',
    brand: 'Lancôme',
    image: defaultImage,
    notes: ['Iris', 'Praline', 'Vanille'],
    profile: 'oriental',
    gender: 'female',
    siteProductId: '6'
  },
  {
    id: 'rec-oriental-4',
    name: 'Coco Mademoiselle',
    brand: 'Chanel',
    image: defaultImage,
    notes: ['Orange', 'Rose', 'Patchouli'],
    profile: 'oriental',
    gender: 'female',
    siteProductId: '3'
  },
  {
    id: 'rec-oriental-5',
    name: 'Good Girl',
    brand: 'Carolina Herrera',
    image: defaultImage,
    notes: ['Amande', 'Tubéreuse', 'Cacao'],
    profile: 'oriental',
    gender: 'female',
    siteProductId: '4'
  },
  {
    id: 'rec-oriental-6',
    name: '1 Million',
    brand: 'Paco Rabanne',
    image: defaultImage,
    notes: ['Mandarine', 'Cannelle', 'Cuir'],
    profile: 'oriental',
    gender: 'male',
    siteProductId: '14'
  },
  {
    id: 'rec-oriental-7',
    name: 'Le Mâle',
    brand: 'Jean Paul Gaultier',
    image: defaultImage,
    notes: ['Lavande', 'Menthe', 'Vanille'],
    profile: 'oriental',
    gender: 'male',
    siteProductId: '15'
  },
  {
    id: 'rec-oriental-8',
    name: 'Angels\' Share',
    brand: 'Kilian',
    image: defaultImage,
    notes: ['Cognac', 'Cannelle', 'Fève Tonka'],
    profile: 'oriental',
    gender: 'unisex',
    siteProductId: '34'
  },
  {
    id: 'rec-oriental-9',
    name: 'Tobacco Vanille',
    brand: 'Tom Ford',
    image: defaultImage,
    notes: ['Tabac', 'Vanille', 'Épices'],
    profile: 'oriental',
    gender: 'unisex',
    siteProductId: '31'
  },
  {
    id: 'rec-oriental-10',
    name: 'Shalimar',
    brand: 'Guerlain',
    image: defaultImage,
    notes: ['Bergamote', 'Iris', 'Vanille'],
    profile: 'oriental',
    gender: 'female'
  },
  {
    id: 'rec-oriental-11',
    name: 'Spicebomb Extreme',
    brand: 'Viktor&Rolf',
    image: defaultImage,
    notes: ['Tabac', 'Vanille', 'Poivre Noir'],
    profile: 'oriental',
    gender: 'male'
  },
  {
    id: 'rec-oriental-12',
    name: 'Armani Code Parfum',
    brand: 'Giorgio Armani',
    image: defaultImage,
    notes: ['Fève Tonka', 'Iris', 'Cèdre'],
    profile: 'oriental',
    gender: 'male'
  },
  {
    id: 'rec-oriental-13',
    name: 'Grand Soir',
    brand: 'Maison Francis Kurkdjian',
    image: defaultImage,
    notes: ['Ambre', 'Vanille', 'Fève Tonka'],
    profile: 'oriental',
    gender: 'unisex'
  },
  {
    id: 'rec-oriental-14',
    name: 'Naxos',
    brand: 'Xerjoff',
    image: defaultImage,
    notes: ['Miel', 'Tabac', 'Lavande'],
    profile: 'oriental',
    gender: 'unisex'
  },
  {
    id: 'rec-oriental-15',
    name: 'Herod',
    brand: 'Parfums de Marly',
    image: defaultImage,
    notes: ['Tabac', 'Vanille', 'Cannelle'],
    profile: 'oriental',
    gender: 'male'
  },

  // --- WOODY ---
  {
    id: 'rec-woody-1',
    name: 'Bleu de Chanel',
    brand: 'Chanel',
    image: defaultImage,
    notes: ['Agrumes', 'Menthe', 'Cèdre'],
    profile: 'woody',
    gender: 'male',
    siteProductId: '12'
  },
  {
    id: 'rec-woody-2',
    name: 'Terre d\'Hermès',
    brand: 'Hermès',
    image: defaultImage,
    notes: ['Orange', 'Poivre', 'Vétiver'],
    profile: 'woody',
    gender: 'male',
    siteProductId: '20'
  },
  {
    id: 'rec-woody-3',
    name: 'Bois d\'Argent',
    brand: 'Dior',
    image: defaultImage,
    notes: ['Iris', 'Encens', 'Musc'],
    profile: 'woody',
    gender: 'unisex',
    siteProductId: '23'
  },
  {
    id: 'rec-woody-4',
    name: 'Oud For Greatness',
    brand: 'Initio',
    image: defaultImage,
    notes: ['Oud', 'Safran', 'Muscade'],
    profile: 'woody',
    gender: 'unisex',
    siteProductId: '37'
  },
  {
    id: 'rec-woody-5',
    name: 'Ombré Leather',
    brand: 'Tom Ford',
    image: defaultImage,
    notes: ['Cuir', 'Cardamome', 'Jasmin'],
    profile: 'woody',
    gender: 'unisex',
    siteProductId: '30'
  },
  {
    id: 'rec-woody-6',
    name: 'Santal 33',
    brand: 'Le Labo',
    image: defaultImage,
    notes: ['Santal', 'Cèdre', 'Cardamome'],
    profile: 'woody',
    gender: 'unisex'
  },
  {
    id: 'rec-woody-7',
    name: 'Fahrenheit',
    brand: 'Dior',
    image: defaultImage,
    notes: ['Mandarine', 'Violette', 'Cuir'],
    profile: 'woody',
    gender: 'male'
  },
  {
    id: 'rec-woody-8',
    name: 'Boss Bottled',
    brand: 'Hugo Boss',
    image: defaultImage,
    notes: ['Pomme', 'Cannelle', 'Bois'],
    profile: 'woody',
    gender: 'male'
  },
  {
    id: 'rec-woody-9',
    name: 'Encre Noire',
    brand: 'Lalique',
    image: defaultImage,
    notes: ['Cyprès', 'Vétiver', 'Musc'],
    profile: 'woody',
    gender: 'male'
  },
  {
    id: 'rec-woody-10',
    name: 'Wonderwood',
    brand: 'Comme des Garçons',
    image: defaultImage,
    notes: ['Poivre', 'Cèdre', 'Santal'],
    profile: 'woody',
    gender: 'unisex'
  },
  {
    id: 'rec-woody-11',
    name: 'Tam Dao',
    brand: 'Diptyque',
    image: defaultImage,
    notes: ['Santal', 'Cèdre', 'Cyprès'],
    profile: 'woody',
    gender: 'unisex'
  },
  {
    id: 'rec-woody-12',
    name: 'Gypsy Water',
    brand: 'Byredo',
    image: defaultImage,
    notes: ['Genévrier', 'Citron', 'Vanille'],
    profile: 'woody',
    gender: 'unisex'
  },
  {
    id: 'rec-woody-13',
    name: 'Santal Blush',
    brand: 'Tom Ford',
    image: defaultImage,
    notes: ['Santal', 'Épices', 'Ylang-Ylang'],
    profile: 'woody',
    gender: 'female'
  },
  {
    id: 'rec-woody-14',
    name: 'Oud Wood',
    brand: 'Tom Ford',
    image: defaultImage,
    notes: ['Oud', 'Bois de Rose', 'Cardamome'],
    profile: 'woody',
    gender: 'unisex'
  },
  {
    id: 'rec-woody-15',
    name: 'Mojave Ghost',
    brand: 'Byredo',
    image: defaultImage,
    notes: ['Sapotille', 'Magnolia', 'Cèdre'],
    profile: 'woody',
    gender: 'unisex'
  }
];
