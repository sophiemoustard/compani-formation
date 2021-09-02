import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { GREY } from '../../../styles/colors';
import { ICON } from '../../../styles/metrics';
import NiModal from '../../Modal';
import styles from './styles';

interface ValidationModalProps {
  visible: boolean,
  company: any,
  onPressCancelButton: () => void,
  onPressConfirmButton: () => void,
}

const ValidationModal = ({ visible, company, onPressCancelButton, onPressConfirmButton }: ValidationModalProps) => (
  <NiModal visible={visible}>
    <>
      <Text style={styles.title}>Voulez-vous vraiment ajouter cette structure ?</Text>
      <View style={styles.companyContainer}>
        <Feather name={'home'} size={ICON.MD} color={GREY[600]} />
        <Text style={styles.companyName}>{company.name}</Text>
      </View>
      <Text style={styles.contentText}>
        En l’ajoutant, vous confirmez que cette structure est votre employeur.
        Elle aura alors accès à votre historique de formation sur Compani.
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={onPressCancelButton}>
          <Text style={styles.buttonText}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onPressConfirmButton}>
          <Text style={styles.buttonText}>Ajouter la structure</Text>
        </TouchableOpacity>
      </View>
    </>
  </NiModal>
);

export default ValidationModal;
