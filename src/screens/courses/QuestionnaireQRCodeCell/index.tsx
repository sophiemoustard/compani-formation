import { useEffect, useState } from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import { EXPECTATIONS } from '../../../core/data/constants';
import { capitalizeFirstLetter } from '../../../core/helpers/utils';
import styles from './styles';

interface NiQuestionnaireQRCodeCellProps {
  img: string,
  type: string
  onPress: () => void,
}

const NiQuestionnaireQRCodeCell = ({ img, type, onPress }: NiQuestionnaireQRCodeCellProps) => {
  const [questionnaireTypeTitle, setQuestionnaireTypeTitle] = useState('');
  const [qrCodePlaceHolder, setQrCodePlaceHolder] = useState('');

  useEffect(() => {
    setQuestionnaireTypeTitle(type === EXPECTATIONS ? 'recueil des attentes' : 'fin de formation');
    setQrCodePlaceHolder(`QR Code pour répondre au questionnaire de ${questionnaireTypeTitle}`);
  }, [questionnaireTypeTitle, type]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{capitalizeFirstLetter(questionnaireTypeTitle)}</Text>
      <Image source={{ uri: img }} style={styles.image} alt={qrCodePlaceHolder}></Image>
      <TouchableOpacity onPress={onPress}>
        <View>
          <Text style={styles.link}>Lien pour répondre au questionnaire de {questionnaireTypeTitle}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default NiQuestionnaireQRCodeCell;
