import { StyleSheet } from 'react-native';
import { TRANSPARENT_DARK_GREY } from '../../../styles/colors';
import { MARGIN, CARD_MEDIA_MAX_HEIGHT, BORDER_RADIUS, ICON } from '../../../styles/metrics';
import { isWeb } from '../../../core/data/constants';

const styles = (isMediaLoading: boolean) => StyleSheet.create({
  media: {
    height: CARD_MEDIA_MAX_HEIGHT,
    marginBottom: MARGIN.LG,
    display: !isMediaLoading ? 'flex' : 'none',
    position: isWeb ? 'relative' : undefined,
  },
  play: {
    position: 'absolute',
    alignSelf: 'center',
    top: (CARD_MEDIA_MAX_HEIGHT - ICON.XXL) / 2,
    zIndex: 1,
    backgroundColor: TRANSPARENT_DARK_GREY,
    borderRadius: BORDER_RADIUS.XXL,
  },
});

export default styles;
