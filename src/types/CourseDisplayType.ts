import { BlendedCourseType } from './CourseTypes';

export type CourseDisplayType = {
  title: string,
  source: { uri: string },
  imageStyle: object,
  countStyle: object,
  courses: BlendedCourseType[],
}
