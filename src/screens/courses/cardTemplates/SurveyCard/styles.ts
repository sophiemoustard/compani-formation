import { StyleSheet } from 'react-native';
import { FIRA_SANS_REGULAR } from '../../../../styles/fonts';
import { GREY, PINK } from '../../../../styles/colors';
import { MARGIN, PADDING } from '../../../../styles/metrics';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GREY[100],
  },
  container: {
    marginHorizontal: MARGIN.LG,
  },
  surveyScoreContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  question: {
    ...FIRA_SANS_REGULAR.LG,
    color: GREY[800],
    justifyContent: 'flex-start',
  },
  labelContainer: {
    paddingTop: PADDING.XL,
    paddingHorizontal: PADDING.LG,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    width: 88,
    color: PINK[500],
  },
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },
});

export default styles;
