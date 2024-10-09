import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { COURSE_REPOSITORY } from '../utils/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entitites/courses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  providers: [
    CoursesService,
    {
      provide: COURSE_REPOSITORY,
      useValue: COURSE_REPOSITORY,
    },
    // {
    //   provide: getRepositoryToken(Course),
    //   useValue: MOCK_COURSE_TEST,
    // },
  ],
  controllers: [CoursesController],
})
export class CoursesModule {}
