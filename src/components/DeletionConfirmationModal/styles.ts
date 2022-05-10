import { StyleSheet } from 'react-native';
import { ORANGE, PINK } from '../../styles/colors';
import { BORDER_RADIUS, MARGIN, PADDING } from '../../styles/metrics';
import { FIRA_SANS_BOLD, FIRA_SANS_REGULAR } from '../../styles/fonts';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: MARGIN.SM,
    paddingHorizontal: PADDING.MD,
  },
  title: {
    ...FIRA_SANS_BOLD.LG,
    marginBottom: MARGIN.MD,
  },
  warningMessage: {
    backgroundColor: ORANGE[100],
    padding: PADDING.LG,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: BORDER_RADIUS.MD,
    marginBottom: MARGIN.MD,
  },
  warningText: {
    ...FIRA_SANS_REGULAR.MD,
    color: ORANGE[900],
    width: '85%',
  },
  body: {
    ...FIRA_SANS_REGULAR.MD,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    marginHorizontal: MARGIN.LG,
    marginVertical: MARGIN.MD,
    flexDirection: 'row',
  },
  button: {
    ...FIRA_SANS_REGULAR.MD,
    color: PINK[500],
  },
});

export default styles;
