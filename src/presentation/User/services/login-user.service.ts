import { encriptAdapter } from "../../../config/bcrypt.adapter";
import { envs } from "../../../config/env";
import { JwtAdapter } from "../../../config/jwt.adapter";
import { User } from "../../../data";
import { CustomError, LoginUserDto } from "../../../domain";

export class LoginUserService {
async execute(data : LoginUserDto) {
    const user = await this.ensureUserExists(data.email);

    await this.ensurePasswordIsCorrect(data.password, user.password);

    const token = await this.generateToken({ id: user.id }, envs.JWT_EXPIRE_IN);

    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            rol: user.rol,
        },
    };
}

    private async ensureUserExists(email: string) {
    const user = await User.findOne({ 
        where: { 
            email,
            status: true,
        },
    });

    if (!user) {
        throw CustomError.notFound('User not found');
    }

    return user;
}

private async ensurePasswordIsCorrect(
    unHashedPassword: string, 
    hashedPassword: string
) {
    const isMatch = await encriptAdapter.compare(unHashedPassword, hashedPassword);

    if (!isMatch) {
        throw CustomError.unAuthorized('Invalid credentials');
    }
}

private async generateToken(payload: any, duration: string) {
    const token = await JwtAdapter.generateToken(payload, duration);
    if (!token) throw CustomError.internalServer('Error while creating jwt');
    return token;
}
}
