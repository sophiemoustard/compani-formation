import { View, Text } from 'react-native';
import { DataOptionsType } from '../../../store/attendanceSheets/slice';
import styles from './styles';
import Checkbox from '../Checkbox';

interface MultipleCheckboxListProps {
  optionsGroups: DataOptionsType[][],
  groupTitles: string[],
  setOptions?: (options: string[]) => void,
  checkedList: string[],
  disabled?: boolean,
}

const MultipleCheckboxList = ({
  optionsGroups,
  groupTitles,
  setOptions = () => {},
  checkedList,
  disabled = false,
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
          <Text style={styles.groupLabel}>{groupTitles[index]}</Text>
          {options.map((item) => {
            const isChecked = checkedList.includes(item.value as string);
            return <Checkbox key={item.value} itemLabel={item.label} isChecked={isChecked} disabled={disabled}
              onPressCheckbox={() => onPressCheckbox(item.value)} />;
          })}
        </View>
      ))}
    </View>
  );
};

export default MultipleCheckboxList;
