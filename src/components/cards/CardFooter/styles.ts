import { StyleSheet } from 'react-native';
import { BUTTON_HEIGHT, MARGIN } from '../../../styles/metrics';

type StylesPropsType = {
  removeLeft: boolean,
  removeRight?: boolean,
}

type JustifyContentType = 'space-between' | 'flex-end' | 'flex-start';

const styles = ({ removeLeft, removeRight }: StylesPropsType) => {
  let justifyContent: JustifyContentType = 'space-between';
  if (removeLeft) justifyContent = 'flex-end';
  else if (removeRight) justifyContent = 'flex-start';

  return StyleSheet.create({
    container: {
      minHeight: BUTTON_HEIGHT,
      display: 'flex',
      flexDirection: 'row',
      justifyContent,
      marginBottom: MARGIN.XL,
      marginHorizontal: MARGIN.LG,
    },
  });
};

export default styles;
