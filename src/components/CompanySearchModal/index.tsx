// @ts-nocheck

import { useState } from 'react';
import { TouchableOpacity, TextInput, FlatList, Text } from 'react-native';
import { sortStrings } from '../../core/helpers/utils';
import { TRANSPARENT_GRADIENT, WHITE } from '../../styles/colors';
import { CompanyType } from '../../types/CompanyType';
import { INPUT_HEIGHT } from '../../styles/metrics';
import BottomModal from '../BottomModal';
import FooterGradient from '../design/FooterGradient';
import styles from './styles';

interface CompanySearchModalProps {
  onRequestClose: (value) => void,
  visible: boolean,
  companyOptions: CompanyType[],
}

const CompanySearchModal = ({
  onRequestClose,
  visible,
  companyOptions,
}: CompanySearchModalProps) => {
  const [answer, setAnswer] = useState<string>('');

  const onPressCompany = (companyId) => {
    const selectedCompany = companyOptions.find(company => company._id === companyId) || { _id: '', name: '' };

    onRequestClose(selectedCompany);
    setAnswer('');
  };

  const renderCompany = (company: CompanyType) => (
    <TouchableOpacity style={styles.separator} onPress={() => onPressCompany(company._id)}>
      <Text style={styles.company}>{company.name}</Text>
    </TouchableOpacity>
  );

  const getDisplayedCompanies = () => companyOptions
    .filter(company => company.name.toLowerCase().match(new RegExp(`^${answer.toLowerCase()}`)))
    .sort((a, b) => sortStrings(a.name, b.name));

  const resetModal = () => {
    setAnswer('');
    onRequestClose({ _id: '', name: '' });
  };

  return (
    <BottomModal onRequestClose={resetModal} visible={visible}>
      <TextInput placeholder="Choisir une structure" value={answer} onChangeText={setAnswer}
        style={!answer ? [styles.input, styles.placeholder] : styles.input} />
      <FlatList keyExtractor={item => `${item._id}`} data={getDisplayedCompanies()}
        renderItem={({ item }) => renderCompany(item)} />
      <FooterGradient colors={[TRANSPARENT_GRADIENT, WHITE]} bottomPosition={0} height={INPUT_HEIGHT}/>
    </BottomModal>
  );
};

export default CompanySearchModal;
