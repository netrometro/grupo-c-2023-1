import { AnimalRepository } from "../../repository/prisma/prisma-animals-repository";
import { FindAllAnimalUseCaseResponse } from "./dtos";

export class FindAllAnimalUseCase {
    constructor(private animalRepository: AnimalRepository) {}

    async handle(): Promise<FindAllAnimalUseCaseResponse> {
        const animals = await this.animalRepository.findAll();

        return {animals};
    }
}