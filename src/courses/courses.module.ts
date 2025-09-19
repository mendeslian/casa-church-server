import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CoursesController } from "./courses.controller";
import { CoursesService } from "./courses.service";
import { CoursesRepository } from "./courses.repository";
import { Courses } from "./courses.model";

@Module({
  imports: [SequelizeModule.forFeature([Courses])],
  controllers: [CoursesController],
  providers: [CoursesService, CoursesRepository],
})
export class CoursesModule {}
