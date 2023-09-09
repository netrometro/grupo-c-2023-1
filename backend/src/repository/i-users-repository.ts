import { Prisma, User } from "@prisma/client";

export interface IUsersRepository {
    findById: (userId: number) => Promise<User | null>
    findByGoogleId: (google_id: string) => Promise<User | null>
    create: (user: Prisma.UserCreateInput) => Promise<User>
    update: (userId: number, data: Prisma.UserUncheckedUpdateInput) => Promise<User>
}
