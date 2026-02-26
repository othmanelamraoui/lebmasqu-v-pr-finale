import { Product } from '../data/products';

export type Collection = 'classique' | 'niche' | 'privee';

export const getCollection = (product: Product): Collection => {
  const name = product.name.toLowerCase();
  
  // Collection Privée Logic
  if (
    (name.includes('dior') && (name.includes('purple oud') || name.includes('new look') || name.includes('gris') || name.includes('ambre') || name.includes('bois d\'argent') || name.includes('lucky') || name.includes('sakura') || name.includes('rouge trafalgar') || name.includes('oud ispahan') || name.includes('eden-roc') || name.includes('vanilla diorama') || name.includes('tobacolor') || name.includes('holy peony') || name.includes('la colle noire') || name.includes('jasmin des anges') || name.includes('balade sauvage') || name.includes('cologne blanche') || name.includes('eau noire'))) ||
    (name.includes('chanel') && (name.includes('le lion') || name.includes('sycomore') || name.includes('coromandel') || name.includes('beige') || name.includes('gardenia') || name.includes('1957') || name.includes('boy') || name.includes('cuir de russie') || name.includes('bois des iles') || name.includes('31 rue cambon') || name.includes('bel respiro') || name.includes('la pausa') || name.includes('no 22') || name.includes('jersey') || name.includes('misia') || name.includes('1932'))) ||
    (name.includes('tom ford') && (name.includes('bois marocain') || name.includes('tobacco vanille') || name.includes('oud wood') || name.includes('tuscan leather') || name.includes('neroli portofino') || name.includes('lost cherry') || name.includes('bitter peach') || name.includes('rose prick') || name.includes('fucking fabulous') || name.includes('soleil blanc') || name.includes('white suede') || name.includes('jasmin rouge') || name.includes('santal blush') || name.includes('ebene fume') || name.includes('cherry smoke') || name.includes('electric cherry'))) ||
    (name.includes('armani') && (name.includes('rouge malachite') || name.includes('vert malachite') || name.includes('rose d\'arabie') || name.includes('oud royal') || name.includes('cuir amethyste') || name.includes('bois d\'encens') || name.includes('myrrhe imperiale') || name.includes('musc shamal') || name.includes('sable nuit') || name.includes('bleu turquoise') || name.includes('bleu lazuli') || name.includes('iris celadon') || name.includes('pierre de lune'))) ||
    (name.includes('yves saint laurent') && (name.includes('baby cat') || name.includes('babycat') || name.includes('tuxedo') || name.includes('caban') || name.includes('blouse') || name.includes('saharienne') || name.includes('trench') || name.includes('caftan') || name.includes('velours') || name.includes('grain de poudre') || name.includes('rouge velours') || name.includes('capeline') || name.includes('jumpsuit') || name.includes('lavalliere'))) ||
    (name.includes('guerlain') && (name.includes('l\'art & la matière') || name.includes('spiritueuse double vanille') || name.includes('cuir beluga') || name.includes('angelique noire') || name.includes('rose chérie') || name.includes('santale royal')))
  ) {
    return 'privee';
  }

  // Niche Logic
  if (
    name.includes('francis kurkdjian') ||
    name.includes('initio') ||
    name.includes('kilian') ||
    name.includes('nasomatto') ||
    name.includes('jo malone') ||
    name.includes('kayali') ||
    name.includes('maison crivelli') ||
    name.includes('giardini di toscana') ||
    name.includes('penhaligon') ||
    name.includes('creed') ||
    name.includes('lattafa') ||
    name.includes('marly') ||
    name.includes('kajal') ||
    name.includes('bdk') ||
    name.includes('byredo') ||
    name.includes('escentric molecules') ||
    name.includes('essential parfums') ||
    name.includes('xerjoff') ||
    name.includes('gissah') ||
    name.includes('frederic malle') ||
    name.includes('mancera') ||
    name.includes('montale') ||
    name.includes('memo paris') ||
    name.includes('diptyque') ||
    name.includes('le labo') ||
    name.includes('amouage') ||
    name.includes('roja') ||
    name.includes('tiziana terenzi') ||
    name.includes('nishane') ||
    name.includes('thameen') ||
    name.includes('stephane humbert lucas') ||
    name.includes('fragrance du bois') ||
    name.includes('lorenzo pazzaglia') ||
    name.includes('gritti') ||
    name.includes('goldfield & banks') ||
    name.includes('matiere premiere') ||
    name.includes('obvious') ||
    name.includes('juliette has a gun') ||
    name.includes('zarkoperfume') ||
    name.includes('vilhelm parfumerie') ||
    name.includes('la-brisa')
  ) {
    return 'niche';
  }

  // Default to Classique
  return 'classique';
};

export const getCollectionLabel = (collection: string) => {
  switch (collection) {
    case 'classique': return 'Les Classiques';
    case 'niche': return 'Niches';
    case 'privee': return 'Collections Privées';
    case 'niche-privee': return 'Niches & Collections Privées';
    default: return 'Nos Parfums';
  }
};
