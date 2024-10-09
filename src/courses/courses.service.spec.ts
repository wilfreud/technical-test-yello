import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { Repository } from 'typeorm';
import { Course } from './entitites/courses.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { CourseLevel } from '../utils/types/courses.types';

describe('CoursesService', () => {
  let service: CoursesService;
  let courseRepository: Repository<Course>;

  const mockCourseRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  const mockCourse = {
    id: 1,
    title: 'NestJS Basics',
    description: 'Learn NestJS',
    level: CourseLevel.Beginner,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        { provide: getRepositoryToken(Course), useValue: mockCourseRepository },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    courseRepository = module.get<Repository<Course>>(
      getRepositoryToken(Course),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of courses', async () => {
      mockCourseRepository.find.mockResolvedValue([mockCourse]);
      const result = await service.findAll();
      expect(result).toEqual([mockCourse]);
    });
  });

  describe('findOne', () => {
    it('should return a course by id', async () => {
      mockCourseRepository.findOneBy.mockResolvedValue(mockCourse);
      const result = await service.findOne(1);
      expect(result).toEqual(mockCourse);
    });

    it('should throw an error if course not found', async () => {
      mockCourseRepository.findOneBy.mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(BadRequestException);
    });
  });

  describe('create', () => {
    it('should successfully create and return a course', async () => {
      mockCourseRepository.create.mockReturnValue(mockCourse);
      mockCourseRepository.save.mockResolvedValue(mockCourse);

      const result = await service.create(mockCourse);
      expect(result).toEqual(mockCourse);
    });
  });

  describe('update', () => {
    it('should update a course successfully', async () => {
      mockCourseRepository.findOneBy.mockResolvedValue(mockCourse);
      mockCourseRepository.save.mockResolvedValue(mockCourse);

      const result = await service.update(1, mockCourse);
      expect(result).toEqual(mockCourse);
    });
  });

  describe('remove', () => {
    it('should remove a course successfully', async () => {
      mockCourseRepository.findOneBy.mockResolvedValue(mockCourse);
      await service.remove(1);
      expect(mockCourseRepository.remove).toHaveBeenCalledWith(mockCourse);
    });
  });
});
