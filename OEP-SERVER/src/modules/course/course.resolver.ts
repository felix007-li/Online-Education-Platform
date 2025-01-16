import { CurOrgId } from './../../common/decorators/current-org.decorator';
import { DeepPartial, FindOptionsWhere, Like } from 'typeorm';
import { Course } from './models/course.entity';
import {
  COURSE_CREATE_FAIL,
  COURSE_DEL_FAIL,
  COURSE_NOT_EXIST,
  COURSE_UPDATE_FAIL,
} from './../../common/constants/code';
import { Result } from '@/common/dto/result.type';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/common/guards/auth.guard';
import { SUCCESS } from '@/common/constants/code';
import { CourseResult, CourseResults } from './dto/result-course.output';
import { CourseInput, PartialCourseInput } from './dto/course.input';
import { CourseType } from './dto/course.type';
import { CourseService } from './course.service';
import { CurUserId } from '@/common/decorators/current-user.decorator';
import { PageInput } from '@/common/dto/page.input';

@Resolver(() => CourseType)
@UseGuards(GqlAuthGuard)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Query(() => CourseResult)
  async getCourseInfo(@Args('id') id: string): Promise<CourseResult> {
    const result = await this.courseService.findById(id);
    if (result) {
      return {
        code: SUCCESS,
        data: result,
        message: 'Get course successfully',
      };
    }
    return {
      code: COURSE_NOT_EXIST,
      message: 'Course does not exist',
    };
  }

  @Mutation(() => CourseResult)
  async commitCourseInfo(
    @Args('params') params: PartialCourseInput,
    @CurUserId() userId: string,
    @CurOrgId() orgId: string,
    @Args('id', { nullable: true }) id: string,
  ): Promise<Result> {
    if (!id) {
      const res = await this.courseService.create({
        ...params,
        // teachers: params.teachers.map((item) => ({ id: item })),
        createdBy: userId,
        org: {
          id: orgId,
        },
      });
      if (res) {
        return {
          code: SUCCESS,
          message: 'Create course successfully',
        };
      }
      return {
        code: COURSE_CREATE_FAIL,
        message: 'Create course failed',
      };
    }
    const course = await this.courseService.findById(id);
    if (course) {
      const courseInput: DeepPartial<Course> = {
        ...params,
        updatedBy: userId,
        // teachers: course.teachers,
      };
    //   if (params.teachers) {
    //     courseInput.teachers = params.teachers.map((item) => ({ id: item }));
    //   }
      const res = await this.courseService.updateById(course.id, courseInput);
      if (res) {
        return {
          code: SUCCESS,
          message: 'Updated course successfully',
        };
      }
      return {
        code: COURSE_UPDATE_FAIL,
        message: 'Updated course failed',
      };
    }
    return {
      code: COURSE_NOT_EXIST,
      message: 'Course does not exist',
    };
  }

  @Query(() => CourseResults)
  async getCourses(
    @Args('page') page: PageInput,
    @CurUserId() userId: string,
    // @CurOrgId() orgId: string,
    @Args('name', { nullable: true }) name?: string,
  ): Promise<CourseResults> {
    const { pageNum, pageSize } = page;
    const where: FindOptionsWhere<Course> = {
      createdBy: userId,
    //   org: {
    //     id: orgId,
    //   },
    };
    if (name) {
      where.name = Like(`%${name}%`);
    }
    const [results, total] = await this.courseService.findCourses({
      start: (pageNum - 1) * pageSize,
      length: pageSize,
      where,
    });
    return {
      code: SUCCESS,
      data: results,
      page: {
        pageNum,
        pageSize,
        total,
      },
      message: 'Get courses succesfully',
    };
  }

  @Mutation(() => Result)
  async deleteCourse(
    @Args('id') id: string,
    @CurUserId() userId: string,
  ): Promise<Result> {
    const result = await this.courseService.findById(id);
    if (result) {
      const delRes = await this.courseService.deleteById(id, userId);
      if (delRes) {
        return {
          code: SUCCESS,
          message: 'Delete course successfully',
        };
      }
      return {
        code: COURSE_DEL_FAIL,
        message: 'Delete course failed',
      };
    }
    return {
      code: COURSE_NOT_EXIST,
      message: 'Course does not exist',
    };
  }
}
