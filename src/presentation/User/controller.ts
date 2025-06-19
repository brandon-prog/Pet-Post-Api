import { Request, Response } from "express";
import { CreatorUserService } from "./services/creator-user.service";
import { LoginUserService } from "./services/login-user.service";
import { FinderUserService } from "./services/finder-user.service";
import { DeleteUserService } from "./services/delete-user.service";
import { LoginUserDto, RegisterUserDto } from "../../domain";
import { handleError } from "../common/errors/handleError";
import { envs } from "../../config/env";

export class UserController {
    constructor(
        private readonly creatorUserService: CreatorUserService,
        private readonly loginUserService: LoginUserService,
        private readonly finderUserService: FinderUserService,
        private readonly deleteUserService: DeleteUserService
    ) {}

    register = (req: Request, res: Response) => {
        const [error, data] = RegisterUserDto.execute(req.body);

        if (error) {
            return res.status(422).json({ message: error });
        }

        this.creatorUserService
        .execute(data!)
        .then((user) => res.status(201).json(user))
        .catch((error) => 
            handleError(error, res)
        );
    };

    login = (req: Request, res: Response) => {
    const [error, data] = LoginUserDto.execute(req.body);

    if (error) {
        return res.status(422).json({ message: error });
    }

    return this.loginUserService  
        .execute(data!)
        .then((data) => {

            res.cookie('token', data.token, {
                httpOnly: true,
                secure: envs.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 3 * 60 * 60 * 100,
            });
            res.status(200).json(data);
        })
        .catch((error) => {
            console.error('[Controller] Login error:', error);
            handleError(error, res);
        });
};

    findAll = (req: Request, res: Response) => {
        this.finderUserService
        .executeByFiendAll()
        .then((data) => {
            

            res.status(200).json(data);
        })
        .catch((error) => 
            handleError(error, res)
        );
    };

    findOne = (req: Request, res: Response) => {
        const { id } = req.params;
        
        this.finderUserService.executeByFindOne(id)
        .then((data) => res.status(200).json(data))
        .catch((error) => 
                handleError(error, res)
        );
    };

    delete = (req: Request, res: Response) => {
        const { id } = req.params;

        this.deleteUserService.execute(id)
        .then(() => res.status(200).json({ message: 'User deleted successfully' }))
        .catch((error) => 
            handleError(error, res)
        );
    };
}
