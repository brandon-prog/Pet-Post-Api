import { Router } from "express";
import { CreatorUserService } from "./services/creator-user.service";
import { UserController } from "./controller";
import { LoginUserService } from "./services/login-user.service";
import { FinderUserService } from "./services/finder-user.service";
import { DeleteUserService } from "./services/delete-user.service";

export class UserRoutes {
    static get routes() {
        const router = Router();

        const finderUserService = new FinderUserService();
        const loginUserService = new LoginUserService();
        const creatorUserService = new CreatorUserService();
        const deleteUserService = new DeleteUserService();
        const controller = new UserController(creatorUserService, loginUserService, finderUserService, deleteUserService);

        router.get('/', controller.findAll);
        router.post('/register', controller.register);
        router.post('/login', controller.login);
        router.get('/:id', controller.findOne);
        router.delete('/:id', controller.delete);

        return router;
    }
}