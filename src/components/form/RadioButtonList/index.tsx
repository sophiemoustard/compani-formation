import { useEffect, useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import { GREY } from '../../../styles/colors';

type RadioButtonOptionsType = { label: string, value: string };

interface RadioButtonProps {
  options: RadioButtonOptionsType[],
  setOption: (option: string) => void,
}

interface RenderItemProps {
  item: { label: string, value: string },
  checkedRadioButton: string,
  onPressCheckbox: (value: string) => void
}

const renderItem = ({ item, checkedRadioButton, onPressCheckbox }: RenderItemProps) => {
  const iconName = checkedRadioButton === item.value ? 'radio-button-checked' : 'radio-button-unchecked';
  const iconColor = checkedRadioButton === item.value ? GREY[900] : GREY[600];
  const textStyle = checkedRadioButton === item.value ? styles.text : { ...styles.text, color: GREY[600] };

  return (
    <TouchableOpacity key={item.label} style={styles.container} onPress={() => onPressCheckbox(item.value)}>
      <MaterialIcons style={styles.icon} size={20} name={iconName} color={iconColor} />
      <Text style={textStyle}>{item.label}</Text>
    </TouchableOpacity>
  );
};

const RadioButtonList = ({ options, setOption }: RadioButtonProps) => {
  const [checkedRadioButton, setCheckedRadioButton] = useState<string>('');

  useEffect(() => setOption(checkedRadioButton), [setOption, checkedRadioButton]);

  const onPressCheckbox = (value: string) => setCheckedRadioButton(prevValue => (prevValue === value ? '' : value));

  return (
    <>
      {options.map(item => renderItem({ item, checkedRadioButton, onPressCheckbox }))}
    </>
  );
};

export default RadioButtonList;
