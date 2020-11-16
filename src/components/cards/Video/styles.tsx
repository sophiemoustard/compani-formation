import { StyleSheet } from 'react-native';
import { TRANSPARENT_DARK_GREY } from '../../../styles/colors';
import { ICON, MARGIN, CARD_MEDIA_MAX_HEIGHT, BORDER_RADIUS } from '../../../styles/metrics';

const styles = StyleSheet.create({
  media: {
    height: CARD_MEDIA_MAX_HEIGHT,
    marginBottom: MARGIN.LG,
  },
  play: {
    position: 'relative',
    alignSelf: 'center',
    top: (CARD_MEDIA_MAX_HEIGHT + ICON.XXL) / 2,
    zIndex: 1,
    backgroundColor: TRANSPARENT_DARK_GREY,
    borderRadius: BORDER_RADIUS.XXL,
  },
});

export default styles;
