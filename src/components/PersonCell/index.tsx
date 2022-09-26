import { Text, View, Image } from 'react-native';
import get from 'lodash/get';
import { formatIdentity } from '../../core/helpers/utils';
import styles from './styles';

interface PersonCellProps {
  person: any,
}

const PersonCell = ({ person }: PersonCellProps) => {
  const name = formatIdentity(person.identity, 'FL') || '';
  const image = get(person, 'picture.link') || '';
  const email = get(person, 'local.email') || '';
  const source = image ? { uri: image } : require('../../../assets/images/default_avatar.png');
  const hasBeenConnected = !!get(person, 'firstMobileConnection') && 'Connecté(e) à l\'app';

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={source} />
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
        {hasBeenConnected && <Text style={styles.connected}>{hasBeenConnected}</Text>}
      </View>
    </View>
  );
};

export default PersonCell;
