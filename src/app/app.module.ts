import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from 'src/students/students.module';
import { CoursesModule } from 'src/courses/courses.module';
import { DatabaseModule } from 'src/config/database.module';

@Module({
  imports: [DatabaseModule, StudentsModule, CoursesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
