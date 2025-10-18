import { InjectModel } from "@nestjs/sequelize";
import { Like } from "src/models";
import { CreateLike } from "./types/like.types";
import { FindLikesQueryDto } from './dto/find-likes-query.dto';

export class LikesRepository {
    constructor(
        @InjectModel(Like)
        private readonly likeModel: typeof Like
    ) {}

    async create(data: CreateLike) {
        const createdLike = await this.likeModel.create(data);

        return createdLike;
    }

    async findAll(findLikesQuery: FindLikesQueryDto) {
        const { page, limit, userId, orderBy, orderDirection } = findLikesQuery;
        const offset = (page - 1) * limit;

        const where: any = {};
        if (userId) where.userId = userId;
        
        const { rows, count } = await this.likeModel.findAndCountAll({
        where,
        limit,
        offset,
        order: [[orderBy, orderDirection]],
        });

        return {
        total: count,
        page,
        totalPages: Math.ceil(count / limit),
        likes: rows,
        };
    }

    async findById(id: string) {
        const like = await this.likeModel.findByPk(id);

        return like;
    }
    
    async delete(id: string) {
        const like = await this.findById(id);
        await like!.destroy();

        return;
    }
}