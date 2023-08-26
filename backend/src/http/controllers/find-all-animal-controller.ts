import { FastifyReply, FastifyRequest } from "fastify";
import { AnimalRepository } from "../../repository/prisma/prisma-animals-repository";
import { FindAllAnimalUseCase } from "../../use-cases/find-all-animal/find-all-animal-use-case";
import { z } from "zod";

export async function findAllAnimalController(request: FastifyRequest, response: FastifyReply) {

    const animalRepository = new AnimalRepository();
    const findAllAnimalUseCase = new FindAllAnimalUseCase(animalRepository);

    const animals  = await findAllAnimalUseCase.handle();

    const animalsCausesSchema = z.array(z.object({
        id: z.number(),
        size: z.number(),
        name: z.string(),
        specie_name: z.string(),
        conservation_status: z.string(),
        ecological_function: z.string(),
        url_image: z.string(),
        threat_causes: z.array(z.object({
            description: z.string()
        })).transform(threat_causes => threat_causes.map(cause => cause.description))
    }))

    const animalsWithCauses = animalsCausesSchema.parse(animals.animals)

    return response.send({
        animals: animalsWithCauses
    });

}