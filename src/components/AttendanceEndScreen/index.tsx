import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { TRAINER } from '../../core/data/constants';
import NiPrimaryButton from '../form/PrimaryButton';
import { PINK } from '../../styles/colors';
import styles from './styles';

interface AttendanceEndScreenProps {
  traineeName: string,
  failUpload: boolean,
  goToNextScreen: () => void,
  mode?: string
}

const AttendanceEndScreen = ({ traineeName, failUpload, goToNextScreen, mode = TRAINER }: AttendanceEndScreenProps) => {
  const renderFailMessage = (text: string) => <View style={styles.errorContainer}>
    <Text style={styles.title}>{text}</Text>
    <MaterialIcons style={styles.icon} size={200} name={'warning'} color={PINK[500]} />
    <Text style={styles.text}>Veuillez réitérer votre demande</Text>
  </View>;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {mode === TRAINER ? <>
        {failUpload
          ? renderFailMessage(`Echec de l'envoi de la demande à ${traineeName}`)
          : <>
            <View style={styles.upperContainer}>
              <Text style={styles.title}>Une demande d&apos;émargement a été envoyée à {traineeName}</Text>
            </View>
            <Text style={styles.text}>Elle est disponible sur la page de la formation sur son application mobile</Text>
            <Image source={require('../../../assets/images/aux_fierte.webp')} style={styles.image} />
            <Text style={styles.text}>
            N&apos;oubliez pas de reporter les émargements dans le tableau prévu à cet effet sur l&apos;application
            web Compani
            </Text>
          </>
        }
      </>
        : <>
          {failUpload
            ? renderFailMessage('Echec lors de l\'envoi de votre signature')
            : <>
              <View style={styles.upperContainer}>
                <Text style={styles.title}>Merci d&apos;avoir émargé les créneaux</Text>
              </View>
              <Image source={require('../../../assets/images/aux_fierte.webp')} style={styles.image} />
              <Text style={styles.text}>
              Vous pouvez désormais retourner sur votre formation pour émarger d&apos;autres créneaux ou poursuivre
              votre apprentissage
              </Text>
            </>
          }
        </>}
      <View style={styles.footer}>
        <NiPrimaryButton caption={'Terminer'} onPress={goToNextScreen} />
      </View>
    </SafeAreaView>
  );
};
export default AttendanceEndScreen;
