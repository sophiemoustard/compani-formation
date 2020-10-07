import { StyleSheet } from 'react-native';

export const shadowCommonStyle = (
  customStyle: any,
  relativePosition: {top: number, bottom: number, left: number, right: number}
) => StyleSheet.create({
  shadow: {
    position: 'absolute',
    top: customStyle.top ? customStyle.top : relativePosition.top,
    bottom: customStyle.bottom ? customStyle.bottom : relativePosition.bottom,
    left: customStyle.left ? customStyle.left : relativePosition.left,
    right: customStyle.right ? customStyle.right : relativePosition.right,
    zIndex: -1,
  },
});
