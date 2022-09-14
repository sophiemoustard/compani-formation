import { View, Image } from 'react-native';
import styles from './styles';

interface TabScreenFooterType {
  source: { uri: string },
}

const TabScreenFooter = ({ source } : TabScreenFooterType) => (
  <View style={styles.footer}>
    <Image style={styles.elipse} source={require('../../../assets/images/log_out_background.png')} />
    <Image source={source} style={styles.drawing} />
  </View>
);

export default TabScreenFooter;
