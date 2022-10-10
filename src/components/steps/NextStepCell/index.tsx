import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CalendarIcon from '../../CalendarIcon';
import StepCellTitle from '../StepCellTitle';
import { NextSlotsStepType } from '../../../types/StepTypes';
import { CourseModeType } from '../../../types/store/CourseStoreType';
import { LEARNER, TRAINER } from '../../../core/data/constants';
import styles from './styles';
import { PINK, PURPLE } from '../../../styles/colors';

type NextStepCellProps = {
  nextSlotsStep: NextSlotsStepType,
  mode: CourseModeType,
}

const NextStepCell = ({ nextSlotsStep, mode }: NextStepCellProps) => {
  const { stepIndex, slots, progress, courseId, name, type, misc } = nextSlotsStep;
  const navigation = useNavigation();

  const goToCourse = () => {
    navigation.navigate(mode === LEARNER ? 'LearnerCourseProfile' : 'TrainerCourseProfile', { courseId });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={goToCourse}>
      <CalendarIcon slots={slots} progress={progress?.live} color={mode === TRAINER ? PURPLE[800] : PINK[500]} />
      <StepCellTitle index={stepIndex} name={name} type={type} misc={misc} showMisc={mode === TRAINER} />
    </TouchableOpacity>
  );
};

export default NextStepCell;
