import NiButton from '../Button';
import { GREY } from '../../../styles/colors';

interface SecondaryButtonProps {
  customStyle?: Object,
  caption: string,
  onPress: () => void,
  loading?: boolean,
  bgColor?: string,
  color?: string,
  borderColor?: string,
  disabled?: boolean,
}

const SecondaryButton = (
  {
    customStyle,
    caption,
    onPress,
    loading = false,
    bgColor = GREY[100],
    color = GREY[600],
    disabled = false,
  }: SecondaryButtonProps
) => (
  <NiButton customStyle={customStyle} caption={caption} onPress={onPress} loading={loading} disabled={disabled}
    bgColor={bgColor} borderColor={color} color={color} />
);

export default SecondaryButton;
