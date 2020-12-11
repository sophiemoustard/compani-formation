import React, { useEffect, useState } from 'react';
import { Text, View, BackHandler, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import NiInput from '../../components/form/Input';
import NiButton from '../../components/form/Button';
import styles from './styles';
import { PINK, WHITE } from '../../styles/colors';
import { PHONE_REGEX } from '../../core/data/constants';
import { NavigationType } from '../../types/NavigationType';
import { IS_LARGE_SCREEN, MARGIN } from '../../styles/metrics';

interface CreateAccountProps {
  navigation: NavigationType,
  index: number
  data: any,
  isLoading: boolean,
  setData: (data: any, i: number) => void,
  goBack: (index: number) => void,
  create: () => void;
}
const CreateAccountForm = ({ navigation, index, data, isLoading, setData, goBack, create }: CreateAccountProps) => {
  const isIOS = Platform.OS === 'ios';
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const style = styles(isKeyboardOpen && !IS_LARGE_SCREEN);

  const hardwareBackPress = () => {
    goBack(index);
    return true;
  };

  useEffect(() => { BackHandler.addEventListener('hardwareBackPress', hardwareBackPress); });

  const onChangeText = (text, fieldToChangeIndex) => {
    setData(
      data.map((dataItem, fieldIndex) => {
        if (fieldIndex === fieldToChangeIndex) {
          return {
            ...dataItem,
            value: text,
            isValid: isFieldValid(
              dataItem.field,
              data.map((item, valueIndex) => (fieldToChangeIndex === valueIndex ? text : item.value))
            ),
          };
        }
        return dataItem;
      }), index
    );
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
    if (data.every(d => d.isValid)) {
      if (index !== 3) navigation.navigate(`create-account-screen-${index + 1}`);
      else create();
    }
  };

  return (
    <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} style={style.keyboardAvoidingView}
      keyboardVerticalOffset={IS_LARGE_SCREEN ? MARGIN.MD : MARGIN.XS}>
      <ScrollView contentContainerStyle={style.container} showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='always'>
        <Text style={style.title}>{data[0].title}</Text>
        {data.map((d, i) => <View style={style.input} key={`container${i}`}>
          <NiInput key={`content${i}`} caption={d.caption} value={d.value} type={d.type}
            darkMode={false} onChangeText={text => onChangeText(text, i)} isKeyboardOpen={setIsKeyboardOpen}
            validationMessage={!d.isValid && d.isValidationAttempted ? d.errorMessage : ''} required={d.required} />
        </View>)}
        <View style={style.footer}>
          <NiButton caption="Valider" onPress={validData} loading={isLoading}
            bgColor={PINK[500]} color={WHITE} borderColor={PINK[500]} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateAccountForm;
