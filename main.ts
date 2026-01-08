import express from "npm:express"
import {initRoutes} from "./handlers/routes.ts";

const PORT = 7678;

async function main(){
    console.log("Creating express server");
    const app = express();
    await initRoutes(app, "routes");

    app.listen(PORT);
    console.log(`Listening on http://localhost:${PORT}`)
}

main();