import React, { useState, useReducer, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import NiModal from '../Modal';
import NiInput from '../form/Input';
import Users from '../../api/users';
import FeatherButton from '../icons/FeatherButton';
import { HIT_SLOP, ICON } from '../../styles/metrics';
import { errorReducer, initialErrorState, RESET_ERROR, SET_ERROR } from '../../reducers/error';
import { GREY, ORANGE } from '../../styles/colors';
import commonStyle from '../../styles/common';

interface DeletionModalProps {
  visible: boolean,
  loggedUserId: string,
  setVisible: (value) => void,
  setConfirmationModal: () => void,
}

const DeletionModal = ({
  visible,
  loggedUserId,
  setVisible,
  setConfirmationModal,
}: DeletionModalProps) => {
  const [confirmationInput, setConfirmationInput] = useState<string>('');
  const [error, dispatchError] = useReducer(errorReducer, initialErrorState);
  const [isValidationAttempted, setIsValidationAttempted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const isCodeInvalid = !(confirmationInput.toLowerCase().trim() === 'supprimer');
    if (isCodeInvalid) {
      const payload = isValidationAttempted
        ? 'Vous devez écrire “supprimer” ici pour confirmer la suppression de compte'
        : '';
      dispatchError({ type: SET_ERROR, payload });
    } else { dispatchError({ type: RESET_ERROR }); }
  }, [confirmationInput, isValidationAttempted]);

  const deleteAccount = async () => {
    try {
      setIsValidationAttempted(true);
      if (!error.value) {
        setIsLoading(true);
        await Users.deleteAccount(loggedUserId);
        setVisible(false);
        setConfirmationModal();
      }
    } catch (e) {
      dispatchError({ type: SET_ERROR, payload: 'Oops, une erreur est survenue.' });
    } finally {
      setIsLoading(false);
    }
  };

  const onRequestClose = () => {
    setIsValidationAttempted(false);
    setVisible(true);
    setConfirmationInput('');
  };

  return (
    <NiModal visible={visible}>
      <>
        <View style={styles.header}>
          <Text style={styles.title}>Êtes vous sûr de vouloir supprimer votre compte ?</Text>
          <FeatherButton name="x" onPress={onRequestClose} size={ICON.MD} color={GREY[600]} />
        </View>
        <View style={styles.warningMessage}>
          <AntDesign name="exclamationcircleo" color={ORANGE[700]} size={ICON.MD} style={styles.warningIcon} />
          <Text style={styles.warningMessage}>
            Votre historique de formation sera supprimé. Cette action est irréversible.
          </Text>
        </View>
        <Text style={styles.body}> Veuillez écrire “supprimer” pour confirmer cette action.</Text>
        <NiInput value={confirmationInput} onChangeText={setConfirmationInput} caption="" placeholder="supprimer"
          type="text" borderColor={GREY[200]} validationMessage={error.message} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity hitSlop={HIT_SLOP} onPress={onRequestClose}>
            <Text style={styles.button}>Annuler</Text>
          </TouchableOpacity>
          <TouchableOpacity hitSlop={HIT_SLOP} onPress={deleteAccount}>
            {!isLoading
              ? <Text style={styles.button}>Supprimer mon compte</Text>
              : <ActivityIndicator style={commonStyle.disabled} color={GREY[800]} size="small" />}
          </TouchableOpacity>
        </View>
      </>
    </NiModal>
  );
};

export default DeletionModal;
