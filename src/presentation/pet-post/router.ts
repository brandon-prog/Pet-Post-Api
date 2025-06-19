import { Router } from "express";
import { PetPostController } from "./controller";
import { CreatorPetPostService } from "./service/creator-pet-post.service";
import { FinderPetPostService } from "./service/finder-pet-post.service";
import { ApprovePetPostService } from "./service/approve-pet-post.service";
import { RejectPetPostService } from "./service/reject-pet-post.service";
import { DeletePetPostService } from "./service/delete-pet-post.service";
import { AuthMiddleware } from "../common/middlewares/auth.middleware";



export class PetPostRoutes {
    static get routes() {
        const router = Router();

        const creatorPetPostService = new CreatorPetPostService();
        const finderPetPostService = new FinderPetPostService();
        const approvePetPostService = new ApprovePetPostService(
            finderPetPostService
        );
        const rejectPetPostService = new RejectPetPostService(finderPetPostService);
        const deletePetPostService = new DeletePetPostService(finderPetPostService);
            const controller = new PetPostController(
            creatorPetPostService,
            finderPetPostService,
            approvePetPostService,
            rejectPetPostService,
            deletePetPostService
        );

        router.use(AuthMiddleware.protect);
        router.post('/', controller.create);
        router.get('/', controller.findAll);
        router.get('/:id', controller.findOne);
        router.patch('/:id/approve', controller.approve);
        router.patch('/:id/reject', controller.reject);
        router.delete('/:id', controller.deletePost);
        
        return router;
    }
}

