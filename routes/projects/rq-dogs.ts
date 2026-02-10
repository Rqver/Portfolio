import {join} from "jsr:@std/path";
import express from "npm:express";

export default {
    url: '/projects/rq-dogs',
    type: 'GET',
    callback: async (_: express.Request, res: express.Response) => {
        res.sendFile(join(Deno.cwd(), "public/projects/rq-dogs.html"))
    }
}
