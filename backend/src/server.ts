import fastify from "fastify";
import { appRouter } from "./http/router";
import { ZodError } from "zod";
import cors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import { env } from "./env";

const app = fastify()

app.register(fastifyMultipart)

app.register(appRouter)

app.register(cors, { origin: true });

app.setErrorHandler((error, _, res) => {
    if (error instanceof ZodError) {
      return res
        .status(422)
        .send({ message: 'Validation error.', issues: error.format() })
    }

    if (error.code === "FST_INVALID_MULTIPART_CONTENT_TYPE") {
        return res.status(406).send({ message: 'Please, use a form-data multipart.' })
    }

    console.log(error)

    return res.status(500).send({ message: 'Internal server error.' })
});

app.listen({
    host: "0.0.0.0"
}).then(server => { console.log(`HTTP server running at ${server}`) });
