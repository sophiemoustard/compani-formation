import { StyleSheet } from 'react-native';
import { GREY, PINK } from '../../styles/colors';
import { BORDER_RADIUS, BORDER_WIDTH, MARGIN, PADDING } from '../../styles/metrics';
import { FIRA_SANS_BOLD, FIRA_SANS_MEDIUM, FIRA_SANS_REGULAR, NUNITO_SEMI, NUNITO_LIGHT } from '../../styles/fonts';

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: PADDING.LG,
  },
  identityContainer: {
    alignItems: 'center',
    marginBottom: MARGIN.XL,
    marginHorizontal: MARGIN.XL,
  },
  identityBackground: {
    height: 264,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    alignItems: 'center',
  },
  profileImage: {
    height: 88,
    width: 88,
    borderRadius: BORDER_RADIUS.XXL,
  },
  name: {
    ...FIRA_SANS_BOLD.LG,
    textAlign: 'center',
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
    width: '100%',
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
    ...FIRA_SANS_MEDIUM.LG,
    marginBottom: MARGIN.MD,
  },
  logOutButton: {
    marginVertical: MARGIN.MD,
    marginHorizontal: MARGIN.XL,
  },
  elipse: {
    width: '100%',
    position: 'absolute',
    top: 16,
    resizeMode: 'contain',
  },
  fellow: {
    width: 108,
    height: 150,
    marginVertical: MARGIN.XL,
  },
  footer: {
    alignItems: 'center',
  },
});

export default styles;
