import { Text, View } from 'react-native';
import styles from './styles';
import { WHITE } from '../../styles/colors';
import { ICON } from '../../styles/metrics';
import FeatherButton from '../../components/icons/FeatherButton';

type CourseAboutHeaderProps = {
  title: string,
  courseName: string,
  onGoBack: () => void,
}

const CourseAboutHeader = ({ title, courseName, onGoBack }: CourseAboutHeaderProps) => (
  <>
    <View style={styles.header} />
    <View style={styles.content}>
      <FeatherButton name='arrow-left' onPress={onGoBack} size={ICON.MD} color={WHITE} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.courseName}>{courseName}</Text>
      </View>
    </View>
  </>
);

export default CourseAboutHeader;
