import { Platform, StyleSheet } from 'react-native';
import { PINK, WHITE } from '../styles/colors';
import { FIRA_SANS_BOLD } from '../styles/fonts';
import { MARGIN, TAB_BAR_HEIGHT, TAB_BAR_LABEL_WIDTH } from '../styles/metrics';

const styles = (statusBarVisible: boolean = false, StatusBarHeight: number = 20) => {
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarHeight;

  return StyleSheet.create({
    statusBar: {
      display: statusBarVisible ? 'flex' : 'none',
      backgroundColor: WHITE,
      height: STATUSBAR_HEIGHT,
    },
    tabBar: {
      height: TAB_BAR_HEIGHT,
    },
    iconContainer: {
      alignItems: 'center',
      width: TAB_BAR_LABEL_WIDTH,
      marginVertical: MARGIN.SM,
    },
    iconText: {
      ...FIRA_SANS_BOLD.SM,
      color: PINK[500],
    },
  });
};

export default styles;
