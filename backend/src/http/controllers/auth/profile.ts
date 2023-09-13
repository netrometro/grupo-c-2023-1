import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../../../repository/prisma/prisma-users-repository";
import { UserNotFoundError } from "../../../use-cases/global-errors";
import { FindUserByIdUseCase } from "../../../use-cases/find-user-by-id/find-user-by-id-use-case";

export async function profile(request: FastifyRequest, response: FastifyReply) {
    try {
        const usersRepository = new PrismaUsersRepository()
        const findUserByIdUseCase = new FindUserByIdUseCase(usersRepository)

        const { user: { id, github_id, ...rest } } = await findUserByIdUseCase.handle({ userId: Number(request.user) })

        return response.send({
            user: {
                ...rest
            }
        })
    } catch (error) {
        if (error instanceof UserNotFoundError) {
            return response.send({ message: error.message }).status(401)
        }
    }
}
