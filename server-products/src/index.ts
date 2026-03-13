import { createTableOrderItems } from "./modules/order_items/items.services.js";
import { createTableOrder } from "./modules/orders/orders.services.js";
import { createTableProducts } from "./modules/products/products.services.js";
import server from "./server.js";

async function start() {
  try {
    await createTableProducts();
    await createTableOrder();
    await createTableOrderItems();

    server.listen(3002, () => {
      console.log("Products server is running on port 3002");
    });

  } catch (error) {
    console.error("Error starting server: ", error);
    process.exit(1);
  }
}

start();