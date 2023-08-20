import { prisma } from "../../prisma";
import { IAnimalsRepository } from "../i-animals-repository";
import { $Enums, Animal, Prisma } from "@prisma/client";

export class AnimalRepository implements IAnimalsRepository {

    async findAll() {

        const animals = await prisma.animal.findMany();

        return animals;
    }

    async findById(animalId: number) {

        const animal = await prisma.animal.findUnique({
            where: {
                id: animalId
            }
        });

        return animal;
    }

    async findBySpecie(specie: string) {

        const animal = await prisma.animal.findUnique({
            where: {
                specie_name: specie
            }
        })

        return animal;
    };

    async create(animalDto: Prisma.AnimalCreateInput) {
        
        const animal = await prisma.animal.create({
            data: animalDto
        });

        return animal;
    }

}