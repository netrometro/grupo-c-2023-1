import { Animal, Prisma } from "@prisma/client";

export interface IAnimalsRepository {
    create: (animalDto: Prisma.AnimalCreateInput) => Promise<Animal>
    findAll: () => Promise<Animal[]>
    findById: (animalId: number) => Promise<Animal | null>
    findBySpecie: (specie: string) => Promise<Animal | null>
}
