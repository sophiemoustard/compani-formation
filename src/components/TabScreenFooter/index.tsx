import { View, Image } from 'react-native';
import styles from './styles';

interface TabScreenFooterType {
  drawingSource: { uri: string },
}

const TabScreenFooter = ({ drawingSource } : TabScreenFooterType) => (
  <View style={styles.footer}>
    <Image style={styles.elipse} source={require('../../../assets/images/log_out_background.png')} />
    <Image source={drawingSource} style={styles.drawing} />
  </View>
);

export default TabScreenFooter;
