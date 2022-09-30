import { Text, View } from 'react-native';
import styles from './styles';

interface ErrorMessageProps {
  style?: object,
  message: string,
  show: boolean,
}

const ErrorMessage = ({ style, message, show }: ErrorMessageProps) => (
  <View style={style}>
    { show && <Text style={styles.message}>{message}</Text> }
  </View>
);

export default ErrorMessage;
