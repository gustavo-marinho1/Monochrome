import Express from "express";
import cors from "cors";
import type { JWTUser } from "./modules/auth/auth.models.js";
import ProductsRouter from "./modules/products/products.routes.js";

const server = Express();

declare module "express" {
  export interface FastifyRequest {
    user?: JWTUser
  }
}

server.use(Express.json());

server.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD']
}));

server.use("/products", ProductsRouter);

export default server;