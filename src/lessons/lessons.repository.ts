import { InjectModel } from "@nestjs/sequelize";
import { Lesson } from "src/models";

export class LessonsRepository {
  constructor(
    @InjectModel(Lesson)
    private readonly lessonModel: typeof Lesson
  ) {}

  async create(data) {
    const createdLesson = await this.lessonModel.create(data);

    return createdLesson;
  }

  async findAll(sermonId?: string) {
    const where = sermonId ? { sermonId } : {};
    const lessons = await this.lessonModel.findAll({ where });
    return lessons;
  }

  async findById(id: string) {
    const lesson = await this.lessonModel.findByPk(id);

    return lesson;
  }

  async update(id: string, data) {
    const lesson = await this.findById(id);

    return await lesson!.update(data);
  }

  async delete(id: string) {
    const lesson = await this.findById(id);
    await lesson!.destroy();

    return;
  }
}
