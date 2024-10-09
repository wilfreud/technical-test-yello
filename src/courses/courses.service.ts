import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Course } from './entitites/courses.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.courseRepository.findOneBy({ id });
    if (!course) {
      throw new BadRequestException('Course not found');
    }
    return course;
  }

  async create(data: CreateCourseDto): Promise<Course> {
    const course = this.courseRepository.create(data);
    return this.courseRepository.save(course);
  }

  async update(id: number, data: CreateCourseDto): Promise<Course> {
    const course = await this.findOne(id);
    return this.courseRepository.save({ ...course, ...data });
  }

  async remove(id: number): Promise<void> {
    const course = await this.findOne(id);
    await this.courseRepository.remove(course);
  }
}
