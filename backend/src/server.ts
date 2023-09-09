import fastify from "fastify";
import { animalsRouter } from "./http/animals-router";
import { ZodError } from "zod";
import jwt from '@fastify/jwt';
import cors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import { env } from "./env";
import { postsRouter } from "./http/posts-routes";
import { authRoutes } from "./http/auth-router";

const app = fastify()

app.register(fastifyMultipart, {
    limits: {
        fileSize: 100 ** 10
    }
})

app.register(jwt, {
    secret: "001d75a5-ecf3-4b98-aa32-2073a6cf1838"
});

app.register(authRoutes, {
    prefix: "api/"
})

app.register(animalsRouter, {
    prefix: "api/"
})

app.register(postsRouter, {
    prefix: "api/"
})

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
    host: "0.0.0.0",
    port: env.PORT
}).then(server => { console.log(`HTTP server running at ${server}`) });
