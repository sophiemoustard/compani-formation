import { View, Text } from 'react-native';
import { StepType } from '../../../types/StepTypes';
import { CourseModeType } from '../../../types/CourseTypes';
import { stepTypeOptions, E_LEARNING, TRAINER } from '../../../core/data/constants';
import { formatDuration } from '../../../core/helpers/utils';
import styles from './styles';

type StepCellTitleProps = {
  name: StepType['name'],
  type: StepType['type'],
  index: number,
  mode?: CourseModeType | null,
  misc?: string,
  theoreticalHours?: number,
}

const StepCellTitle = ({ name, type, index, mode = null, misc = '', theoreticalHours = 0 }: StepCellTitleProps) => (
  <View style={styles.textContainer}>
    <Text style={styles.stepType}>
      {`ÉTAPE ${index + 1} - ${stepTypeOptions[type]}`}
      {type === E_LEARNING && !!theoreticalHours && ` (${formatDuration(theoreticalHours)})`}
    </Text>
    <Text lineBreakMode={'tail'} numberOfLines={2} style={styles.stepName}>{name}</Text>
    {mode === TRAINER && <Text style={styles.misc} numberOfLines={1}>{misc}</Text>}
  </View>
);

export default StepCellTitle;
