import { StyleSheet } from 'react-native';
import { MARGIN } from '../../../../styles/metrics';
import cardsStyle from '../../../../styles/cards';

const styles = (imgHeight: number) => StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: MARGIN.MD,
  },
  image: {
    ...cardsStyle.media,
    height: imgHeight,
    marginBottom: MARGIN.LG,
  },
});

export default styles;
