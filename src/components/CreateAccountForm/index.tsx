import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import NiInput from '../../components/form/Input';
import NiButton from '../../components/form/Button';
import styles from './styles';
import { PINK, WHITE } from '../../styles/colors';
import { PHONE_REGEX } from '../../core/data/constants';
import { NavigationType } from '../../types/NavigationType';

interface CreateAccountProps {
  navigation: NavigationType,
  index: number
  data: any,
  isLoading: boolean,
  setAccount: (valueTosave, fieldToSave) => void,
  setData: (data: any, i: number) => void,
}
const CreateAccountForm = ({ navigation, index, data, isLoading, setAccount, setData }: CreateAccountProps) => {
  const onChangeText = (text, fieldToChangeIndex) => {
    setData(
      data.map((dataItem, fieldIndex) => {
        if (fieldIndex === fieldToChangeIndex) {
          return {
            ...dataItem,
            value: text,
            isValid: isFieldValid(dataItem.field, data.map((item, valueIndex) => (fieldToChangeIndex === valueIndex
              ? text
              : item.value))),
          };
        }
        return dataItem;
      }), index
    );
  };

  const saveData = () => {
    if (data.every(d => d.isValid)) {
      setAccount(data[0].value, data[0].field);
      if (index !== 3) navigation.navigate(`create-account-screen-${index + 1}`);
    }
  };

  const isFieldValid = (field, value) => {
    switch (field) {
      case 'lastname':
        return value[0] !== '';
      case 'phone':
        return !!value[0].match(PHONE_REGEX) || !value[0];
      case 'password':
        return value[0].length >= 6;
      case 'confirmedPassword':
        return value[0] === value[1];
      default:
        return true;
    }
  };

  const validData = () => {
    setData(
      data.map(d => ({
        ...d,
        isValid: isFieldValid(d.field, data.map(da => da.value)),
        isValidationAttempted: true,
      })), index
    );
    saveData();
  };

  return (<>
    <Text style={styles.title}>{data[0].title}</Text>
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} >
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
  </>
  );
};

export default CreateAccountForm;
