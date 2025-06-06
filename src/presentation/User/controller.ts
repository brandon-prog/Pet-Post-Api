import { Request, Response } from "express";
import { CreatorUserService } from "./services/creator-user.service";
import { LoginUserService } from "./services/login-user.service";
import { FinderUserService } from "./services/finder-user.service";
import { DeleteUserService } from "./services/delete-user.service";

export class UserController {
    constructor(
        private readonly creatorUserService: CreatorUserService,
        private readonly loginUserService: LoginUserService,
        private readonly finderUserService: FinderUserService,
        private readonly deleteUserService: DeleteUserService
    ) {}

    register = (req: Request, res: Response) => {
        this.creatorUserService.execute(req.body)
        .then((user) => res.status(201).json(user))
        .catch((error) => 
            res.status(500).json({ message: 'internal server error'})
        );
    };

    login = (req: Request, res: Response) => {
        this.loginUserService
            .execute()
            .then((data) => res.status(200).json(data))
            .catch((error) => 
                res.status(500).json({ message: 'internal server error'})
            );
    }

    findAll = (req: Request, res: Response) => {
        this.finderUserService
        .executeByFiendAll()
        .then((data) => res.status(201).json(data))
        .catch((error) => 
            res.status(500).json({ message: 'internal server error'})
        );
    };

    findOne = (req: Request, res: Response) => {
        const { id } = req.params;
        
        this.finderUserService.executeByFindOne(id)
        .then((data) => res.status(200).json(data))
        .catch((error) => 
                res.status(500).json({ message: 'internal server error'})
        );
    };

    delete = (req: Request, res: Response) => {
        const { id } = req.params;

        this.deleteUserService.execute(id)
        .then(() => res.status(200).json({ message: 'User deleted successfully' }))
        .catch((error) => 
            res.status(500).json({ message: error.message })
        );
    };
}
