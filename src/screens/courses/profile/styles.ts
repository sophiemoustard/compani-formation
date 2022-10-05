import { StyleSheet } from 'react-native';
import { WHITE, GREY, PINK } from '../../../styles/colors';
import { BORDER_RADIUS, BORDER_WIDTH, BUTTON_HEIGHT, MARGIN, PADDING } from '../../../styles/metrics';
import {
  NUNITO_SEMI,
  FIRA_SANS_MEDIUM,
  FIRA_SANS_BOLD,
  FIRA_SANS_ITALIC,
  FIRA_SANS_REGULAR,
} from '../../../styles/fonts';

const styles = StyleSheet.create({
  separator: {
    marginBottom: MARGIN.MD,
  },
  flatList: {
    marginVertical: MARGIN.MD,
  },
  progressBarContainer: {
    marginBottom: MARGIN.MD,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: MARGIN.XL,
  },
  progressBarText: {
    ...NUNITO_SEMI.XS,
    color: GREY[600],
  },
  buttonsContainer: {
    marginVertical: MARGIN.LG,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginVertical: MARGIN.LG,
    marginHorizontal: MARGIN.XL,
  },
  buttonContent: {
    borderRadius: BORDER_RADIUS.SM,
    paddingVertical: PADDING.MD,
    paddingHorizontal: PADDING.XXL,
    marginHorizontal: MARGIN.MD,
    backgroundColor: PINK[500],
    height: BUTTON_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  certificateContent: {
    flexDirection: 'row',
  },
  certificateText: {
    ...FIRA_SANS_MEDIUM.LG,
    color: WHITE,
    paddingLeft: PADDING.MD,
  },
  sectionTitle: {
    ...FIRA_SANS_BOLD.LG,
    marginBottom: MARGIN.MD,
    color: GREY[900],
  },
  sectionContainer: {
    margin: MARGIN.MD,
  },
  adminButton: {
    width: '95%',
    marginBottom: 24,
  },
  footer: {
    paddingVertical: PADDING.LG,
  },
  italicText: {
    ...FIRA_SANS_ITALIC.MD,
    color: GREY[600],
    marginBottom: MARGIN.LG,
  },
  uploadContainer: {
    marginHorizontal: MARGIN.MD,
    marginTop: MARGIN.MD,
  },
  uploadButton: {
    marginBottom: MARGIN.SM,
  },
  editButton: {
    position: 'absolute',
    top: -10,
    right: 0,
    borderRadius: BORDER_RADIUS.XXL,
    borderColor: GREY[200],
    borderWidth: BORDER_WIDTH,
    backgroundColor: WHITE,
    padding: PADDING.MD,
  },
  savedSheetContainer: {
    flexDirection: 'row',
    paddingVertical: PADDING.LG,
  },
  savedSheetContent: {
    marginHorizontal: MARGIN.MD,
    alignItems: 'center',
  },
  savedSheetText: {
    ...FIRA_SANS_REGULAR.MD,
  },
});

export default styles;
