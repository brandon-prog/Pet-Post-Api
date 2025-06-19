import { PetPost, PetPostStatus } from "../../../data";
import { CustomError } from "../../../domain";

export class FinderPetPostService {
    async executeByFindAll() {
        return await PetPost.find({
            where: {
                status: PetPostStatus.APPROVED,
                hasFound: false,
            },
            relations: ['user'],
            select: {
                id: true,
                petName: true,
                description: true,
                imagen_url: true,
                status: true,
                hasFound: true,
                user: {
                    id: true,
                    name: true,
                    email: true
                },
            },
            });


        return PetPost;
    }

    async executeByFindOne(id: string): Promise<PetPost> {
        const petPost = await PetPost.findOne({
            where: {
                id: id,
            },
        });

        if (!petPost) {
            throw CustomError.notFound('Pet not found');
        }
        return petPost;
    }


}