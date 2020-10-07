import { StyleSheet } from 'react-native';

export const shadowCommonStyle = (
  borderRadius: number,
  relativePosition: {top: number, bottom: number, left: number, right: number}
) => StyleSheet.create({
  shadow: {
    position: 'absolute',
    top: relativePosition.top,
    bottom: relativePosition.bottom,
    left: relativePosition.left,
    right: relativePosition.right,
    borderRadius,
    zIndex: -1,
  },
});
