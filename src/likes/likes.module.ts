import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { AuthModule } from "src/auth/auth.module";
import { models } from "src/models";
import { SequelizeModule } from "@nestjs/sequelize";
import { LikesRepository } from "./likes.repository";

@Module({
  imports: [SequelizeModule.forFeature(models), AuthModule],
  controllers: [LikesController],
  providers: [LikesService, LikesRepository],
})
export class LikesModule {}
