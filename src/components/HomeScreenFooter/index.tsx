import { View, Image } from 'react-native';
import styles from './styles';

interface HomeScreenFooterType {
  source: { uri: string },
}

const HomeScreenFooter = ({ source } : HomeScreenFooterType) => (
  <View style={styles.footer}>
    <Image style={styles.elipse} source={require('../../../assets/images/home_footer_ellipse.png')} />
    <Image source={source} style={styles.drawing} />
  </View>
);

export default HomeScreenFooter;
