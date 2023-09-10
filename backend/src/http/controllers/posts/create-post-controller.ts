import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaPostsRepository } from "../../../repository/prisma/prisma-posts-repository";
import { CreatePostUseCase } from "../../../use-cases/create-post/create-post-use-case";
import { PrismaUsersRepository } from "../../../repository/prisma/prisma-users-repository";
import { ErrorUserNotFound } from "../../../use-cases/create-post/erros";

export async function createPostController(request:FastifyRequest, response: FastifyReply) {
    const createPostValidationSchema = z.object({
        title: z.string(),
        description: z.string(),
        image: z.string()
    });

    const { description, image, title } = createPostValidationSchema.parse(request.body);

    try {
        const prismaPostsRepository = new PrismaPostsRepository();
        const prismaUsersRepository = new PrismaUsersRepository();
        const createPostUseCase = new CreatePostUseCase(prismaPostsRepository, prismaUsersRepository);

        const post = createPostUseCase.handle({ description, image, title, userId: z.number().parse(request.user.sub)});

        const postSchema = z.object({
            id: z.number(),
            title: z.string(),
            description: z.string().transform(description => description.substring(0, 50)),
            url_image: z.string() || null,
            published_at: z.date() || null,
            user: z.object({
                username: z.string(),
            }).transform(user => user.username),
            _count: z.object({
                likes: z.number(),
            }).transform(count => count.likes),
        });

        const { _count: likes, ...rest } = postSchema.parse(post);

        return response.send({
            post: {
                likes,
                ...rest
            }
        });
    } catch (error) {
        if (error instanceof ErrorUserNotFound) {
            return response.code(404).send({
                message: error.message
            });
        }
    }
    
}