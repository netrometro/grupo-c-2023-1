import fastify from "fastify";
import { appRouter } from "./http/router";
import { ZodError } from "zod";

const app = fastify()

app.register(appRouter)

app.setErrorHandler((error, _, res) => {
    if (error instanceof ZodError) {
      return res
        .status(422)
        .send({ message: 'Validation error.', issues: error.format() })
    }

    console.log(error)

    return res.status(500).send({ message: 'Internal server error.' })
});

app.listen({
    port: 8080
}).then(server => { console.log(`HTTP server running at ${server}`) });
