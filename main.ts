import express from "npm:express"
import { join } from "jsr:@std/path/join";

const PORT = 7678;

function main(){
    console.log("Creating express server");
    const app = express();
    app.use(express.static(join(Deno.cwd(), "public/assets")));

    app.get("/", function (_: Request, res: Response) {
       res.sendFile(join(Deno.cwd(), "public/index.html"))
    })

    app.listen(PORT);
    console.log(`Listening on http://localhost:${PORT}`)
}

main();