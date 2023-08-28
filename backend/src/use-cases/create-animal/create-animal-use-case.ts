import { randomBytes } from "crypto";
import { supabase } from "../../infra/supabase";
import { CreateAnimalUseCaseRequest, CreateAnimalUseCaseResponse } from "./dtos";
import { ErrorAnimalAlreadyExists } from "./errors";
import { IAnimalsRepository } from "../../repository/i-animals-repository";
import { generateFileName } from "../../utils/file";

export class CreateAnimalUseCase {
    constructor(private animalRepository: IAnimalsRepository) { }

    async handle({
        conservation_status,
        ecological_function,
        name,
        size,
        specie_name,
        fileData,
        threat_causes
    }: CreateAnimalUseCaseRequest): Promise<CreateAnimalUseCaseResponse> {
        const animalAlreadyExists = !!(await this.animalRepository.findBySpecie(specie_name));

        if (animalAlreadyExists) {
            throw new ErrorAnimalAlreadyExists();
        }

        const fileName = generateFileName(fileData.mimetype)

        await supabase.storage.from("balde-de-agua").upload(`animals/${fileName}`, fileData.file, {
            duplex: 'half',
            contentType: fileData.mimetype
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })

        const imageBasePath = "https://ypohusdowusoohwgyplu.supabase.co/storage/v1/object/public/balde-de-agua/animals/"
        const url_image = imageBasePath + fileName

        const connectCauses = threat_causes.map(cause => ({
            where: {
                description: cause
            },
            create: {
                description: cause
            }
        }))

        const animal = await this.animalRepository.create({
            name,
            conservation_status,
            ecological_function,
            size,
            specie_name,
            url_image,
            threat_causes: {
                connectOrCreate: connectCauses
            }
        });

        return { animal };
    }
}