import { View } from 'react-native';
import { E_LEARNING, ON_SITE, REMOTE } from '../../../core/data/constants';
import LiveCell from '../../../components/steps/LiveCell';
import ELearningCell from '../../../components/ELearningCell';
import styles from './styles';

export const renderStepCell = ({ item, index }, course, route) => {
  if ([ON_SITE, REMOTE].includes(item.type)) {
    return <LiveCell step={item} slots={course?.slots} index={index} />;
  }

  if (item.type === E_LEARNING) {
    return <ELearningCell step={item} index={index} profileId={route.params.courseId}
      endedActivity={route.params.endedActivity} />;
  }

  return null;
};

export const renderSeparator = () => <View style={styles.separator} />;
