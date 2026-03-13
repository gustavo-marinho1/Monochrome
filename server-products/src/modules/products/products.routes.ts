import Express from "express";
import pool from "../../config/db.js";
import { getProducts } from "./products.services.js";
import type { FilterProducts } from "./products.models.js";

const router = Express.Router();

router.get("/", async (req, res) => {
  try {
    const filters: FilterProducts = {
      page: Number(req.query.page) || 1,
      search: req.query.search ? String(req.query.search) : null,
      color: req.query.color ? String(req.query.color) : null,
      sort: req.query.sort === "price_asc" && "price_asc" || req.query.sort === "price_desc" && "price_desc" || null,
    }

    const data = await getProducts(filters);

    res.status(200).json({
      message: "Get all products",
      data: data.map((product: any) => (product))
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      name, description, category, colors, imagesByColor, price, stock
    } = req.body;

    const data = await pool.query("INSERT INTO products (name, description, category, colors, images_by_color, price, stock) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, name", [
      name, description, category, colors, imagesByColor, price, stock
    ]);

    res.status(200).json({
      message: "Insert new product",
      data: data.rows[0]
    });
  } catch (error: Error | any) {
    res.status(500).json({
      message: error.message,
      data: undefined
    });
  }
});

export default router;