import { FastifyReply, FastifyRequest } from "fastify";
import { AnimalRepository } from "../../repository/prisma/prisma-animals-repository";
import { FindAllAnimalUseCase } from "../../use-cases/find-all-animal/find-all-animal-use-case";


export async function findAllAnimalController(request: FastifyRequest, response: FastifyReply) {

    const animalRepository = new AnimalRepository();
    const findAllAnimalUseCase = new FindAllAnimalUseCase(animalRepository);

    const animals  = await findAllAnimalUseCase.handle();

    return response.send(animals);

}