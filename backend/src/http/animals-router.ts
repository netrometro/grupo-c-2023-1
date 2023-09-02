import { FastifyInstance } from "fastify";
import { testRoute } from "./controllers/test-route";
import { findAllAnimalController } from "./controllers/animals/find-all-animal-controller";
import { findByIdAnimalController } from "./controllers/animals/find-by-id-animal-controller";
import { createAnimalController } from "./controllers/animals/create-animal-controller";

export async function animalsRouter(app: FastifyInstance) {
    app.get('/', testRoute);

    app.get('/v1/animals', findAllAnimalController);

    app.get('/v1/animals/:id', findByIdAnimalController);

    app.post('/v2/animals', createAnimalController);
}
