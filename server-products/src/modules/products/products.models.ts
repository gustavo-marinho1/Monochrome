interface ImagesByColor {
  [color: string]: string[];
}

interface ProductCreate {
  name: string;
  description?: string;
  category: string;
  colors: string[];
  imagesByColor: ImagesByColor;
  price: number;
  stock: number;
}

interface Product extends ProductCreate {
  id: string;
  created_at: Date;
}

interface FilterProducts {
  page: number,
  search: string | null,
  color: string | null,
  sort: "price_asc" | "price_desc" | null
}

export type { Product, ProductCreate, ImagesByColor, FilterProducts };

/*
{
  "name": "Oversized T-shirt",
  "description": "T-shirt",
  "category": "T-shirt",
  "colors": ["black", "white"],
  "imagesByColor": {
    "black": [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg"
    ],
    "white": [
      "https://example.com/image3.jpg",
      "https://example.com/image4.jpg"
    ]
  },
  "price": 250.65,
  "stock": 150
}

INSERT INTO products (name, description, category, colors, images_by_color, price, stock) 
VALUES ($1, $2, $3, $4, $5, $6, $7) 
RETURNING *;
*/