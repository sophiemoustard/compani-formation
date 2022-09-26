import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import CalendarIcon from '../../CalendarIcon';
import StepCellTitle from '../StepCellTitle';
import { NextSlotsStepType } from '../../../types/StepTypes';
import { StateType } from '../../../types/store/StoreType';
import { CourseModeType } from '../../../types/store/CourseStoreType';
import { LEARNER } from '../../../core/data/constants';
import styles from './styles';

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
      <CalendarIcon slots={slots} progress={progress?.live} />
      <StepCellTitle index={stepIndex} name={name} type={type} misc={misc} />
    </TouchableOpacity>
  );
};

const mapStateToProps = (state: StateType) => ({ mode: state.courses.mode });

export default connect(mapStateToProps)(NextStepCell);
