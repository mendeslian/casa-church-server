import { InjectModel } from "@nestjs/sequelize";
import { Post } from "src/models";
import { CreatePost } from "./types/post.types";

export class PostsRepository {
  constructor(
    @InjectModel(Post)
    private readonly postModel: typeof Post
  ) {}

  async create(data) {
    const createdPost = await this.postModel.create(data);

    return createdPost;
  }

  async findAll() {
    const posts = await this.postModel.findAll();

    return posts;
  }

  async findById(id: string) {
    const post = await this.postModel.findByPk(id);

    return post;
  }

  async delete(id: string) {
    const post = await this.findById(id);
    await post!.destroy();

    return;
  }
}
