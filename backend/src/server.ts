import fastify from "fastify";
import { appRouter } from "./http/router";

const app = fastify()

app.register(appRouter)

app.listen({
    port: 8080
}).then(server => { console.log(`HTTP server running at ${server}`) })
