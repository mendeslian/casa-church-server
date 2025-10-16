import { InjectModel } from "@nestjs/sequelize";
import { Comment } from "src/models";
import { CreateComment, UpdateComment } from "./types/comment.types";

export class CommentsRepository {
    constructor(
        @InjectModel(Comment)
        private readonly commentModel: typeof Comment
    ) {}

    async create(data: CreateComment) {
        const createdComment = await this.commentModel.create(data);

        return createdComment;
    }

    async findAll() {
        return await this.commentModel.findAll();
    }

    async findById(id: string) {
        const comment = await this.commentModel.findByPk(id);

        return comment;
    }

    async findByUserId(userId: string) {
        return await this.commentModel.findAll({ where: { userId } });
    }

    async update(id: string, data: UpdateComment) {
        const comment = await this.findById(id);

        return await comment!.update(data);
    }

    async delete(id: string) {
        const comment = await this.findById(id);
        await comment!.destroy();

        return;
    }
}