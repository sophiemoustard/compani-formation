import { StyleSheet } from 'react-native';
import { ICON, MARGIN, CARD_MEDIA_MAX_HEIGHT } from '../../../../styles/metrics';

const styles = (imgHeight: number) => StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: MARGIN.MD,
  },
  media: {
    height: imgHeight,
    marginBottom: MARGIN.LG,
  },
  play: {
    position: 'relative',
    alignSelf: 'center',
    top: (CARD_MEDIA_MAX_HEIGHT + ICON.XXL) / 2,
    zIndex: 1,
  },
});

export default styles;
