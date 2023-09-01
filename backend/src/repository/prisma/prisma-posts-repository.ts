import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../prisma";

export class PostsRepository implements PostsRepository {

    async findAll(): Promise<Post[]> {
        const posts = await prisma.post.findMany();
        return posts;
    }

    async findById(postId: number): Promise<Post | null> {
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        });

        return post;
    }

    async create(postDto: Prisma.PostUncheckedCreateInput): Promise<Post> {
        const post = await prisma.post.create({
            data: postDto
        });

        return post;
    }

    async delete(postId: number): Promise<void> {
        await prisma.post.delete({
            where: {
                id: postId
            }
        });
    }

    async filterManyByTitle(title: string): Promise<Post[]> {
        const posts = await prisma.post.findMany({
            where: {
                title: {
                    contains: title,
                    mode: "insensitive"
                }
            }
        });

        return posts;
    }

}