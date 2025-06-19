import { Request, Response } from "express";
import { CreatorPetPostService } from "./service/creator-pet-post.service";
import { FinderPetPostService } from "./service/finder-pet-post.service";
import { ApprovePetPostService } from "./service/approve-pet-post.service";
import { RejectPetPostService } from "./service/reject-pet-post.service";
import { DeletePetPostService } from "./service/delete-pet-post.service";
import { handleError } from "../common/errors/handleError";

export class PetPostController {
    constructor(
        private readonly creatorPetPostService: CreatorPetPostService,
        private readonly finderPetPostService: FinderPetPostService,
        private readonly approvePetPostService: ApprovePetPostService,
        private readonly rejectPetPostService: RejectPetPostService,
        private readonly deletePetPostService: DeletePetPostService

    ) {}

    create = (req: Request, res: Response) => {
        this.creatorPetPostService
        .execute(req.body)
        .then((petPost) => res.status(201).json(petPost))
        .catch((error) => 
            handleError(error, res)
    );
    };

    findAll = (req: Request, res: Response) => {
        this.finderPetPostService
        .executeByFindAll()
        .then((petPost) => res.status(200).json(petPost))
        .catch((error) => 
            handleError(error, res)
    );
    };

    findOne = (req: Request, res: Response) => {
        const { id } = req.params;            
        this.finderPetPostService
        .executeByFindOne(id)
        .then((petPost) => res.status(200).json(petPost))
        .catch((error) => 
            handleError(error, res)
    );
    }

    approve = (req: Request, res: Response) => {
        const { id } = req.params;                    
        this.approvePetPostService
        .execute(id)
        .then((petPost) => res.status(200).json(petPost))
        .catch((error) => 
            handleError(error, res)
    );
    };

    reject = (req: Request, res: Response) => {
        const { id } = req.params;                    
        this.rejectPetPostService
        .execute(id)
        .then((petPost) => res.status(200).json(petPost))
        .catch((error) => 
            handleError(error, res)
    );
}

    deletePost = (req: Request, res: Response) => {
    const { id } = req.params;
    this.deletePetPostService
        .execute(id)
        .then(() => res.status(204).send())
        .catch((error) => 
            handleError(error, res)
        );
};

}
