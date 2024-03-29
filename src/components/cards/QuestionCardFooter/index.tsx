import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowButton from '../../ArrowButton';
import { LEFT } from '../../../core/data/constants';
import { WHITE } from '../../../styles/colors';
import NiPrimaryButton from '../../form/PrimaryButton';
import styles from './styles';

interface QuestionCardFooterProps {
  index: number | null,
  buttonVisible?: boolean,
  arrowColor: string,
  buttonColor: string,
  buttonCaption?: string,
  buttonDisabled?: boolean,
  onPressArrow?: () => void,
  validateCard?: () => void,
  onPressButton?: () => void,
}

const QuestionCardFooter = ({
  index,
  buttonVisible = true,
  arrowColor,
  buttonColor,
  buttonCaption = 'Continuer',
  buttonDisabled = false,
  onPressArrow,
  validateCard,
  onPressButton,
}: QuestionCardFooterProps) => {
  const arrowButtonVisible = !(index === 0);
  const style = styles(arrowButtonVisible);
  const navigation = useNavigation();

  const onPress = () => {
    if (onPressButton) onPressButton();
    else {
      if (validateCard) validateCard();
      if (index !== null) navigation.navigate(`card-${index + 1}`);
    }
  };

  const goBack = () => {
    if (onPressArrow) onPressArrow();
    if (index !== null) navigation.navigate(`card-${index - 1}`);
  };

  return (
    <View style={style.container}>
      {arrowButtonVisible && <ArrowButton color={arrowColor} direction={LEFT} onPress={goBack} />}
      {buttonVisible &&
        <View style={style.button}>
          <NiPrimaryButton bgColor={buttonColor} color={WHITE} disabled={buttonDisabled} caption={buttonCaption}
            onPress={onPress} />
        </View>
      }
    </View>
  );
};

export default QuestionCardFooter;
