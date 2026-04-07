export type Gender = 'male' | 'female';

export interface OutfitStyle {
  id: string;
  name: string;
  description: string;
  category: string;
  gender: Gender;
  thumbnail: string;
}

export const OUTFIT_CATEGORIES = [
  'Casual',
  'Formal',
  'Wedding',
  'Party',
  'Traditional Pakistani'
];

export const OUTFIT_STYLES: OutfitStyle[] = [
  // Male - Casual
  {
    id: 'm-casual-1',
    name: 'White Tee & Jeans',
    description: 'A classic white t-shirt with blue denim jeans.',
    category: 'Casual',
    gender: 'male',
    thumbnail: 'https://picsum.photos/seed/m-casual-1/200/300'
  },
  {
    id: 'm-casual-2',
    name: 'Hoodie & Joggers',
    description: 'A cozy oversized hoodie with matching joggers.',
    category: 'Casual',
    gender: 'male',
    thumbnail: 'https://picsum.photos/seed/m-casual-2/200/300'
  },
  {
    id: 'm-casual-3',
    name: 'Flannel Shirt & Chinos',
    description: 'A red checkered flannel shirt with khaki chinos.',
    category: 'Casual',
    gender: 'male',
    thumbnail: 'https://picsum.photos/seed/m-casual-3/200/300'
  },
  {
    id: 'm-casual-4',
    name: 'Denim Jacket & Tee',
    description: 'A classic denim jacket over a plain black tee.',
    category: 'Casual',
    gender: 'male',
    thumbnail: 'https://picsum.photos/seed/m-casual-4/200/300'
  },

  // Male - Formal
  {
    id: 'm-formal-1',
    name: 'Navy Blue Suit',
    description: 'A sharp navy blue two-piece suit with a crisp white shirt and silk tie.',
    category: 'Formal',
    gender: 'male',
    thumbnail: 'https://picsum.photos/seed/m-formal-1/200/300'
  },
  {
    id: 'm-formal-2',
    name: 'Charcoal Grey Blazer',
    description: 'A charcoal grey blazer with a light blue shirt and dark trousers.',
    category: 'Formal',
    gender: 'male',
    thumbnail: 'https://picsum.photos/seed/m-formal-2/200/300'
  },
  {
    id: 'm-formal-3',
    name: 'Black Tuxedo',
    description: 'A classic black tuxedo with a bow tie for black-tie events.',
    category: 'Formal',
    gender: 'male',
    thumbnail: 'https://picsum.photos/seed/m-formal-3/200/300'
  },
  {
    id: 'm-formal-4',
    name: 'Beige Linen Suit',
    description: 'A light beige linen suit perfect for summer formal events.',
    category: 'Formal',
    gender: 'male',
    thumbnail: 'https://picsum.photos/seed/m-formal-4/200/300'
  },

  // Male - Traditional Pakistani
  {
    id: 'm-trad-1',
    name: 'Black Sherwani',
    description: 'A sophisticated black sherwani with intricate gold embroidery.',
    category: 'Traditional Pakistani',
    gender: 'male',
    thumbnail: 'https://picsum.photos/seed/m-trad-1/200/300'
  },
  {
    id: 'm-trad-2',
    name: 'White Shalwar Kameez',
    description: 'A classic white cotton shalwar kameez with a matching waist coat.',
    category: 'Traditional Pakistani',
    gender: 'male',
    thumbnail: 'https://picsum.photos/seed/m-trad-2/200/300'
  },
  {
    id: 'm-trad-3',
    name: 'Blue Kurta Pajama',
    description: 'A vibrant blue embroidered kurta with white pajama.',
    category: 'Traditional Pakistani',
    gender: 'male',
    thumbnail: 'https://picsum.photos/seed/m-trad-3/200/300'
  },
  {
    id: 'm-trad-4',
    name: 'Grey Peshawari Suit',
    description: 'A traditional grey suit with Peshawari chappals.',
    category: 'Traditional Pakistani',
    gender: 'male',
    thumbnail: 'https://picsum.photos/seed/m-trad-4/200/300'
  },

  // Male - Wedding
  {
    id: 'm-wedding-1',
    name: 'Royal Groom Sherwani',
    description: 'An ivory royal sherwani with maroon velvet shawl.',
    category: 'Wedding',
    gender: 'male',
    thumbnail: 'https://picsum.photos/seed/m-wedding-1/200/300'
  },
  {
    id: 'm-wedding-2',
    name: 'Golden Embroidered Suit',
    description: 'A golden suit with heavy embroidery for wedding guests.',
    category: 'Wedding',
    gender: 'male',
    thumbnail: 'https://picsum.photos/seed/m-wedding-2/200/300'
  },
  {
    id: 'm-wedding-3',
    name: 'Velvet Prince Coat',
    description: 'A deep blue velvet prince coat with slim-fit trousers.',
    category: 'Wedding',
    gender: 'male',
    thumbnail: 'https://picsum.photos/seed/m-wedding-3/200/300'
  },
  {
    id: 'm-wedding-4',
    name: 'Classic Black Suit',
    description: 'A timeless black suit with a white shirt and red tie.',
    category: 'Wedding',
    gender: 'male',
    thumbnail: 'https://picsum.photos/seed/m-wedding-4/200/300'
  },

  // Male - Party
  {
    id: 'm-party-1',
    name: 'Velvet Party Blazer',
    description: 'A luxurious burgundy velvet blazer with a black turtleneck.',
    category: 'Party',
    gender: 'male',
    thumbnail: 'https://picsum.photos/seed/m-party-1/200/300'
  },
  {
    id: 'm-party-2',
    name: 'Leather Jacket Look',
    description: 'A black leather jacket over a grey hoodie and ripped jeans.',
    category: 'Party',
    gender: 'male',
    thumbnail: 'https://picsum.photos/seed/m-party-2/200/300'
  },
  {
    id: 'm-party-3',
    name: 'Patterned Shirt & Slacks',
    description: 'A bold patterned silk shirt with black slim-fit slacks.',
    category: 'Party',
    gender: 'male',
    thumbnail: 'https://picsum.photos/seed/m-party-3/200/300'
  },
  {
    id: 'm-party-4',
    name: 'Sequin Party Jacket',
    description: 'A shimmering black sequin jacket for a night out.',
    category: 'Party',
    gender: 'male',
    thumbnail: 'https://picsum.photos/seed/m-party-4/200/300'
  },

  // Female - Casual
  {
    id: 'f-casual-1',
    name: 'Summer Floral Dress',
    description: 'A light, breezy floral print summer dress.',
    category: 'Casual',
    gender: 'female',
    thumbnail: 'https://picsum.photos/seed/f-casual-1/200/300'
  },
  {
    id: 'f-casual-2',
    name: 'High-Waist Jeans & Crop Top',
    description: 'Stylish high-waist blue jeans with a pastel-colored crop top.',
    category: 'Casual',
    gender: 'female',
    thumbnail: 'https://picsum.photos/seed/f-casual-2/200/300'
  },
  {
    id: 'f-casual-3',
    name: 'Oversized Sweater & Leggings',
    description: 'A comfy oversized knit sweater with black leggings.',
    category: 'Casual',
    gender: 'female',
    thumbnail: 'https://picsum.photos/seed/f-casual-3/200/300'
  },
  {
    id: 'f-casual-4',
    name: 'Boho Maxi Skirt',
    description: 'A colorful boho-style maxi skirt with a white tank top.',
    category: 'Casual',
    gender: 'female',
    thumbnail: 'https://picsum.photos/seed/f-casual-4/200/300'
  },

  // Female - Formal
  {
    id: 'f-formal-1',
    name: 'Pencil Skirt & Blouse',
    description: 'A professional black pencil skirt with a silk cream-colored blouse.',
    category: 'Formal',
    gender: 'female',
    thumbnail: 'https://picsum.photos/seed/f-formal-1/200/300'
  },
  {
    id: 'f-formal-2',
    name: 'Tailored Pantsuit',
    description: 'A modern emerald green tailored pantsuit with a white camisole.',
    category: 'Formal',
    gender: 'female',
    thumbnail: 'https://picsum.photos/seed/f-formal-2/200/300'
  },
  {
    id: 'f-formal-3',
    name: 'Little Black Dress',
    description: 'A classic knee-length black dress for formal dinners.',
    category: 'Formal',
    gender: 'female',
    thumbnail: 'https://picsum.photos/seed/f-formal-3/200/300'
  },
  {
    id: 'f-formal-4',
    name: 'Silk Wrap Dress',
    description: 'An elegant navy blue silk wrap dress.',
    category: 'Formal',
    gender: 'female',
    thumbnail: 'https://picsum.photos/seed/f-formal-4/200/300'
  },

  // Female - Traditional Pakistani
  {
    id: 'f-trad-1',
    name: 'Embroidered Anarkali',
    description: 'A stunning maroon Anarkali suit with heavy gold zari work.',
    category: 'Traditional Pakistani',
    gender: 'female',
    thumbnail: 'https://picsum.photos/seed/f-trad-1/200/300'
  },
  {
    id: 'f-trad-2',
    name: 'Pastel Shalwar Kameez',
    description: 'A delicate pastel pink lawn shalwar kameez with floral embroidery.',
    category: 'Traditional Pakistani',
    gender: 'female',
    thumbnail: 'https://picsum.photos/seed/f-trad-2/200/300'
  },
  {
    id: 'f-trad-3',
    name: 'Chiffon Saree',
    description: 'An elegant black chiffon saree with a sequined blouse.',
    category: 'Traditional Pakistani',
    gender: 'female',
    thumbnail: 'https://picsum.photos/seed/f-trad-3/200/300'
  },
  {
    id: 'f-trad-4',
    name: 'Gharara Suit',
    description: 'A traditional turquoise gharara suit with heavy embroidery.',
    category: 'Traditional Pakistani',
    gender: 'female',
    thumbnail: 'https://picsum.photos/seed/f-trad-4/200/300'
  },

  // Female - Wedding
  {
    id: 'f-wedding-1',
    name: 'Red Bridal Lehenga',
    description: 'A traditional deep red bridal lehenga with heavy gold embroidery.',
    category: 'Wedding',
    gender: 'female',
    thumbnail: 'https://picsum.photos/seed/f-wedding-1/200/300'
  },
  {
    id: 'f-wedding-2',
    name: 'Gold Tissue Saree',
    description: 'A luxurious gold tissue saree for wedding receptions.',
    category: 'Wedding',
    gender: 'female',
    thumbnail: 'https://picsum.photos/seed/f-wedding-2/200/300'
  },
  {
    id: 'f-wedding-3',
    name: 'White Bridal Gown',
    description: 'A stunning white lace bridal gown with a long train.',
    category: 'Wedding',
    gender: 'female',
    thumbnail: 'https://picsum.photos/seed/f-wedding-3/200/300'
  },
  {
    id: 'f-wedding-4',
    name: 'Silver Peplum Suit',
    description: 'A modern silver peplum suit with heavy stone work.',
    category: 'Wedding',
    gender: 'female',
    thumbnail: 'https://picsum.photos/seed/f-wedding-4/200/300'
  },

  // Female - Party
  {
    id: 'f-party-1',
    name: 'Sequin Cocktail Dress',
    description: 'A shimmering silver sequin cocktail dress.',
    category: 'Party',
    gender: 'female',
    thumbnail: 'https://picsum.photos/seed/f-party-1/200/300'
  },
  {
    id: 'f-party-2',
    name: 'Red Off-Shoulder Gown',
    description: 'A bold red off-shoulder floor-length gown.',
    category: 'Party',
    gender: 'female',
    thumbnail: 'https://picsum.photos/seed/f-party-2/200/300'
  },
  {
    id: 'f-party-3',
    name: 'Glitter Jumpsuit',
    description: 'A stylish black glitter jumpsuit for a party night.',
    category: 'Party',
    gender: 'female',
    thumbnail: 'https://picsum.photos/seed/f-party-3/200/300'
  },
  {
    id: 'f-party-4',
    name: 'Velvet Mini Dress',
    description: 'A chic emerald green velvet mini dress.',
    category: 'Party',
    gender: 'female',
    thumbnail: 'https://picsum.photos/seed/f-party-4/200/300'
  }
];
