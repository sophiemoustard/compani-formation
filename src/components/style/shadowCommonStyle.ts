import { StyleSheet } from 'react-native';

export const shadowCommonStyle = (backgroundColor:string, borderRadius: number, size: any) => StyleSheet.create({
  shadow: {
    position: 'absolute',
    top: size.top,
    bottom: size.bottom,
    left: size.left,
    right: size.right,
    backgroundColor,
    zIndex: -1,
    borderRadius,
  },
});
