import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import CalendarIcon from '../../CalendarIcon';
import StepCellTitle from '../StepCellTitle';
import { NextSlotsStepType } from '../../../types/StepTypes';
import { StateType } from '../../../types/store/StoreType';
import styles from './styles';

type NextStepCellProps = {
  nextSlotsStep: NextSlotsStepType,
  color: string,
  isLearner: boolean,
}

const NextStepCell = ({ nextSlotsStep, color, isLearner }: NextStepCellProps) => {
  const { stepIndex, slots, progress, courseId, name, type } = nextSlotsStep;
  const navigation = useNavigation();

  const goToCourse = () => {
    navigation.navigate(isLearner ? 'LearnerCourseProfile' : 'TrainerCourseProfile', { courseId });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={goToCourse}>
      <CalendarIcon slots={slots} progress={progress?.live} color={color}/>
      <StepCellTitle index={stepIndex} name={name} type={type} />
    </TouchableOpacity>
  );
};

const mapStateToProps = (state: StateType) => ({ isLearner: state.courses.isLearner });

export default connect(mapStateToProps)(NextStepCell);
