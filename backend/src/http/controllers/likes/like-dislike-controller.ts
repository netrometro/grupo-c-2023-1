import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaLikesRepository } from "../../../repository/prisma/prisma-likes-repository";
import { PrismaPostsRepository } from "../../../repository/prisma/prisma-posts-repository";
import { LikeDislikeUseCase } from "../../../use-cases/like-dislike/like-dislike-use-case";
import { PrismaUsersRepository } from "../../../repository/prisma/prisma-users-repository";
import { PostNotFoundError } from "../../../use-cases/global-errors";

export async function likeDislikeController(req: FastifyRequest, res: FastifyReply) {
    const likeDislikeValidationSchema = z.object({
        postId: z.number().int()
    })

    const { postId } = likeDislikeValidationSchema.parse(req.body)

    try {
        const likesRepository = new PrismaLikesRepository()
        const postsRepository = new PrismaPostsRepository()
        const usersRepository = new PrismaUsersRepository()
        const likeDislikeUseCase = new LikeDislikeUseCase(usersRepository, postsRepository, likesRepository)

        const { isLiked } = await likeDislikeUseCase.handle({ postId, userId: 1 })

        const resBody = isLiked ? 
            {
                message: "You dislike the post!",
                code: 204
            } : 
            {
                message: "You like the post!",
                code: 201
            }

        return res.status(resBody.code).send({ message: resBody.message })
    } catch (error) {
        if (error instanceof PostNotFoundError) {
            return res.status(400).send({ message: error.message })
        }
    }
}
