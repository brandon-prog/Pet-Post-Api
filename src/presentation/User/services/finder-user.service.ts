import { User } from "../../../data";
import { CustomError } from "../../../domain";

export class FinderUserService {
    async executeByFiendAll() {
        return await User.find({
            select: ['id', 'name', 'email', 'rol'],
            where: {
                status: true,
        }
    })
}

    async executeByFindOne(id: string) {
        const user = await User.findOne({
            where: {
                status: true,
                id: id,
            },
        });

        if (!user) {
            throw CustomError.notFound('user not found');
        }
        return user;
    }       
    }