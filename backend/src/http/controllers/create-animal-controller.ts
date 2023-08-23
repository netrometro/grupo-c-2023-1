import { ConservationStatus } from "@prisma/client"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { AnimalRepository } from "../../repository/prisma/prisma-animals-repository";
import { CreateAnimalUseCase } from "../../use-cases/create-animal/create-animal-use-case";
import { ErrorAnimalAlreadyExists } from "../../use-cases/create-animal/errors";

export async function createAnimalController(request: FastifyRequest, response: FastifyReply) {

    const createAnimalValidationSchema = z.object({
        name: z.string(),
        specie_name: z.string(),
        size: z.coerce.number().int(),
        conservation_status: z.nativeEnum(ConservationStatus),
        ecological_function: z.string(),
        url_image: z.string().url()
    })

    const {
        name,
        specie_name,
        size,
        conservation_status,
        ecological_function,
        url_image
    } = createAnimalValidationSchema.parse(request.body);

    try {
        const animalRepository = new AnimalRepository();
        const createAnimalUseCase = new CreateAnimalUseCase(animalRepository);

        const animal = await createAnimalUseCase.handle({
            animalDto: {
                name,
                specie_name,
                size,
                conservation_status,
                ecological_function,
                url_image
            }
        })

        return response.code(201).send(animal);
    } catch (error) {
        if (error instanceof ErrorAnimalAlreadyExists) {
            return response.code(404).send({
                message: error.message
            });
        }
    }

}