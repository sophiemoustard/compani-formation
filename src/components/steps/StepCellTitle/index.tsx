import { View, Text } from 'react-native';
import { StepType } from '../../../types/StepTypes';
import { CourseModeType } from '../../../types/CourseTypes';
import CompaniDuration from '../../../core/helpers/dates/companiDurations';
import { stepTypeOptions, E_LEARNING, TRAINER, LONG_DURATION_H_MM, PT0S } from '../../../core/data/constants';
import styles from './styles';

type StepCellTitleProps = {
  name: StepType['name'],
  type: StepType['type'],
  index: number,
  mode: CourseModeType,
  misc?: string,
  theoreticalDuration?: string,
}

const StepCellTitle = ({ name, type, index, mode, misc = '', theoreticalDuration = PT0S }: StepCellTitleProps) => (
  <View style={styles.textContainer}>
    <Text style={styles.stepType}>
      {`ÉTAPE ${index + 1} - ${stepTypeOptions[type]}`}
      {type === E_LEARNING && !CompaniDuration(theoreticalDuration).isEquivalentTo(PT0S) &&
        ` (${CompaniDuration(theoreticalDuration).format(LONG_DURATION_H_MM)})`}
    </Text>
    <Text lineBreakMode={'tail'} numberOfLines={2} style={styles.stepName}>{name}</Text>
    {mode === TRAINER && type !== E_LEARNING && <Text style={styles.misc} numberOfLines={1}>{misc}</Text>}
  </View>
);

export default StepCellTitle;
