import { Animal, Prisma } from "@prisma/client";

export interface IAnimalsRepository {
    create: (data: Prisma.AnimalUncheckedCreateInput) => Promise<Animal>
    findAll: () => Promise<Animal[]>
    findById: (animalId: number) => Promise<Animal | null>
    update: (animalId: number, data: Prisma.AnimalUncheckedUpdateInput) => Promise<Animal | null>
    destroy: (animalId: number) => Promise<void>
}
