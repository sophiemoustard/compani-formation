import { Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { GREY, PINK } from '../../../styles/colors';
import styles from './styles';

interface RenderItemProps {
  itemLabel: string,
  isChecked: boolean,
  disabled?: boolean,
  onPressCheckbox: () => void
}

const Checkbox = ({ itemLabel, isChecked, disabled = false, onPressCheckbox }: RenderItemProps) => {
  const iconName = isChecked ? 'check-box' : 'check-box-outline-blank';
  const iconColor = isChecked ? PINK[500] : GREY[600];
  const textStyle = isChecked ? styles.text : { ...styles.text, color: GREY[600] };

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPressCheckbox}
      disabled={disabled}>
      <MaterialIcons style={styles.icon} size={24} name={iconName} color={iconColor} />
      <Text style={textStyle}>{itemLabel}</Text>
    </TouchableOpacity>
  );
};
export default Checkbox;
