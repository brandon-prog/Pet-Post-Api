import { getRepository } from "typeorm";
import { User } from "../../../data";

export class DeleteUserService {
    async execute(userId: string): Promise<void> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new Error("User not found");
        }

        await userRepository.remove(user);

        console.log('User deleted successfully');
    }
}
