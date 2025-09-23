import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/models";
// import { CreateUserDto } from "./dto/create-user.dto";
// import { UpdateUserDto } from "./dto/update-user.dto";

export class UsersRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User
  ) {}

  async create(data) {
    const createdUser = await this.userModel.create(data);

    return createdUser;
  }

  async findAll() {
    return this.userModel.findAll();
  }

  async findById(id: string) {
    const user = await this.userModel.findByPk(id);

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async update(id: string, data) {
    const user = await this.findById(id);

    return await user!.update(data);
  }

  async delete(id: string) {
    const user = await this.findById(id);
    await user!.destroy();

    return;
  }
}
