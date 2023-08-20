import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AnimalRepository } from "../../repository/prisma/prisma-animals-repository";
import { FindByIdAnimalUseCase } from "../../use-cases/find-by-id-animal/find-by-id-animal";
import { ErrorAnimalNotExists } from "../../use-cases/find-by-id-animal/erros";

export async function findByIdAnimalController(request: FastifyRequest, response: FastifyReply) {



    const findByAnimalValidationSchema = z.object({
        id: z.coerce.number().int()
    })

    const { id } = findByAnimalValidationSchema.parse(request.params);

    try {
        const animalRepository = new AnimalRepository();
        const findByidAnimalUseCase = new FindByIdAnimalUseCase(animalRepository);
        const animal = await findByidAnimalUseCase.handle({ animalId: id });

        return response.send(animal);
    } catch (error) {
        if (error instanceof ErrorAnimalNotExists) {
            return response.code(404).send({message: error.message});
        }
    }

}