import { FastifyInstance } from "fastify";
import { testRoute } from "./controllers/test-route";
import { findAllAnimalController } from "./controllers/find-all-animals-controller";
import { findByIdAnimalController } from "./controllers/find-by-id-animal-controller";
import { createAnimalController } from "./controllers/create-animal-controller";
import { findAllPostsController } from "./controllers/find-all-posts-controller";
import { findByIdPostController } from "./controllers/find-by-id-post-controller";
import { filterManyByTitleController } from "./controllers/filter-many-by-title-controller";

export async function appRouter(app: FastifyInstance) {
    app.get('/', testRoute);

    app.get('/animals', findAllAnimalController);

    app.get('/animals/:id', findByIdAnimalController);

    app.post('/animals', createAnimalController);

    app.get('/posts', findAllPostsController);

    app.get('/posts/:id', findByIdPostController);

    app.get<{Querystring: {title: string}}>('/posts/search', filterManyByTitleController);
    
}
