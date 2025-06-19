import { encriptAdapter } from "../../../config/bcrypt.adapter";
import {  User } from "../../../data";
import { CustomError, RegisterUserDto } from "../../../domain";

export class CreatorUserService {
    async execute(data: RegisterUserDto) {
        const user = new User()

        user.name = data.name.trim().toLowerCase();
        user.email = data.email.trim().toLowerCase();
        user.password = await encriptAdapter.hash(data.password.trim());
        try {
            await user.save();
            return{
                name: user.name,
                email: user.email,
                password: user.password
};
    } catch (error) {
        throw CustomError.internalServer('internal server error');
    }
}
}