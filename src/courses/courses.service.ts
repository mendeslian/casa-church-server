import { Injectable, NotFoundException } from "@nestjs/common";
import { CoursesRepository } from "./courses.repository";
import { Courses } from "./entities/courses.model";

@Injectable()
export class CoursesService {
  constructor(private readonly courseRepository: CoursesRepository) {}

  async getAll() {
    return await this.courseRepository.findAll();
  }

  async getById(id: string) {
    const student = await this.courseRepository.getById(id);

    if (!student) throw new NotFoundException("Curso não encontrado");
    return student;
  }

  async create(course: Courses) {
    const newCourse = await this.courseRepository.create(course);
    return {
      message: "Curso criado com sucesso",
      newCourse,
    };
  }

  async replace(id: string, newData: Courses) {
    const course = await this.courseRepository.getById(id);

    if (!course) throw new NotFoundException("Curso não encontrado");

    const updatedCourse = await this.courseRepository.replace(id, newData);
    return {
      message: "Curso atualizado com sucesso",
      updatedCourse,
    };
  }

  async update(id: string, newData: Partial<Courses>) {
    const course = await this.courseRepository.getById(id);

    if (!course) throw new NotFoundException("Curso não encontrado");

    const updatedCourse = await this.courseRepository.update(id, newData);
    return {
      message: "Curso atualizado com sucesso",
      updatedCourse,
    };
  }

  async delete(id: string) {
    const course = await this.courseRepository.getById(id);
    if (!course) throw new NotFoundException("Curso não encontrado");

    await this.courseRepository.delete(id);
    return {
      message: "Curso deletado com sucesso",
    };
  }
}
