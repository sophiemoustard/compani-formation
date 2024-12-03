import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { GREY } from '../../../styles/colors';
import styles from './styles';

type CheckboxOptionsType = { label: string, value: string };

interface MultipleCheckboxListProps {
  optionsGroups: CheckboxOptionsType[][],
  groupTitles: string[],
  setOptions: (options: string[]) => void,
}

interface RenderItemProps {
  item: { label: string, value: string },
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
}: MultipleCheckboxListProps) => {
  const [checkedList, setCheckedList] = useState<string[]>([]);

  useEffect(() => setOptions(checkedList), [setOptions, checkedList]);

  const onPressCheckbox = (value: string) => setCheckedList((prevValue) => {
    const indexToRemove = prevValue.indexOf(value);
    if (indexToRemove !== -1) {
      prevValue.splice(indexToRemove, 1);
      return [...prevValue];
    }
    const newArray = [...prevValue, value];
    return newArray;
  });

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
