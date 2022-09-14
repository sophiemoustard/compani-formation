import NiButton from '../Button';
import { GREY } from '../../../styles/colors';
import { FontType } from '../../../types/FontType';
import { FIRA_SANS_BLACK } from '../../../styles/fonts';

interface SecondaryButtonProps {
  customStyle?: Object,
  caption: string,
  onPress: () => void,
  loading?: boolean,
  bgColor?: string,
  color?: string,
  font?: FontType,
  borderColor?: string,
  icon?: any,
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
    font = FIRA_SANS_BLACK.MD,
    borderColor = color,
    icon,
    disabled = false,
  }: SecondaryButtonProps
) => (
  <NiButton customStyle={customStyle} caption={caption} onPress={onPress} loading={loading} disabled={disabled}
    bgColor={bgColor} borderColor={borderColor} color={color} font={font} icon={icon}/>
);

export default SecondaryButton;
