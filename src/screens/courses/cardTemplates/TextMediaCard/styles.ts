import { StyleSheet } from 'react-native';
import { MARGIN, PADDING } from '../../../../styles/metrics';
import cardsStyle from '../../../../styles/cards';

const styles = (imgHeight: number) => StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: MARGIN.MD,
    paddingBottom: PADDING.XL,
  },
  image: {
    ...cardsStyle.media,
    height: imgHeight,
  },
});

export default styles;
