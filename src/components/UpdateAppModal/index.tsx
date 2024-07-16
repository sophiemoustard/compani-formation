import { Text, Linking } from 'react-native';
import NiModal from '../Modal';
import NiPrimaryButton from '../form/PrimaryButton';
import styles from './styles';
import { IS_IOS } from '../../core/data/constants';

const UpdateAppModal = () => {
  const appUrl = IS_IOS ? 'https://apps.apple.com/app/id/1516691161' : 'market://details?id=com.alenvi.compani';

  return (
    <NiModal visible={true}>
      <Text style={styles.title}>Nouvelle version de l&apos;app disponible !</Text>
      <Text style={styles.contentText}>
        Merci de mettre à jour votre application pour pouvoir continuer à l&apos;utiliser :)
      </Text>
      <NiPrimaryButton customStyle={styles.button} caption="Mettre à jour"
        onPress={() => { Linking.openURL(appUrl); }} />
    </NiModal>
  );
};

export default UpdateAppModal;
