import { AnimalRepository } from "../../repository/prisma/prisma-animals-repository";
import { FindByIdAnimalUseCaseRequest, FindByIdAnimalUseCaseResponse } from "./dtos";
import { ErrorAnimalNotExists } from "./erros";

export class FindByIdAnimalUseCase {
    constructor(private animalRepository: AnimalRepository) { }

    async handle({ animalId }: FindByIdAnimalUseCaseRequest): Promise<FindByIdAnimalUseCaseResponse> {

        const animal = await this.animalRepository.findById(animalId);

        if (animal == null) {
            throw new ErrorAnimalNotExists();
        }

        return { animal };

    }
}