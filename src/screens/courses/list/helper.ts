import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import { BlendedCourseType, CourseType } from '../../../types/CourseTypes';
import { StepType, NextSlotsStepType, ELearningStepType } from '../../../types/StepTypes';
import CompaniDate from '../../../core/helpers/dates/companiDates';
import { ascendingSort } from '../../../core/helpers/dates/utils';
import { E_LEARNING } from '../../../core/data/constants';

export const getElearningSteps = (steps: StepType[]): ELearningStepType[] =>
  steps.filter(step => step.type === E_LEARNING) as ELearningStepType[];

export const isForthcoming = (course: BlendedCourseType): boolean => {
  const noSlotPlannedAndSlotToPlan = !course.slots.length && !!course.slotsToPlan.length;
  const everySlotsToBeStarted = course.slots.every(slot => CompaniDate().isBefore(slot.startDate));

  return noSlotPlannedAndSlotToPlan || everySlotsToBeStarted;
};

export const isCompleted = (course: BlendedCourseType): boolean => {
  const noSlotToPlan = !course.slotsToPlan.length;
  const everySlotsHaveBeenCompleted = course.slots.every(slot => CompaniDate().isAfter(slot.endDate));

  return noSlotToPlan && everySlotsHaveBeenCompleted;
};

export const isInProgress = (course: BlendedCourseType): boolean => !isForthcoming(course) && !isCompleted(course);

const formatCourseStep = (stepId: string, course: BlendedCourseType, stepSlots): NextSlotsStepType => {
  const courseSteps = get(course, 'subProgram.steps') || [];
  const nextSlots = stepSlots[stepId].filter(slot => CompaniDate().isBefore(slot.endDate));
  const slotsSorted = stepSlots[stepId].sort(ascendingSort('endDate'));
  const stepIndex = courseSteps.map(step => step._id).indexOf(stepId);

  return {
    name: get(course, 'subProgram.program.name'),
    misc: course.misc || '',
    stepIndex,
    firstSlot: nextSlots[0].endDate,
    type: nextSlots[0].step.type,
    slots: slotsSorted.map(s => s.endDate),
    _id: slotsSorted[0]._id,
    progress: courseSteps[stepIndex].progress,
    courseId: course._id,
  };
};

const formatCourseStepsList = (course: CourseType): NextSlotsStepType[] => {
  if (course.subProgram.isStrictlyELearning) return [];

  const blendedCourse = course as BlendedCourseType;
  const stepSlots = groupBy(blendedCourse.slots.filter(s => get(s, 'step._id')), s => s.step._id);

  return Object.keys(stepSlots)
    .filter(stepId => stepSlots[stepId].some(slot => CompaniDate().isBefore(slot.endDate)))
    .map(stepId => formatCourseStep(stepId, blendedCourse, stepSlots));
};

export const formatNextSteps = (courses: CourseType[]): NextSlotsStepType[] => courses.map(formatCourseStepsList)
  .flat()
  .filter(step => step.slots && step.slots.length)
  .sort(ascendingSort('firstSlot'));
