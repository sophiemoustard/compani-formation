import { StyleSheet } from 'react-native';
import { PINK } from '../../styles/colors';
import { MARGIN, PADDING } from '../../styles/metrics';
import { FIRA_SANS_BOLD, FIRA_SANS_REGULAR } from '../../styles/fonts';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: MARGIN.SM,
    paddingHorizontal: PADDING.MD,
  },
  title: {
    ...FIRA_SANS_BOLD.LG,
    marginBottom: MARGIN.MD,
    width: '80%',
  },
  subTitle: {
    ...FIRA_SANS_REGULAR.MD,
  },
  body: {
    ...FIRA_SANS_REGULAR.MD,
    marginTop: MARGIN.MD,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginHorizontal: MARGIN.LG,
    marginVertical: MARGIN.MD,
  },
  button: {
    ...FIRA_SANS_REGULAR.MD,
    color: PINK[500],
  },
});

export default styles;
