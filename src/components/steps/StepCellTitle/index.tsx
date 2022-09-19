import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { StepType } from '../../../types/StepTypes';
import { stepTypeOptions, E_LEARNING } from '../../../core/data/constants';
import { formatDuration } from '../../../core/helpers/utils';
import { StateType } from '../../../types/store/StoreType';
import styles from './styles';

type StepCellTitleProps = {
  name: StepType['name'],
  type: StepType['type'],
  index: number,
  isLearner: boolean,
  misc?: string,
  theoreticalHours?: number,
}

const StepCellTitle = ({ name, type, index, isLearner, misc = '', theoreticalHours = 0 }: StepCellTitleProps) => (
  <View style={styles.textContainer}>
    <Text style={styles.stepType}>
      {`ÉTAPE ${index + 1} - ${stepTypeOptions[type]}`}
      {type === E_LEARNING && !!theoreticalHours && ` (${formatDuration(theoreticalHours)})`}
    </Text>
    <Text lineBreakMode={'tail'} numberOfLines={2} style={styles.stepName}>{name}</Text>
    { !isLearner && <Text style={styles.misc} numberOfLines={1}>{misc}</Text>}
  </View>
);

const mapStateToProps = (state: StateType) => ({ isLearner: state.courses.isLearner });

export default connect(mapStateToProps)(StepCellTitle);
