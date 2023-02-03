import { Text, View, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './styles';
import { formatIdentity } from '../../core/helpers/utils';
import { ICON } from '../../styles/metrics';
import { GREY } from '../../styles/colors';
import { UserType } from '../../types/UserType';
import { LONG_FIRSTNAME_LONG_LASTNAME } from '../../core/data/constants';

type ContactInfoContainerProps = {
  title: string,
  contact: UserType,
}

const ContactInfoContainer = ({ title, contact }: ContactInfoContainerProps) => (
  <View>
    <Text style={styles.title}>{title}</Text>
    {contact
      ? <>
        <Text style={styles.identity}>{formatIdentity(contact.identity, LONG_FIRSTNAME_LONG_LASTNAME)}</Text>
        <TouchableOpacity onPress={() => Linking.openURL(`tel:${contact?.contact?.phone}`)} style={styles.contact}
          disabled={!contact?.contact?.phone}>
          <Feather name='phone' size={ICON.MD} color={GREY[600]} />
          <Text style={styles.contactContent}>{contact?.contact?.phone}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(`mailto:${contact.local.email}`)} style={styles.contact}>
          <Feather name='mail' size={ICON.MD} color={GREY[600]}/>
          <Text style={styles.contactContent}>{contact.local.email}</Text>
        </TouchableOpacity>
      </>
      : <Text style={styles.italicText}>Il n&apos;y a aucun interlocuteur pour cette formation.</Text>}
  </View>
);

export default ContactInfoContainer;
