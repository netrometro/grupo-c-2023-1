import axios from "axios";
import { IUsersRepository } from "../../repository/i-users-repository";
import { z } from "zod";
import { SignUseCaseRequest, SignUseCaseResponse } from "./dtos";
import { env } from "../../env";

export class SignUseCase {
    constructor(private userRepository: IUsersRepository) {}

    async handle({ code }: SignUseCaseRequest): Promise<SignUseCaseResponse> {
        const accessTokenResponse = await axios.post(
            "https://github.com/login/oauth/access_token",
            null,
            {
                params: {
                    client_id: env.GITHUB_CLIENT_ID,
                    client_secret: env.GITHUB_CLIENT_SECRET,
                    code
                },
                headers: {
                    Accept: "application/json"
                }
            }
        );

        const { access_token } = accessTokenResponse.data;

        const userResponse = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        const userSchema = z.object({
            id: z.number(),
            login: z.string(),
            name: z.string(),
            avatar_url: z.string().url()
        });

        const userInfo = userSchema.parse(userResponse.data);

        let user = await this.userRepository.findByGoogleId(userInfo.id.toString());

        if(!user) {
            user = await this.userRepository.create({
                username: userInfo.login, google_id: userInfo.id.toString(), avatar_url: userInfo.avatar_url,
                email: userInfo.login
            })
        }

        return { user };
    }
}