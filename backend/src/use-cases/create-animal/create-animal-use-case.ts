import { AnimalRepository } from "../../repository/prisma/prisma-animals-repository";
import { CreateAnimalUseCaseRequest, CreateAnimalUseCaseResponse } from "./dtos";
import { ErrorAnimalAlreadyExists } from "./errors";



export class CreateAnimalUseCase {
    constructor(private animalRepository: AnimalRepository) { }

    async handle({ animalDto }: CreateAnimalUseCaseRequest): Promise<CreateAnimalUseCaseResponse> {
        const animalAlreadyExists = !!(await this.animalRepository.findBySpecie(animalDto.specie_name));

        if (animalAlreadyExists) {
            throw new ErrorAnimalAlreadyExists();
        }

        const animal = await this.animalRepository.create(animalDto);

        return { animal };
    }
}