import { StyleSheet } from 'react-native';

const styles = (statusBarVisible: boolean = false) => StyleSheet.create({
  statusBar: {
    display: statusBarVisible ? 'flex' : 'none',
  },
});

export default styles;
