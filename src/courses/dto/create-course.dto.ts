import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { CourseLevel } from 'src/utils/types/courses.types';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(CourseLevel)
  level: CourseLevel;
}
