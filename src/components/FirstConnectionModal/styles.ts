import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    flexGrow: 1,
    height: '25%',
    flexDirection: 'column',
  },
  goBack: {
    alignSelf: 'flex-end',
  },
  modalContent: {
    flexGrow: 2,
    justifyContent: 'space-evenly',
  },
});

export default styles;
