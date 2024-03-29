import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import commonStyle from '../../../styles/common';
import { ICON } from '../../../styles/metrics';
import { GREY } from '../../../styles/colors';
import styles from './styles';

interface UploadButtonProps {
  title: string,
  onPress: () => void,
  style?: Object,
  loading?: boolean,
  disabled?: boolean,
}

const UploadButton = ({ title, onPress, style = {}, loading = false, disabled = false } : UploadButtonProps) => (
  <TouchableOpacity style={[styles.button, style, disabled && commonStyle.disabled]} onPress={onPress}
    disabled={disabled}>
    <Text style={styles.title} numberOfLines={1}>{title}</Text>
    {loading && <ActivityIndicator style={commonStyle.disabled} color={GREY[800]} size="small" />}
    {!loading && <Feather name='plus-circle' size={ICON.SM} color={GREY[800]} />}
  </TouchableOpacity>
);

export default UploadButton;
