import { Text, View, Image } from 'react-native';
import { formatIdentity } from '../../core/helpers/utils';
import styles from './styles';
import { UserType } from '../../types/UserType';

interface PersonCellProps {
  person: UserType,
}

const PersonCell = ({ person }: PersonCellProps) => {
  const name = formatIdentity(person.identity, 'FL') || '';
  const image = person?.picture?.link || '';
  const email = person?.local?.email || '';
  const source = image ? { uri: image } : require('../../../assets/images/default_avatar.png');
  const isConnected = person?.firstMobileConnection && 'Connecté(e) à l\'app';

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={source} />
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
        {isConnected && <Text style={styles.connected}>{isConnected}</Text>}
      </View>
    </View>
  );
};

export default PersonCell;