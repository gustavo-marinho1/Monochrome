interface ProductCreate {
  name: string;
  description?: string;
  category: string;
  color: string;
  images: string[];
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

export type { Product, ProductCreate, FilterProducts };

/*
{
  "name": "Oversized T-shirt",
  "description": "T-shirt",
  "category": "T-shirt",
  "color": "black",
  "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
  "price": 250.65,
  "stock": 150
}

INSERT INTO products (name, description, category, color, images, price, stock) 
VALUES ($1, $2, $3, $4, $5, $6, $7) 
RETURNING *;
*/