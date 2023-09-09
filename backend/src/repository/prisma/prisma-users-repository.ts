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

        return user;
    }

    async create(userDTO: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data: {
                google_id: userDTO.google_id,
                email: userDTO.email,
                username: userDTO.username,
                avatar_url: userDTO.avatar_url
            }
        })

        return user;
    }

    async findByGoogleId(google_id: string) {
        const user = await prisma.user.findUnique({
            where: {
                google_id
            }
    })

    return user;
}

    async findById(userId: number) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        return user;
    }
}
