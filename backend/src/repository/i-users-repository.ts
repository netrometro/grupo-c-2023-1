import { Prisma, User } from "@prisma/client";

export interface IUsersRepository {
    findById: (userId: number) => Promise<User | null>
    update: (userId: number, data: Prisma.UserUncheckedUpdateInput) => Promise<User>
}
