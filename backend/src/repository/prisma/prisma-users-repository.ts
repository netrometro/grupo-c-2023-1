import { Prisma } from "@prisma/client";
import { IUsersRepository } from "../i-users-repository";
import { prisma } from "../../prisma";

export class PrismaUsersRepository implements IUsersRepository {
    async update(userId: number, data: Prisma.UserUncheckedUpdateInput) {
        const user = await prisma.user.update({
            data,
            where: {
                id: userId
            }
        })

        return user
    }

    async findById(userId: number) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        return user
    }
}
