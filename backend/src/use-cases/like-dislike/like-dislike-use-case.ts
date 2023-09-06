import { ILikesRepository } from "../../repository/i-likes-repository";
import { IPostsRepository } from "../../repository/i-posts-repository";
import { IUsersRepository } from "../../repository/i-users-repository";
import { PostNotFoundError, UserNotFoundError } from "../global-errors";
import { LikeDislikeUseCaseRequest, LikeDislikeUseCaseResponse } from "./dtos";

export class LikeDislikeUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private postsRepository: IPostsRepository,
        private likesRepository: ILikesRepository
    ) {}

    async handle({
        postId,
        userId
    }: LikeDislikeUseCaseRequest): Promise<LikeDislikeUseCaseResponse> {
        const post = await this.postsRepository.findById(postId)

        if (!post) {
            throw new PostNotFoundError()
        }

        const user = await this.usersRepository.findById(userId)

        if (!user) {
            throw new UserNotFoundError()
        }

        const userFishCoins = user.point ?? 0

        const isLiked = !!(await this.likesRepository.find(userId, postId))

        if (isLiked) {
            await this.usersRepository.update(userId, {
                point: userFishCoins - 5
            })

            return { isLiked }
        }

        await this.likesRepository.create({
            post_id: postId,
            user_id: userId
        })

        await this.usersRepository.update(userId, {
            point: userFishCoins + 5
        })

        return { isLiked }
    }
}
