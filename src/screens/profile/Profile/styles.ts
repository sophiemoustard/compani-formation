import { StyleSheet } from 'react-native';
import { GREY, PINK, TRANSPARENT_GREY, WHITE } from '../../../styles/colors';
import { BORDER_RADIUS, BORDER_WIDTH, MARGIN, PADDING } from '../../../styles/metrics';
import { FIRA_SANS_BOLD, FIRA_SANS_MEDIUM, FIRA_SANS_REGULAR, NUNITO_SEMI, NUNITO_LIGHT } from '../../../styles/fonts';

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: PADDING.LG,
  },
  identityContainer: {
    marginBottom: MARGIN.XL,
    marginHorizontal: MARGIN.XL,
  },
  identityBackground: {
    height: 264,
    alignItems: 'center',
  },
  profileImage: {
    height: 88,
    width: 88,
    borderRadius: BORDER_RADIUS.XXL,
    borderWidth: BORDER_WIDTH,
    borderColor: TRANSPARENT_GREY,
  },
  profileImageEdit: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: BORDER_RADIUS.XXL,
    borderColor: GREY[200],
    borderWidth: BORDER_WIDTH,
    backgroundColor: WHITE,
    padding: PADDING.SM,
  },
  name: {
    ...FIRA_SANS_BOLD.LG,
  },
  company: {
    ...FIRA_SANS_MEDIUM.MD,
    textAlign: 'center',
    marginBottom: MARGIN.LG,
  },
  courses: {
    ...NUNITO_SEMI.XS,
    textAlign: 'center',
    width: 88,
  },
  numberOfCourses: {
    ...NUNITO_LIGHT.XL,
    color: PINK[500],
  },
  sectionDelimiter: {
    borderWidth: BORDER_WIDTH,
    borderColor: GREY[200],
  },
  contact: {
    ...FIRA_SANS_BOLD.LG,
    marginBottom: MARGIN.MD,
  },
  subTitle: {
    ...FIRA_SANS_REGULAR.MD,
    color: GREY[600],
  },
  contactsContainer: {
    marginHorizontal: MARGIN.XL,
    marginTop: MARGIN.SM,
    marginBottom: MARGIN.MD,
  },
  infos: {
    ...FIRA_SANS_MEDIUM.MD,
    marginBottom: MARGIN.MD,
  },
  logOutButton: {
    marginVertical: MARGIN.MD,
    marginHorizontal: MARGIN.XL,
  },
  passwordButton: {
    marginTop: MARGIN.SM,
  },
  elipse: {
    width: '100%',
    position: 'absolute',
    top: 16,
    resizeMode: 'contain',
  },
  fellow: {
    width: 104,
    height: 152,
    marginVertical: MARGIN.XL,
  },
  footer: {
    alignItems: 'center',
  },
});

export default styles;
