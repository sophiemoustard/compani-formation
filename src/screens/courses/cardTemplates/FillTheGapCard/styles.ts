import { StyleSheet } from 'react-native';
import { GREY } from '../../../../styles/colors';
import { BORDER_RADIUS, INPUT_HEIGHT, MARGIN, GAP_WIDTH } from '../../../../styles/metrics';

const styles = (textColor: string, backgroundColor: string) => StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
  gapContainer: {
    backgroundColor: GREY[200],
    borderRadius: BORDER_RADIUS.MD,
    marginHorizontal: MARGIN.SM,
    marginBottom: MARGIN.SM,
    height: INPUT_HEIGHT,
    width: GAP_WIDTH,
  },
  answerContainer: {
    height: INPUT_HEIGHT,
    width: GAP_WIDTH,
  },
  footerContainer: {
    backgroundColor,
  },
});

export default styles;
