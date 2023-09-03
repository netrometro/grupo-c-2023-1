import { Post, Prisma } from "@prisma/client";

export interface CreatePostUseCaseRequest {
    description: string;
    image: string;
    title: string;
    // user_id: number;
}

export interface CreatePostUseCaseResponse {
    post: Post;
}