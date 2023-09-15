import { useState, createRef, useReducer, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import Authentication from '../../api/authentication';
import Companies from '../../api/companies';
import { RootStackParamList } from '../../types/NavigationType';
import FeatherButton from '../../components/icons/FeatherButton';
import NiPrimaryButton from '../../components/form/PrimaryButton';
import ExitModal from '../../components/ExitModal';
import NiInput from '../../components/form/Input';
import NiErrorMessage from '../../components/ErrorMessage';
import NiSecondaryButton from '../../components/form/SecondaryButton';
import CompanySearchModal from '../../components/CompanySearchModal';
import { errorReducer, initialErrorState, SET_ERROR } from '../../reducers/error';
import { CompanyType } from '../../types/CompanyType';
import { isIOS } from '../../core/data/constants';
import { GREY } from '../../styles/colors';
import { ICON, IS_LARGE_SCREEN, MARGIN } from '../../styles/metrics';
import styles from './styles';
import { FIRA_SANS_REGULAR } from '../../styles/fonts';

interface LoginCodeFormProps extends StackScreenProps<RootStackParamList> {}

const LoginCodeForm = ({ navigation }: LoginCodeFormProps) => {
  const [exitConfirmationModal, setExitConfirmationModal] = useState<boolean>(false);
  const [code, setCode] = useState<string[]>(['', '', '', '']);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, dispatchError] = useReducer(errorReducer, initialErrorState);
  const inputRefs: any[] = [
    createRef(),
    createRef(),
    createRef(),
    createRef(),
  ];
  const [lastname, setLastname] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const scrollRef = useRef<ScrollView>(null);
  const [companyOptions, setCompanyOptions] = useState<CompanyType[]>([]);
  const [company, setCompany] = useState<{ _id: string, name: string }>({ _id: '', name: '' });
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const goBack = () => {
    setExitConfirmationModal(false);
    navigation.goBack();
  };

  const onChangeText = (char: string, index: number) => {
    setCode(code.map((c, i) => (i === index ? char : c)));
    if (!!char && index + 1 < 4) inputRefs[index + 1].focus();
  };

  const goPreviousAfterEdit = (index: number) => {
    inputRefs[index].focus();
    if (code[index] !== '') onChangeText('', index);
  };

  const checkKeyValue = (key: TextInputKeyPressEventData['key'], idx: number) => {
    if (key === 'Backspace') {
      if (!idx && code[idx] === '') return;

      if (code[idx] === '') goPreviousAfterEdit(idx - 1);
      else onChangeText('', idx);
    }
  };

  const checkUserExists = async () => {
    try {
      setIsLoading(true);

      const isCodeInvalid = !(code.every(char => !!char && Number.isInteger(Number(char))));
      if (isCodeInvalid) {
        return dispatchError({ type: SET_ERROR, payload: 'Le format du code est incorrect' });
      }

      if (!lastname || !firstname) {
        return dispatchError({ type: SET_ERROR, payload: 'Champ(s) invalide(s) : tous les champs sont requis' });
      }

      const formattedCode = `${code[0]}${code[1]}${code[2]}${code[3]}`;
      const checkToken = await Authentication.passwordToken({ firstname, lastname }, formattedCode);

      navigation.navigate(
        'PasswordReset',
        { userId: checkToken.user._id, email: checkToken.user.email, token: checkToken.token }
      );
      return null;
    } catch (e: any) {
      if (e.response.status === 404) return dispatchError({ type: SET_ERROR, payload: e.response.data.message });
      return dispatchError({ type: SET_ERROR, payload: 'Oops, une erreur est survenue' });
    } finally {
      setIsLoading(false);
    }
  };

  const chooseCompany = async () => {
    try {
      const fetchCompanies = await Companies.listNotLogged();
      setCompanyOptions(fetchCompanies);
    } catch (e) {
      console.error(e);
    } finally {
      setIsModalOpened(true);
    }
  };

  const onRequestClose = (value: CompanyType) => {
    if (value) setCompany(value);
    setIsModalOpened(false);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} style={styles.keyboard}
        keyboardVerticalOffset={IS_LARGE_SCREEN ? MARGIN.MD : MARGIN.XS}>
        <View style={styles.goBack}>
          <FeatherButton name='x-circle' onPress={() => setExitConfirmationModal(true)} size={ICON.MD}
            color={GREY[600]} disabled={isLoading} />
          <ExitModal onPressConfirmButton={goBack} visible={exitConfirmationModal}
            onPressCancelButton={() => setExitConfirmationModal(false)}
            title="Êtes-vous sûr(e) de cela ?" contentText={'Vous reviendrez à la page d\'accueil.'} />
        </View>
        <ScrollView contentContainerStyle={styles.container} ref={scrollRef} showsVerticalScrollIndicator={false}>
          <View style={styles.sectionContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Code de connexion donné par le formateur</Text>
              <Text style={styles.required}>*</Text>
            </View>
            <View style={styles.section}>
              {inputRefs.map((k, idx) => (
                <TextInput ref={(r) => { inputRefs[idx] = r; }} key={`${k}${idx}`} value={code[idx]}
                  onChangeText={char => onChangeText(char, idx)} style={styles.number} placeholder={'_'}
                  onKeyPress={({ nativeEvent }) => checkKeyValue(nativeEvent.key, idx)}
                  maxLength={1} keyboardType={'number-pad'} autoFocus={idx === 0} editable={!isLoading} />))}
            </View>
          </View>
          <NiInput caption={'Nom'} value={lastname} onChangeText={setLastname} type={'text'} required
            disabled={isLoading} customStyle={styles.input} />
          <NiInput caption={'Prénom'} value={firstname} onChangeText={setFirstname} type={'text'} required
            disabled={isLoading} customStyle={styles.input} />
          <View style={styles.sectionContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Structure</Text>
              <Text style={styles.required}>*</Text>
            </View>
            {!company.name && <NiSecondaryButton caption="Renseigner ma structure" onPress={chooseCompany}
              font={FIRA_SANS_REGULAR.MD} />}
            {company.name && <View style={styles.section}>
              <TouchableOpacity onPress={chooseCompany}>
                <Text style={styles.company}>{company.name}</Text>
              </TouchableOpacity>
            </View>}
          </View>
          <CompanySearchModal visible={isModalOpened} onRequestClose={onRequestClose} companyOptions={companyOptions} />
          <View style={styles.footer}>
            <NiErrorMessage message={error.message} show={error.value} />
            <NiPrimaryButton caption="Valider" onPress={checkUserExists} loading={isLoading} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginCodeForm;
