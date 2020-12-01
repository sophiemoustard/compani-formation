import React, { useRef, useState } from 'react';
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
  sendToParent: (value: string, field: string) => void,
}
const CreateAccountForm = ({ index, datas, isLoading, sendToParent }: CreateAccountProps) => {
  const scrollRef = useRef<ScrollView>(null);
  const [data, setData] = useState(datas);

  const enterData = (text, i) => {
    setData(prevData => prevData
      .map((d, j) => (i === j
        ? {
          ...d,
          value: text,
          isValid: fieldVerification(d.field, data.length > 1
            ? data.map((da, k) => (i === k ? text : da.value))
            : text),
        }
        : { ...d }
      )));
  };

  const saveData = () => {
    if (data.every(d => d.isValid)) {
      sendToParent(data[0].value, data[0].field);
      if (index !== 3) navigate(`field-${index + 1}`);
    }
  };

  const fieldVerification = (field, value) => {
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
        isValid: fieldVerification(d.field, data.length > 1 ? data.map(da => da.value) : d.value),
      })));
    saveData();
    setData(prevData => prevData.map(d => ({ ...d, isTouched: true })));
  };

  const renderFields = () => <ScrollView contentContainerStyle={styles.container} ref={scrollRef}
    showsVerticalScrollIndicator={false} >
    {data.map((d, i) => <View style={styles.input} key={`container${i}`}>
      <NiInput key={`content${i}`} caption={d.caption} value={d.value} type={d.type}
        autoFocus={i === 0} darkMode={false} onChangeText={text => enterData(text, i)}
        validationMessage={!d.isValid && d.isTouched ? d.errorMessage : ''} />
    </View>)}
    <View style={styles.footer}>
      <NiButton caption="Valider" onPress={validData} loading={isLoading}
        bgColor={PINK[500]} color={WHITE} borderColor={PINK[500]} />
    </View>
  </ScrollView>;

  return (
    <>
      <Text style={styles.title}>{data[0].title}</Text>
      {renderFields()}
    </>
  );
};

export default CreateAccountForm;
