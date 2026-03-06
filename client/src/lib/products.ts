type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: 'Classic Black Leather Jacket',
    price: 299,
    category: 'Jackets',
    image: 'https://images.unsplash.com/photo-1696451203065-477f3a08e8cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGphY2tldCUyMGZhc2hpb24lMjBtb2RlbHxlbnwxfHx8fDE3NzIzMzU4NDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    name: 'Essential White T-Shirt',
    price: 45,
    category: 'Shirts',
    image: 'https://images.unsplash.com/photo-1739001411231-4fc0f4140259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHRzaGlydCUyMG1pbmltYWxpc3R8ZW58MXx8fHwxNzcyMzM1ODQyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    name: 'Slim Fit Dark Jeans',
    price: 89,
    category: 'Jeans',
    image: 'https://images.unsplash.com/photo-1741939483735-6923b430ca89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZWFucyUyMGRlbmltJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzcyMjQzNDIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 4,
    name: 'Premium Leather Sneakers',
    price: 165,
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1622760807301-4d2351a5a942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VycyUyMHNob2VzJTIwcHJvZHVjdHxlbnwxfHx8fDE3NzIzMzU4NDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 5,
    name: 'Oversized Street Hoodie',
    price: 125,
    category: 'Hoodies',
    image: 'https://images.unsplash.com/photo-1711387718409-a05f62a3dc39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob29kaWUlMjBzdHJlZXR3ZWFyJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzcyMzM1ODQzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 6,
    name: 'Elegant Evening Dress',
    price: 245,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1760083545495-b297b1690672?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmVzcyUyMGZhc2hpb24lMjBlbGVnYW50fGVufDF8fHx8MTc3MjMzNTg0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 7,
    name: 'Winter Wool Coat',
    price: 389,
    category: 'Coats',
    image: 'https://images.unsplash.com/photo-1768134152610-27355e256513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2F0JTIwd2ludGVyJTIwZmFzaGlvbnxlbnwxfHx8fDE3NzIzMzU4NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 8,
    name: 'Casual Summer Shorts',
    price: 68,
    category: 'Shorts',
    image: 'https://images.unsplash.com/photo-1617817435745-1eb486e641a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9ydHMlMjBzdW1tZXIlMjBjbG90aGluZ3xlbnwxfHx8fDE3NzIzMzU4NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export { products, type Product }