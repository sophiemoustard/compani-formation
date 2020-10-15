import { Platform, StyleSheet } from 'react-native';
import { WHITE } from '../styles/colors';

const styles = (statusBarVisible: boolean, StatusBarHeight: number) => {
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarHeight;

  return StyleSheet.create({
    statusBar: {
      display: statusBarVisible ? 'flex' : 'none',
      backgroundColor: WHITE,
      height: STATUSBAR_HEIGHT,
    },
  });
};

export default styles;
