import { Prisma } from "@prisma/client";
import { InMemoryData } from "../../@types/in-memory-data";
import { IUsersRepository } from "../i-users-repository";
import { IInMemoryRepository } from "../i-in-memory-repository";

export class UsersInMemoryRepository implements IUsersRepository, IInMemoryRepository {
    constructor(
        readonly data: InMemoryData
    ) {}
        
    async findById(userId: number) {
        return this.data.users.find(user => user.id === userId) || null
    }

    async update(userId: number, data: Prisma.UserUncheckedUpdateInput) {
        const user = this.data.users.find(user => user.id === userId)!

        const validDataPoints = Number(data.point) >= 0

        user.avatar_url = data.avatar_url ? String(data.avatar_url) : user.avatar_url
        user.email = data.email ? String(data.email) : user.email
        user.google_id = data.google_id ? String(data.google_id) : user.google_id
        user.point = validDataPoints ? Number(data.point) : user.point
        user.username = data.username ? String(data.username) : user.username

        this.data.users[user.id - 1] = user

        return user
    }
}
