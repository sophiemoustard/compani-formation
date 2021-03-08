import { Platform, StyleSheet } from 'react-native';
import { PINK, WHITE } from '../styles/colors';
import { FIRA_SANS_BOLD } from '../styles/fonts';

const styles = (statusBarVisible: boolean = false, StatusBarHeight: number = 0) => {
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarHeight;

  return StyleSheet.create({
    statusBar: {
      display: statusBarVisible ? 'flex' : 'none',
      backgroundColor: WHITE,
      height: STATUSBAR_HEIGHT,
    },
    iconText: {
      ...FIRA_SANS_BOLD.MD,
      color: PINK[500],
    },
  });
};

export default styles;
