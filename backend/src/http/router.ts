import { FastifyInstance } from "fastify";
import { testRoute } from "./controllers/test-route";

export async function appRouter(app: FastifyInstance) {
    app.get('/', testRoute)
}
