import { InjectModel } from "@nestjs/sequelize";
import { Like } from "src/models";
import { CreateLike } from "./types/like.types";

export class LikesRepository {
    constructor(
        @InjectModel(Like)
        private readonly likeModel: typeof Like
    ) {}

    async create(data: CreateLike) {
        const createdLike = await this.likeModel.create(data);

        return createdLike;
    }

    async findAll() {
        return await this.likeModel.findAll();
    }

    async findById(id: string) {
        const like = await this.likeModel.findByPk(id);

        return like;
    }

    async findByUserId(userId: string) {
        return await this.likeModel.findAll({ where: { userId } });
    }
    
    async delete(id: string) {
        const like = await this.findById(id);
        await like!.destroy();

        return;
    }
}