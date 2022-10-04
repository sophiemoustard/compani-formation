import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import FeatherButton from '../../icons/FeatherButton';
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
  <TouchableOpacity disabled style={[styles.button, style]}>
    <Text style={styles.title}>{title}</Text>
    {loading && <ActivityIndicator style={commonStyle.disabled} color={GREY[800]} size="small" />}
    {!loading && <FeatherButton name='plus-circle' onPress={() => {}} size={ICON.SM} color={GREY[800]} />}
  </TouchableOpacity>
);

export default UploadButton;
