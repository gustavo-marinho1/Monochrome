import pool from "../../config/db.js";

async function createTableOrderItems() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS order_items (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      order_id UUID NOT NULL,
      product_id UUID NOT NULL,
      quantity INT NOT NULL CHECK (quantity > 0),
      unit_price DECIMAL(10, 2) NOT NULL,

      CONSTRAINT fk_order 
        FOREIGN KEY(order_id) 
        REFERENCES orders(id) 
        ON DELETE CASCADE,

      CONSTRAINT fk_product 
        FOREIGN KEY(product_id) 
        REFERENCES products(id) 
        ON DELETE RESTRICT
    );
  `);
}

export { createTableOrderItems };