import { PetPost } from "../../../data";

export class CreatorPetPostService {
    async execute(data: any) {
        const petPost = new PetPost()

        petPost.petName = data.petName.trim().toLowerCase();
        petPost.description = data.petName.trim().toLowerCase();
        petPost.imagen_url = data.petName.trim();

        try {
            return await petPost.save();
    } catch (error) {
        throw new Error('Error creating pet post');
    }
}
}