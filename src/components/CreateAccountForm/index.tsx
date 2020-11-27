import React from 'react';
import { Text, View } from 'react-native';
import NiInput from '../../components/form/Input';
import styles from './styles';

interface CreateAccountProps {
  type: string,
  fields: Array<string>,
  title: string,
  captions: Array<string>,
  datas: Array<string>,
  onChangeText: (text: string, focus: string) => void,
  isUnvalid: Array<boolean>,
  errorMessages: Array<string>,
  isTouched: Array<boolean>,
}
const CreateAccountForm = ({
  type,
  fields,
  title,
  captions,
  datas,
  onChangeText,
  isUnvalid,
  errorMessages,
  isTouched,
}: CreateAccountProps) => {
  const renderFields = () => fields.map((_, i) => <View style={styles.input} key={fields[i]}>
    <NiInput key={fields[i]} caption={captions[i]} value={datas[i]} type={type} autoFocus={i === 0}
      darkMode={false} onChangeText={text => onChangeText(text, fields[i])}
      validationMessage={isUnvalid[i] && isTouched[i] ? errorMessages[i] : ''} />
  </View>);

  return (
    <>
      <Text style={styles.title}>{title}</Text>
      {renderFields()}
    </>
  );
};

export default CreateAccountForm;
