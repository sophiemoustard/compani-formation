import { View, Text } from 'react-native';
import { StepType } from '../../../types/StepTypes';
import { stepTypeOptions, E_LEARNING } from '../../../core/data/constants';
import { formatDuration } from '../../../core/helpers/utils';
import styles from './styles';

type StepCellTitleProps = {
  name: StepType['name'],
  type: StepType['type'],
  index: number,
  misc?: string,
  theoreticalHours?: number,
}

const StepCellTitle = ({ name, type, index, misc, theoreticalHours = 0 }: StepCellTitleProps) => (
  <View style={styles.textContainer}>
    <Text style={styles.stepType}>
      {`ÉTAPE ${index + 1} - ${stepTypeOptions[type]}`}
      {type === E_LEARNING && !!theoreticalHours && ` (${formatDuration(theoreticalHours)})`}
    </Text>
    <Text lineBreakMode={'tail'} numberOfLines={2} style={styles.stepName}>{name}</Text>
    <Text style={styles.misc} numberOfLines={1}>{misc}</Text>
  </View>
);

export default StepCellTitle;
