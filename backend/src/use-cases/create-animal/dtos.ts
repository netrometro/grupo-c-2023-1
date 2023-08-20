import { Animal, Prisma } from "@prisma/client";

export interface CreateAnimalUseCaseRequest {
    animalDto: Prisma.AnimalCreateInput
}

export interface CreateAnimalUseCaseResponse {
    animal: Animal
}