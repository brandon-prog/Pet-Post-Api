import { PetPostStatus } from "../../../data";
import { CustomError } from "../../../domain";
import { FinderPetPostService } from "./finder-pet-post.service";

export class RejectPetPostService {
    constructor( private readonly finderPetPostService: FinderPetPostService) {}
    
    async execute(id: string) {
        const petPost = await this.finderPetPostService.executeByFindOne(id);

        if(petPost.status === 'approved') {
            throw CustomError.badRequest('pet post already approved');
    }

    if(petPost.status === 'rejected') {
            throw CustomError.badRequest('pet post already rejected');
        }

        petPost.status = PetPostStatus.REJECTED;

        try {
            await petPost.save();
            return {
                message: 'Pet post rejected successfully',
            };
        } catch (error) {
            throw CustomError.internalServer('internal server error');
        }
    }
}
