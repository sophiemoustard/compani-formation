import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import NiInput from '../../components/form/Input';
import NiButton from '../../components/form/Button';
import styles from './styles';
import { PINK, WHITE } from '../../styles/colors';
import { PHONE_REGEX } from '../../core/data/constants';
import { navigate } from '../../navigationRef';

interface CreateAccountProps {
  index: number
  datas: any,
  isLoading: boolean,
  setAccount: (valueTosave, fieldToSave, dataToUpdate, indexToUpdate) => void,
}
const CreateAccountForm = ({ index, datas, isLoading, setAccount }: CreateAccountProps) => {
  const [data, setData] = useState(datas);

  const onChangeText = (text, fieldToChangeIndex) => {
    setData(prevData => prevData
      .map((dataItem, fieldIndex) => {
        if (fieldIndex === fieldToChangeIndex) {
          return {
            ...dataItem,
            value: text,
            isValid: isFieldValid(dataItem.field, prevData.length > 1
              ? prevData.map((item, valueIndex) => (fieldToChangeIndex === valueIndex ? text : item.value))
              : text),
          };
        }
        return dataItem;
      }));
  };

  const saveData = () => {
    if (data.every(d => d.isValid)) {
      setAccount(data[0].value, data[0].field, data, index);
      if (index !== 3) navigate(`create-account-screen-${index + 1}`);
    }
  };

  const isFieldValid = (field, value) => {
    switch (field) {
      case 'lastname':
        return value !== '';
      case 'phone':
        return value.match(PHONE_REGEX) || !value;
      case 'password':
        return value[0].length >= 6;
      case 'confirmedPassword':
        return value[0] === value[1];
      default:
        return true;
    }
  };

  const validData = () => {
    setData(prevData => prevData
      .map(d => ({
        ...d,
        isValid: isFieldValid(d.field, data.length > 1 ? prevData.map(da => da.value) : d.value),
        isValidationAttempted: true,
      })));
    saveData();
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} >
      <Text style={styles.title}>{data[0].title}</Text>
      {data.map((d, i) => <View style={styles.input} key={`container${i}`}>
        <NiInput key={`content${i}`} caption={d.caption} value={d.value} type={d.type}
          autoFocus={i === 0} darkMode={false} onChangeText={text => onChangeText(text, i)}
          validationMessage={!d.isValid && d.isValidationAttempted ? d.errorMessage : ''} required={d.required} />
      </View>)}
      <View style={styles.footer}>
        <NiButton caption="Valider" onPress={validData} loading={isLoading}
          bgColor={PINK[500]} color={WHITE} borderColor={PINK[500]} />
      </View>
    </ScrollView>
  );
};

export default CreateAccountForm;
