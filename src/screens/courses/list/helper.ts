import { BlendedCourseType } from '../../../types/CourseTypes';
import { StepType } from '../../../types/StepTypes';
import companiDates from '../../../core/helpers/dates/companiDates';
import { E_LEARNING } from '../../../core/data/constants';

export const getElearningSteps = (steps: StepType[]) => steps.filter(step => step.type === E_LEARNING);

export const isForthcoming = (course: BlendedCourseType) => {
  const noSlotPlannedAndSlotToPlan = !course.slots.length && course.slotsToPlan.length;
  const everySlotsToBeStarted = course.slots.every(slot => companiDates().isBefore(slot.startDate));

  return noSlotPlannedAndSlotToPlan || everySlotsToBeStarted;
};

export const isCompleted = (course: BlendedCourseType) => {
  const noSlotToPlan = !course.slotsToPlan.length;
  const everySlotsHaveBeenCompleted = course.slots.every(slot => companiDates().isAfter(slot.endDate));

  return noSlotToPlan && everySlotsHaveBeenCompleted;
};

export const isInProgress = (course: BlendedCourseType) => !isForthcoming(course) && !isCompleted(course);
