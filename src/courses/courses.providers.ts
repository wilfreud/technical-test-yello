import { DataSource } from 'typeorm';
import { Course } from './entitites/courses.entity';
import { COURSE_REPOSITORY, DEFAULT_DATASOURCE_NAME } from '../utils/constants';

export const CourseProviders = [
  {
    provide: COURSE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Course),
    inject: [DEFAULT_DATASOURCE_NAME],
  },
];
