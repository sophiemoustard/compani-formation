import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import commonStyle from '../../../styles/common';
import { ICON } from '../../../styles/metrics';
import { GREY } from '../../../styles/colors';
import styles from './styles';

interface UploadButtonProps {
  title: string,
  style?: Object,
  loading?: boolean,
}

const UploadButton = ({ title, style, loading = false } : UploadButtonProps) => (
  <TouchableOpacity style={[styles.button, style]}>
    <Text style={styles.title}>{title}</Text>
    {loading && <ActivityIndicator style={commonStyle.disabled} color={GREY[800]} size="small" />}
    {!loading && <Feather name='plus-circle' size={ICON.SM} color={GREY[800]} />}
  </TouchableOpacity>
);

export default UploadButton;
