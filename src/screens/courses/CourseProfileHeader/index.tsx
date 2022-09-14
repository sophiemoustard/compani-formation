import { View, Text, ImageBackground, StyleProp, ViewStyle, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FeatherButton from '../../../components/icons/FeatherButton';
import { WHITE } from '../../../styles/colors';
import { ICON } from '../../../styles/metrics';
import styles from './styles';

interface CourseProfileHeaderProps {
  source:ImageSourcePropType,
  goBack: () => void,
  title: string,
}

const CourseProfileHeader = ({
  source,
  goBack,
  title,
}: CourseProfileHeaderProps) => (
  <ImageBackground source={source} imageStyle={styles.image}
    style={{ resizeMode: 'cover' } as StyleProp<ViewStyle>}>
    <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.4)']} style={styles.gradient} />
    <View style={styles.header}>
      <FeatherButton style={styles.arrow} onPress={goBack} name="arrow-left" color={WHITE} size={ICON.MD}
        iconStyle={styles.arrowShadow} />
      <Text style={styles.title}>{title}</Text>
    </View>
  </ImageBackground>
);

export default CourseProfileHeader;
