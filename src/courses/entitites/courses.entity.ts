import { CourseLevel } from '../../utils/types/courses.types';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryColumn('int', { generated: true })
  id: number;

  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'enum', enum: CourseLevel, nullable: false })
  level: CourseLevel;
}
