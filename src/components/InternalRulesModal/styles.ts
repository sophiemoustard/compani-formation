import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, MARGIN, PADDING } from '../../styles/metrics';
import { FIRA_SANS_BOLD, FIRA_SANS_REGULAR, FIRA_SANS_ITALIC, FIRA_SANS_MEDIUM } from '../../styles/fonts';
import { MODAL_BACKDROP_GREY, WHITE } from '../../styles/colors';

export default StyleSheet.create({
  modalContainer: {
    paddingTop: PADDING.XXXL,
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: MODAL_BACKDROP_GREY,
  },
  modalContent: {
    display: 'flex',
    backgroundColor: WHITE,
    borderTopLeftRadius: BORDER_RADIUS.MD,
    borderTopRightRadius: BORDER_RADIUS.MD,
    width: '100%',
    height: '100%',
    padding: PADDING.LG,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: MARGIN.LG,
  },
  goBack: {
    alignSelf: 'flex-end',
  },
  title: {
    ...FIRA_SANS_BOLD.LG,
  },
  italicText: {
    ...FIRA_SANS_ITALIC.MD,
    textAlign: 'left',
    marginBottom: MARGIN.MD,
  },
  articleTitle: {
    ...FIRA_SANS_MEDIUM.MD,
    textAlign: 'left',
    marginBottom: MARGIN.SM,
  },
  sectionTitle: {
    ...FIRA_SANS_BOLD.MD,
    textAlign: 'left',
    marginBottom: MARGIN.SM,
  },
  contentText: {
    ...FIRA_SANS_REGULAR.MD,
    textAlign: 'left',
    marginBottom: MARGIN.MD,
  },
});
