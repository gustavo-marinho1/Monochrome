import 'dotenv/config';
import server from "./server.js";
import { createTableUser } from './modules/user/user.services.js';
import { createRefreshTable } from './modules/auth/auth.services.js';

async function start() {
  try {
    await createTableUser();
    await createRefreshTable();

    server.listen({
      port: 3001,
      host: "0.0.0.0"
    }, () => {
      console.log("Server running");
    });
  }
  catch (err) {
    console.error("Error starting server: ", err);
    process.exit(1);
  }
}

start();