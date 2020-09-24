import { StyleSheet } from 'react-native';

export const shadowCommonStyle = (backgroundColor:string, borderRadius: number) => StyleSheet.create({
  shadow: {
    position: 'absolute',
    top: 0,
    bottom: -3,
    left: 0,
    right: 0,
    backgroundColor,
    zIndex: -1,
    borderRadius,
  },
});
