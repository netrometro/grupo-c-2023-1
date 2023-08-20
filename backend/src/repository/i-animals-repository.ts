import { Animal, Prisma } from "@prisma/client";

export interface IAnimalsRepository {
    findAll: () => Promise<Animal[]>
    findById: (animalId: number) => Promise<Animal | null>
}
