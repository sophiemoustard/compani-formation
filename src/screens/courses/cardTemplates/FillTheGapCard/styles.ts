import { StyleSheet } from 'react-native';
import { GREY, TRANSPARENT_LIGHT_GREY } from '../../../../styles/colors';
import { BORDER_RADIUS, INPUT_HEIGHT, MARGIN, GAP_WIDTH, BORDER_WIDTH, PADDING } from '../../../../styles/metrics';
import { FIRA_SANS_MEDIUM } from '../../../../styles/fonts';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
  questionContainer: {
    ...FIRA_SANS_MEDIUM.MD,
    marginHorizontal: MARGIN.LG,
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: PADDING.XXL,
    paddingBottom: PADDING.XL,
    paddingHorizontal: PADDING.LG,
    marginBottom: MARGIN.MD,
    backgroundColor: TRANSPARENT_LIGHT_GREY,
  },
  question: {
    ...FIRA_SANS_MEDIUM.MD,
    lineHeight: 40,
    color: GREY[800],
  },
  gapContainer: {
    width: GAP_WIDTH,
    height: INPUT_HEIGHT,
    borderRadius: BORDER_RADIUS.MD,
    backgroundColor: GREY[200],
    marginHorizontal: MARGIN.MD,
  },
  answersContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  answer: {
    ...FIRA_SANS_MEDIUM.MD,
    height: 40,
    borderWidth: BORDER_WIDTH,
    borderColor: GREY[200],
    borderRadius: BORDER_RADIUS.MD,
    padding: PADDING.MD,
    textAlign: 'center',
    color: GREY[800],
    marginHorizontal: MARGIN.XS,
    marginBottom: MARGIN.MD,
  },
});

export default styles;
