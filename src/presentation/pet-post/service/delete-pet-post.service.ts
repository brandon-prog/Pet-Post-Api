import { CustomError } from "../../../domain";
import { FinderPetPostService } from "./finder-pet-post.service";

export class DeletePetPostService {
    constructor(private readonly finderPetPostService: FinderPetPostService) {}

    async execute(id: string): Promise<void> {
        const petPost = await this.finderPetPostService.executeByFindOne(id);

        if (!petPost) {
            throw CustomError.internalServer('internal server error');
        }
    }
}
