import React, { useState, useEffect } from 'react';
import { TouchableOpacity, TextInput, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import { TRANSPARENT_GRADIENT, WHITE } from '../../../styles/colors';
import CompanyLinkRequest from '../../../api/companyLinkRequests';
import Users from '../../../api/users';
import { ActionType, ActionWithoutPayloadType } from '../../../types/store/StoreType';
import MainActions from '../../../store/main/actions';
import { UserType } from '../../../types/UserType';
import { CompanyType } from '../../../types/CompanyType';
import { INPUT_HEIGHT } from '../../../styles/metrics';
import BottomModal from '../../BottomModal';
import ValidationModal from '../ValidationModal';
import FooterGradient from '../../design/FooterGradient';
import styles from './styles';

interface CompanySearchModalProps {
  onRequestClose: () => void,
  setLoggedUser: (user: UserType) => void,
  visible: boolean,
  loggedUser: UserType
}

const CompanySearchModal = ({ onRequestClose, setLoggedUser, visible, loggedUser }: CompanySearchModalProps) => {
  const [answer, setAnswer] = useState<string>('');
  const [companyList, setCompanyList] = useState<CompanyType[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<CompanyType>({ _id: '', name: '' });
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const renderCompany = name => (
    <TouchableOpacity style={styles.separator} onPress={() => selectCompany(name)}>
      <Text style={styles.company}>{name}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    async function fetchData() {
      const fetchCompanies = await CompanyLinkRequest.companyList();
      setCompanyList(fetchCompanies);
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setDisplayedCompanies = () => companyList
    .filter(company => !!company.name.toLowerCase().match(new RegExp(`^${answer.toLowerCase()}`)));

  const selectCompany = (name) => {
    setSelectedCompany(companyList.find(company => company.name === name) || { _id: '', name: '' });
    setIsModalOpened(true);
  };

  const createCompanyLinkRequest = async () => {
    try {
      await CompanyLinkRequest.createCompanyLinkRequest({ company: selectedCompany._id });
      const user = await Users.getById(loggedUser._id);
      setLoggedUser(user);
    } catch (e) {
      console.error(e);
    } finally {
      resetModals();
    }
  };

  const resetModals = () => {
    setIsModalOpened(false);
    setAnswer('');
    setSelectedCompany({ _id: '', name: '' });
    onRequestClose();
  };

  return (
    <BottomModal onRequestClose={resetModals} visible={visible}>
      <TextInput placeholder="Choisir une structure" value={answer} onChangeText={setAnswer}
        style={!answer.length ? [styles.input, styles.placeholder] : styles.input} />
      <FlatList keyExtractor={item => `${item._id}`} data={setDisplayedCompanies()}
        renderItem={({ item }) => renderCompany(item.name)} />
      <FooterGradient colors={[TRANSPARENT_GRADIENT, WHITE]} bottomPosition={0} height={INPUT_HEIGHT}/>
      <ValidationModal visible={isModalOpened} company={selectedCompany}
        onPressCancelButton={() => setIsModalOpened(false)} onPressConfirmButton={createCompanyLinkRequest} />
    </BottomModal>
  );
};

const mapStateToProps = state => ({ loggedUser: state.main.loggedUser });

const mapDispatchToProps = (dispatch: ({ type }: ActionType | ActionWithoutPayloadType) => void) => ({
  setLoggedUser: (user: UserType) => dispatch(MainActions.setLoggedUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanySearchModal);
