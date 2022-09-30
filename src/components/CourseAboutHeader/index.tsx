import { Text, View } from 'react-native';
import styles from './styles';
import { WHITE } from '../../styles/colors';
import { ICON } from '../../styles/metrics';
import FeatherButton from '../../components/icons/FeatherButton';

type CourseAboutHeaderProps = {
  screenTitle: string,
  courseTitle: string,
  goBack: () => void,
}

const CourseAboutHeader = ({ screenTitle, courseTitle, goBack }: CourseAboutHeaderProps) => (
  <View style={styles.content}>
    <FeatherButton name='arrow-left' onPress={goBack} size={ICON.MD} color={WHITE} />
    <View style={styles.titleContainer}>
      <Text style={styles.screenTitle}>{screenTitle}</Text>
      <Text style={styles.courseTitle}>{courseTitle}</Text>
    </View>
  </View>
);

export default CourseAboutHeader;
