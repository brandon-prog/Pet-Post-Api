import { PetPost, PetPostStatus } from "../../../data";
import { CustomError } from "../../../domain";

export class FinderPetPostService {
    async executeByFindAll() {
        return await PetPost.find({
            where: {
                status: PetPostStatus.APPROVED,
                hasFound: false,
            }
        });
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