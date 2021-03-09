import { Platform, StyleSheet } from 'react-native';
import { PINK, WHITE } from '../styles/colors';
import { FIRA_SANS_BOLD } from '../styles/fonts';

const styles = (statusBarVisible: boolean = false, StatusBarHeight: number = 20) => {
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarHeight;

  return StyleSheet.create({
    statusBar: {
      display: statusBarVisible ? 'flex' : 'none',
      backgroundColor: WHITE,
      height: STATUSBAR_HEIGHT,
    },
    iconText: {
      ...FIRA_SANS_BOLD.SM,
      color: PINK[500],
    },
    iconContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: 110,
      marginBottom: 24,
      marginTop: 8,
    },
  });
};

export default styles;
