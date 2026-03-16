import pool from "../../config/db.js";
import type { FilterProducts } from "./products.models.js";

const getProducts = async (filters: FilterProducts) => {
  const { page, search, color, sort } = filters;

  const limit = 10;
  const offset = (page - 1) * limit;

  const conditions: string[] = [];
  const values: (string | number)[] = [];
  let paramIndex = 1;

  if (search) {
    conditions.push(`name ILIKE $${paramIndex}`);
    values.push(`%${search}%`);
    paramIndex++;
  }

  if (color) {
    conditions.push(`color = $${paramIndex}`);
    values.push(color);
    paramIndex++;
  }

  const whereClause = conditions.length > 0
    ? `WHERE ${conditions.join(' AND ')}`
    : '';

  const sortOptions: Record<string, string> = {
    price_asc:  'ORDER BY price ASC',
    price_desc: 'ORDER BY price DESC',
  };
  const orderClause = sort ? sortOptions[sort] : 'ORDER BY id ASC';

  values.push(limit, offset);

  const query = `
    SELECT * FROM products
    ${whereClause}
    ${orderClause}
    LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
  `;

  const { rows } = await pool.query(query, values);
  return rows;
};

async function createTableProducts() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id          UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
      name        VARCHAR(255)   NOT NULL,
      description TEXT,
      category    VARCHAR(255)   NOT NULL,
      color       VARCHAR(100)   NOT NULL,
      images      TEXT[]         NOT NULL DEFAULT ARRAY[]::TEXT[],
      price       DECIMAL(10, 2) NOT NULL,
      stock       INT            NOT NULL DEFAULT 0,
      created_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export { createTableProducts, getProducts };