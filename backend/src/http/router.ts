import { FastifyInstance } from "fastify";
import { testRoute } from "./controllers/test-route";
import { findAllAnimalController } from "./controllers/find-all-animal-controller";
import { findByIdAnimalController } from "./controllers/find-by-id-animal-controller";

export async function appRouter(app: FastifyInstance) {
    app.get('/', testRoute);

    app.get('/animals', findAllAnimalController);

    app.get('/animals/:id', findByIdAnimalController);
    
}
