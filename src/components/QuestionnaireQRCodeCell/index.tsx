import { useEffect, useState } from 'react';
import { TouchableOpacity, Image, Text, View, Linking } from 'react-native';
import { EXPECTATIONS } from '../../core/data/constants';
import { capitalizeFirstLetter } from '../../core/helpers/utils';
import Environment from '../../../environment';
import styles from './styles';

interface QuestionnaireQRCodeCellProps {
  img: string,
  type: string,
  questionnaireId: string,
  courseId: string,
}

const QuestionnaireQRCodeCell = ({ img, type, questionnaireId, courseId }: QuestionnaireQRCodeCellProps) => {
  const [questionnaireTypeTitle, setQuestionnaireTypeTitle] = useState('');
  const [qrCodePlaceHolder, setQrCodePlaceHolder] = useState('');
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    const definedURL = async () => {
      const webappURL = Environment.getWebappUrl();

      setUrl(`${webappURL}/ni/questionnaires/${questionnaireId}?courseId=${courseId}`);
    };

    definedURL();
  }, [courseId, questionnaireId]);

  useEffect(() => {
    setQuestionnaireTypeTitle(type === EXPECTATIONS ? 'recueil des attentes' : 'fin de formation');
    setQrCodePlaceHolder(`QR Code pour répondre au questionnaire de ${questionnaireTypeTitle}`);
  }, [questionnaireTypeTitle, type]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{capitalizeFirstLetter(questionnaireTypeTitle)}</Text>
      <Image source={{ uri: img }} style={styles.image} alt={qrCodePlaceHolder}></Image>
      <TouchableOpacity onPress={() => Linking.openURL(url)}>
        <View>
          <Text style={styles.link}>Lien pour répondre au questionnaire de {questionnaireTypeTitle}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default QuestionnaireQRCodeCell;
