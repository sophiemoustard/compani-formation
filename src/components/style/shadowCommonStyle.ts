import { StyleSheet } from 'react-native';

export const shadowCommonStyle = (
  backgroundColor:string,
  borderRadius: number,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  relativePosition: {top: number, bottom: number, left: number, right: number}
) => StyleSheet.create({
  shadow: {
    position: 'absolute',
    top: relativePosition.top,
    bottom: relativePosition.bottom,
    left: relativePosition.left,
    right: relativePosition.right,
    backgroundColor,
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    zIndex: -1,
  },
});
