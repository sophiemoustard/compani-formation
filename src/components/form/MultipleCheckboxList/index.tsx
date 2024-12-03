import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { GREY } from '../../../styles/colors';
import { DataOptionsType } from '../../../store/attendanceSheets/slice';
import styles from './styles';

interface MultipleCheckboxListProps {
  optionsGroups: DataOptionsType[][],
  groupTitles: string[],
  setOptions: (options: string[]) => void,
  checkedList: string[],
}

interface RenderItemProps {
  item: DataOptionsType,
  checkedList: string[],
  onPressCheckbox: (value: string) => void
}

const renderItem = ({ item, checkedList, onPressCheckbox }: RenderItemProps) => {
  const iconName = checkedList.includes(item.value) ? 'check-box' : 'check-box-outline-blank';
  const iconColor = checkedList.includes(item.value) ? GREY[900] : GREY[600];
  const textStyle = checkedList.includes(item.value) ? styles.text : { ...styles.text, color: GREY[600] };

  return (
    <TouchableOpacity key={item.label} style={styles.itemContainer} onPress={() => onPressCheckbox(item.value)}>
      <MaterialIcons style={styles.icon} size={20} name={iconName} color={iconColor} />
      <Text style={textStyle}>{item.label}</Text>
    </TouchableOpacity>
  );
};

const MultipleCheckboxList = ({
  optionsGroups = [],
  groupTitles = [],
  setOptions,
  checkedList = [],
}: MultipleCheckboxListProps) => {
  const onPressCheckbox = (value: string) => {
    const indexToRemove = checkedList.indexOf(value);
    if (indexToRemove !== -1) {
      checkedList.splice(indexToRemove, 1);
      setOptions([...checkedList]);
    } else {
      setOptions([...checkedList, value]);
    }
  };

  return (
    <View style={styles.container}>
      {optionsGroups.map((options, index) => (
        <View key={index} style={styles.groupContainer}>
          <View style={styles.groupTitleContainer}>
            <Text style={styles.groupLabel}>{groupTitles[index]}</Text>
          </View>
          <View style={styles.optionsContainer}>
            {options.map(item => renderItem({ item, checkedList, onPressCheckbox }))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default MultipleCheckboxList;
