import { FastifyInstance } from "fastify";
import { signController } from "./controllers/auth/sign-controller";

export async function authRoutes(app: FastifyInstance) {
    app.post("/auth/register", async (register, response) => {
        const { user } = await signController(register, response);

        const token = app.jwt.sign({
            name: user.username,
            avatarUrl: user.avatar_url,
        }, {
            sub: user.id.toString(),
            expiresIn: "30 days",
        });

        return response.send({ token });
    });
}