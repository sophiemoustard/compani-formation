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
    const defineURL = async () => {
      const webappURL = await Environment.getWebappUrl();

      setUrl(`${webappURL}/ni/questionnaires/${questionnaireId}?courseId=${courseId}`);
    };

    defineURL();
  }, [courseId, questionnaireId]);

  useEffect(() => {
    const title = type === EXPECTATIONS ? 'recueil des attentes' : 'fin de formation';
    setQuestionnaireTypeTitle(title);
    setQrCodePlaceHolder(`QR Code pour répondre au questionnaire de ${title}`);
  }, [type]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{capitalizeFirstLetter(questionnaireTypeTitle)}</Text>
      <Image source={{ uri: img }} style={styles.image} alt={qrCodePlaceHolder}></Image>
      <TouchableOpacity onPress={() => Linking.openURL(url)}>
        <Text style={styles.link}>Lien pour répondre au questionnaire de {questionnaireTypeTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuestionnaireQRCodeCell;
