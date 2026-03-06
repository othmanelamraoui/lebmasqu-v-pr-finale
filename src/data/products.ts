export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  notes: string[];
  gender: 'male' | 'female' | 'unisex';
  profile?: 'fresh' | 'floral' | 'oriental' | 'woody' | 'fruity';
}

const defaultImages = [
  'https://drive.google.com/thumbnail?id=1JhT_mXN6tC9OIcJ5uldDErLLOUy_MMUA&sz=w1000',
];

const getRandomImage = (index: number) => defaultImages[0];

export const products: Product[] = [
  // Classiques Femmes
  {
    id: '1',
    name: 'Libre - Yves Saint Laurent',
    description: 'La version Eau de Parfum ou Intense : un hit absolu',
    price: 50,
    image: getRandomImage(0),
    category: 'Eau de Parfum',
    notes: ['Lavande', 'Fleur d\'Oranger', 'Vanille'],
    gender: 'female',
    profile: 'floral'
  },
  {
    id: '2',
    name: 'L\'Interdit - Givenchy',
    description: 'Très élégant, énorme succès au Maroc',
    price: 69,
    image: getRandomImage(1),
    category: 'Eau de Parfum',
    notes: ['Fleur Blanche', 'Tubéreuse', 'Patchouli'],
    gender: 'female',
    profile: 'floral'
  },
  {
    id: '3',
    name: 'Coco Mademoiselle - Chanel',
    description: 'Le classique indémodable',
    price: 69,
    image: getRandomImage(2),
    category: 'Eau de Parfum',
    notes: ['Orange', 'Rose', 'Patchouli'],
    gender: 'female',
    profile: 'oriental'
  },
  {
    id: '4',
    name: 'Good Girl - Carolina Herrera',
    description: 'Le fameux parfum en forme de talon, très apprécié',
    price: 69,
    image: getRandomImage(3),
    category: 'Eau de Parfum',
    notes: ['Amande', 'Tubéreuse', 'Cacao'],
    gender: 'female',
    profile: 'oriental'
  },
  {
    id: '5',
    name: 'Black Opium - Yves Saint Laurent',
    description: 'Sucré, café/vanille, parfait pour le soir',
    price: 69,
    image: getRandomImage(4),
    category: 'Eau de Parfum',
    notes: ['Café', 'Vanille', 'Fleur Blanche'],
    gender: 'female',
    profile: 'oriental'
  },
  {
    id: '6',
    name: 'La Vie Est Belle - Lancôme',
    description: 'Un des parfums les plus vendus au monde',
    price: 69,
    image: getRandomImage(5),
    category: 'Eau de Parfum',
    notes: ['Iris', 'Praline', 'Vanille'],
    gender: 'female',
    profile: 'oriental'
  },
  {
    id: '7',
    name: 'Paradoxe - Prada',
    description: 'La grande tendance actuelle chez les jeunes femmes',
    price: 69,
    image: getRandomImage(6),
    category: 'Eau de Parfum',
    notes: ['Poire', 'Ambre', 'Musc Blanc'],
    gender: 'female',
    profile: 'floral'
  },
  {
    id: '8',
    name: 'My Way - Giorgio Armani',
    description: 'Floral et pétillant, très demandé',
    price: 69,
    image: getRandomImage(7),
    category: 'Eau de Parfum',
    notes: ['Fleur d\'Oranger', 'Tubéreuse', 'Vanille'],
    gender: 'female',
    profile: 'floral'
  },
  {
    id: '9',
    name: 'Scandal - Jean Paul Gaultier',
    description: 'Très sucré, miel puissant',
    price: 69,
    image: getRandomImage(8),
    category: 'Eau de Parfum',
    notes: ['Miel', 'Gardénia', 'Patchouli'],
    gender: 'female',
    profile: 'oriental'
  },
  {
    id: '10',
    name: 'J\'adore - Dior',
    description: 'Une demande constante, surtout chez les 30 ans et +',
    price: 69,
    image: getRandomImage(9),
    category: 'Eau de Parfum',
    notes: ['Ylang-Ylang', 'Rose Damascena', 'Jasmin'],
    gender: 'female',
    profile: 'floral'
  },

  // Classiques Hommes
  {
    id: '11',
    name: 'Sauvage - Dior',
    description: 'Prenez l\'Eau de Parfum. C\'est le roi incontesté, il se vend tout seul',
    price: 69,
    image: getRandomImage(10),
    category: 'Eau de Parfum',
    notes: ['Bergamote', 'Poivre', 'Ambroxan'],
    gender: 'male',
    profile: 'fresh'
  },
  {
    id: '12',
    name: 'Bleu de Chanel - Chanel',
    description: 'Eau de Parfum. L\'élégance absolue',
    price: 69,
    image: getRandomImage(11),
    category: 'Eau de Parfum',
    notes: ['Agrumes', 'Menthe', 'Bois de Cèdre'],
    gender: 'male',
    profile: 'woody'
  },
  {
    id: '13',
    name: 'Y - Yves Saint Laurent',
    description: 'Eau de Parfum. Très puissant et frais, un énorme best-seller',
    price: 69,
    image: getRandomImage(12),
    category: 'Eau de Parfum',
    notes: ['Pomme', 'Sauge', 'Bois Ambré'],
    gender: 'male',
    profile: 'fresh'
  },
  {
    id: '14',
    name: '1 Million - Paco Rabanne',
    description: 'Ou 1 Million Elixir. Toujours très demandé',
    price: 69,
    image: getRandomImage(13),
    category: 'Eau de Parfum',
    notes: ['Mandarine', 'Cannelle', 'Cuir'],
    gender: 'male',
    profile: 'oriental'
  },
  {
    id: '15',
    name: 'Le Mâle Le Parfum - Jean Paul Gaultier',
    description: 'Ou "Le Beau", excellentes ventes',
    price: 69,
    image: getRandomImage(14),
    category: 'Eau de Parfum',
    notes: ['Cardamome', 'Lavande', 'Vanille'],
    gender: 'male',
    profile: 'oriental'
  },
  {
    id: '16',
    name: 'Eros - Versace',
    description: 'Parfum de soirée très apprécié par les jeunes',
    price: 69,
    image: getRandomImage(15),
    category: 'Eau de Parfum',
    notes: ['Menthe', 'Pomme', 'Vanille'],
    gender: 'male',
    profile: 'fresh'
  },
  {
    id: '17',
    name: 'The Most Wanted - Azzaro',
    description: 'Très tendance, sucré et masculin',
    price: 69,
    image: getRandomImage(16),
    category: 'Eau de Parfum',
    notes: ['Cardamome', 'Caramel', 'Bois Ambré'],
    gender: 'male',
    profile: 'oriental'
  },
  {
    id: '18',
    name: 'Acqua Di Giò - Giorgio Armani',
    description: 'Parfum ou Profumo. Le parfum frais par excellence',
    price: 69,
    image: getRandomImage(17),
    category: 'Eau de Parfum',
    notes: ['Notes Marines', 'Bergamote', 'Romarin'],
    gender: 'male',
    profile: 'fresh'
  },
  {
    id: '19',
    name: 'Invictus - Paco Rabanne',
    description: 'Frais, sportif, très grand public',
    price: 69,
    image: getRandomImage(18),
    category: 'Eau de Parfum',
    notes: ['Pamplemousse', 'Notes Marines', 'Bois de Gaïac'],
    gender: 'male',
    profile: 'fresh'
  },
  {
    id: '20',
    name: 'Terre d\'Hermès - Hermès',
    description: 'Pour une clientèle masculine un peu plus mature, 30 ans et +',
    price: 69,
    image: getRandomImage(19),
    category: 'Eau de Parfum',
    notes: ['Orange', 'Poivre', 'Vétiver'],
    gender: 'male',
    profile: 'woody'
  },

  // Niches et Collections Privées
  {
    id: '21',
    name: 'Baccarat Rouge 540 - Maison Francis Kurkdjian',
    description: 'Mixte. Le parfum le plus copié et désiré au monde',
    price: 69,
    image: getRandomImage(20),
    category: 'Eau de Parfum',
    notes: ['Safran', 'Jasmin', 'Bois Ambré'],
    gender: 'unisex',
    profile: 'oriental'
  },
  {
    id: '22',
    name: 'Ombre Nomade - Louis Vuitton',
    description: 'Mixte. Oud et Framboise. Une folie au Maroc, tenue monstrueuse',
    price: 69,
    image: getRandomImage(21),
    category: 'Eau de Parfum',
    notes: ['Oud', 'Framboise', 'Encens'],
    gender: 'unisex',
    profile: 'oriental'
  },
  {
    id: '23',
    name: 'Bois d\'Argent - Dior',
    description: 'Mixte. Doux, iris, encens. Un classique très chic',
    price: 69,
    image: getRandomImage(22),
    category: 'Eau de Parfum',
    notes: ['Iris', 'Encens', 'Musc'],
    gender: 'unisex',
    profile: 'woody'
  },
  {
    id: '24',
    name: 'Gris Dior - Dior',
    description: 'Mixte. Floral et boisé, très "Old Money"',
    price: 69,
    image: getRandomImage(23),
    category: 'Eau de Parfum',
    notes: ['Rose', 'Mousse de Chêne', 'Bergamote'],
    gender: 'unisex',
    profile: 'floral'
  },
  {
    id: '25',
    name: 'Aventus - Creed',
    description: 'Homme. Le roi de la parfumerie de niche',
    price: 69,
    image: getRandomImage(24),
    category: 'Eau de Parfum',
    notes: ['Ananas', 'Bouleau', 'Musc'],
    gender: 'male',
    profile: 'fresh'
  },
  {
    id: '26',
    name: 'Red Tobacco - Mancera',
    description: 'Mixte. Tabac, épices. Ultra puissant, les Marocains en raffolent',
    price: 69,
    image: getRandomImage(25),
    category: 'Eau de Parfum',
    notes: ['Tabac', 'Cannelle', 'Vanille'],
    gender: 'unisex',
    profile: 'oriental'
  },
  {
    id: '27',
    name: 'Arabians Tonka - Montale',
    description: 'Mixte. Sucre, safran, oud. Tenue incroyable, best-seller garanti',
    price: 69,
    image: getRandomImage(26),
    category: 'Eau de Parfum',
    notes: ['Fève Tonka', 'Safran', 'Oud'],
    gender: 'unisex',
    profile: 'oriental'
  },
  {
    id: '28',
    name: 'Erba Pura - Xerjoff',
    description: 'Mixte. Corbeille de fruits vanillée, sillage nucléaire',
    price: 69,
    image: getRandomImage(27),
    category: 'Eau de Parfum',
    notes: ['Fruits Exotiques', 'Musc', 'Vanille'],
    gender: 'unisex',
    profile: 'fruity'
  },
  {
    id: '29',
    name: 'Kirke - Tiziana Terenzi',
    description: 'Mixte. Très similaire à Erba Pura, fruité et musqué',
    price: 69,
    image: getRandomImage(28),
    category: 'Eau de Parfum',
    notes: ['Fruit de la Passion', 'Pêche', 'Musc'],
    gender: 'unisex',
    profile: 'fruity'
  },
  {
    id: '30',
    name: 'Ombré Leather - Tom Ford',
    description: 'Homme/Mixte. Cuir pur. Très demandé',
    price: 69,
    image: getRandomImage(29),
    category: 'Eau de Parfum',
    notes: ['Cuir', 'Cardamome', 'Jasmin'],
    gender: 'unisex',
    profile: 'woody'
  },
  {
    id: '31',
    name: 'Tobacco Vanille - Tom Ford',
    description: 'Mixte. Épicé, réconfortant',
    price: 69,
    image: getRandomImage(30),
    category: 'Eau de Parfum',
    notes: ['Feuille de Tabac', 'Vanille', 'Épices'],
    gender: 'unisex',
    profile: 'oriental'
  },
  {
    id: '32',
    name: 'Delina - Parfums de Marly',
    description: 'Femme. Rose et litchi. La niche féminine par excellence',
    price: 69,
    image: getRandomImage(31),
    category: 'Eau de Parfum',
    notes: ['Litchi', 'Rose Turque', 'Rhubarbe'],
    gender: 'female',
    profile: 'floral'
  },
  {
    id: '33',
    name: 'Layton - Parfums de Marly',
    description: 'Homme. Pomme, vanille, épices, très complimenté',
    price: 69,
    image: getRandomImage(32),
    category: 'Eau de Parfum',
    notes: ['Pomme', 'Vanille', 'Cardamome'],
    gender: 'male',
    profile: 'oriental'
  },
  {
    id: '34',
    name: 'Angels\' Share - Kilian',
    description: 'Mixte. Cognac, cannelle. Hyper tendance en hiver',
    price: 69,
    image: getRandomImage(33),
    category: 'Eau de Parfum',
    notes: ['Cognac', 'Cannelle', 'Fève Tonka'],
    gender: 'unisex',
    profile: 'oriental'
  },
  {
    id: '35',
    name: 'Tuxedo - Yves Saint Laurent',
    description: 'Mixte. Patchouli épicé, la star de la collection privée YSL',
    price: 69,
    image: getRandomImage(34),
    category: 'Eau de Parfum',
    notes: ['Patchouli', 'Poivre Noir', 'Ambre Gris'],
    gender: 'unisex',
    profile: 'oriental'
  },
  {
    id: '36',
    name: 'Santal Royal - Guerlain',
    description: 'Mixte. Très oriental, correspond parfaitement au goût local',
    price: 69,
    image: getRandomImage(35),
    category: 'Eau de Parfum',
    notes: ['Santal', 'Oud', 'Rose'],
    gender: 'unisex',
    profile: 'oriental'
  },
  {
    id: '37',
    name: 'Oud For Greatness - Initio',
    description: 'Mixte. Oud propre, majestueux et puissant',
    price: 69,
    image: getRandomImage(36),
    category: 'Eau de Parfum',
    notes: ['Oud Naturel', 'Safran', 'Muscade'],
    gender: 'unisex',
    profile: 'woody'
  },
  {
    id: '38',
    name: 'Cedrat Boise - Mancera',
    description: 'Homme. Souvent comparé à Aventus, fruité et boisé',
    price: 69,
    image: getRandomImage(37),
    category: 'Eau de Parfum',
    notes: ['Citron', 'Cassis', 'Bois de Cèdre'],
    gender: 'male',
    profile: 'fresh'
  },
  {
    id: '39',
    name: 'Intense Cafe - Montale',
    description: 'Mixte. Rose et café vanillé. Toujours un succès',
    price: 69,
    image: getRandomImage(38),
    category: 'Eau de Parfum',
    notes: ['Rose', 'Café', 'Vanille'],
    gender: 'unisex',
    profile: 'oriental'
  },
  {
    id: '40',
    name: 'Black Orchid - Tom Ford',
    description: 'Mixte/Femme. Truffe, chocolat, très dark et sensuel',
    price: 69,
    image: getRandomImage(39),
    category: 'Eau de Parfum',
    notes: ['Truffe Noire', 'Orchidée Noire', 'Patchouli'],
    gender: 'female',
    profile: 'oriental'
  }
];
