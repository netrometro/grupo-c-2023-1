import { IAnimalsRepository } from "../../repository/i-animals-repository";
import { IPostsRepository } from "../../repository/i-posts-repository";
import { CreatePostUseCaseRequest, CreatePostUseCaseResponse } from "./dto";
import { ErrorUserNotFound } from "./erros";
import { supabase } from "../../infra/supabase";
import { MultipartFile } from "@fastify/multipart";
import { generateFileName } from "../../utils/file";

export class CreatePostUseCase {
    constructor(private postRepository: IPostsRepository) {}

    async handle({ description, image, title }: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {

        // const userAlreadyExists = !!(await this.usersRepository.findById());

        // if (userAlreadyExists) {
        //     throw new ErrorUserNotFound();
        // }

        const url_image = typeof image === "string" ? 
            await this.persistBase64Image(image) :
            await this.persistMultipartImage(image)


        const post = await this.postRepository.create({description, url_image, title, user_id: 1 });
        return {
            post
        }
    }

    private async persistMultipartImage(fileData: MultipartFile) {
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

        return imageBasePath + fileName
    }

    private async persistBase64Image(fileBase64Data: string) {
        const imageData = Buffer.from(fileBase64Data, "base64")
        const fileName = "test.jpeg"

        await supabase.storage.from("balde-de-agua").upload(`animals/${fileName}`, imageData, {
            duplex: 'half',
            contentType: "jpeg"
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })

        const imageBasePath = "https://ypohusdowusoohwgyplu.supabase.co/storage/v1/object/public/balde-de-agua/animals/"

        return imageBasePath + fileName
    }
}