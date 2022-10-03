import { Text, View, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './styles';
import { formatIdentity } from '../../core/helpers/utils';
import { ICON } from '../../styles/metrics';
import { GREY } from '../../styles/colors';
import { UserType } from '../../types/UserType';

type ContactInfoContainerProps = {
  title: string,
  contact: UserType,
}

const ContactInfoContainer = ({ title, contact }: ContactInfoContainerProps) => (
  <View>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.identity}>{formatIdentity(contact.identity, 'FL')}</Text>
    <TouchableOpacity onPress={() => Linking.openURL(`tel:${contact?.contact?.phone}`)} style={styles.contact}
      disabled={!contact?.contact?.phone}>
      <Feather name='phone' size={ICON.MD} color={GREY[600]} />
      <Text style={styles.contactContent}>{contact?.contact?.phone}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => Linking.openURL(`mailto:${contact.local.email}`)} style={styles.contact}>
      <Feather name='mail' size={ICON.MD} color={GREY[600]}/>
      <Text style={styles.contactContent}>{contact.local.email}</Text>
    </TouchableOpacity>
  </View>
);

export default ContactInfoContainer;
