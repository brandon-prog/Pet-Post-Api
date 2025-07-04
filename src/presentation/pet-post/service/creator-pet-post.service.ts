import { PetPost } from "../../../data";
import { CustomError } from "../../../domain";

export class CreatorPetPostService {
    async execute(data: any, session: any) {
        const petPost = new PetPost()

        petPost.petName = data.petName.trim().toLowerCase();
        petPost.description = data.petName.trim().toLowerCase();
        petPost.imagen_url = data.petName.trim();
        petPost.user = session.sessionUse;

        try {
            return await petPost.save();
    } catch (error) {
        throw CustomError.internalServer('internal server error');
    }
}
}