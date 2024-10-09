import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseLevel } from '../utils/types/courses.types';

describe('CoursesController', () => {
  let controller: CoursesController;
  let service: CoursesService;

  const mockCoursesService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockCourse = new CreateCourseDto();
  mockCourse.title = 'NestJS Basics';
  mockCourse.description = 'Learn NestJS';
  mockCourse.level = CourseLevel.Advanced;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [{ provide: CoursesService, useValue: mockCoursesService }],
    }).compile();

    controller = module.get<CoursesController>(CoursesController);
    service = module.get<CoursesService>(CoursesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of courses', async () => {
      mockCoursesService.findAll.mockResolvedValue([mockCourse]);
      const result = await controller.findAll();
      expect(result).toEqual([mockCourse]);
    });
  });

  describe('findOne', () => {
    it('should return a course by id', async () => {
      mockCoursesService.findOne.mockResolvedValue(mockCourse);
      const result = await controller.findOne(1);
      expect(result).toEqual(mockCourse);
    });
  });

  describe('create', () => {
    it('should create a course', async () => {
      mockCoursesService.create.mockResolvedValue(mockCourse);
      const result = await controller.create(mockCourse);
      console.log('created', result);
      expect(result).toEqual(mockCourse);
    });
  });

  describe('update', () => {
    it('should update a course', async () => {
      mockCoursesService.update.mockResolvedValue(mockCourse);
      const result = await controller.update(1, mockCourse);
      expect(result).toEqual(mockCourse);
    });
  });

  describe('remove', () => {
    it('should remove a course', async () => {
      await controller.remove(1);
      expect(mockCoursesService.remove).toHaveBeenCalledWith(1);
    });
  });
});
