import { StyleSheet } from 'react-native';
import { FIRA_SANS_BOLD } from '../../../styles/fonts';
import { GREY, YELLOW } from '../../../styles/colors';
import { BORDER_RADIUS, BORDER_WIDTH, MARGIN } from '../../../styles/metrics';

const styles = (progressPercentage: number) => StyleSheet.create({
  container: {
    marginHorizontal: MARGIN.MD,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: GREY[200],
    borderRadius: BORDER_RADIUS.SM,
    height: 8,
    flex: 1,
    justifyContent: 'flex-start',
  },
  content: {
    display: 'flex',
    backgroundColor: YELLOW[500],
    borderRadius: BORDER_RADIUS.XL,
    width: `${progressPercentage}%`,
    borderRightWidth: BORDER_WIDTH,
    borderColor: GREY[100],
  },
  text: {
    ...FIRA_SANS_BOLD.SM,
    color: GREY[600],
  },
});

export default styles;
