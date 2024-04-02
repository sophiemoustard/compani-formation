import { useEffect, useState } from 'react';
import { TouchableOpacity, Image, Text, View, Linking } from 'react-native';
import { END_OF_COURSE, EXPECTATIONS } from '../../core/data/constants';
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

  const getTitle = (questionnaireType: string) => {
    switch (questionnaireType) {
      case EXPECTATIONS:
        return 'de recueil des attentes';
      case END_OF_COURSE:
        return 'de fin de formation';
      default:
        return 'd\'auto-positionnement';
    }
  };

  useEffect(() => {
    const title = getTitle(type);
    setQuestionnaireTypeTitle(title);
    setQrCodePlaceHolder(`QR Code pour répondre au questionnaire de ${title}`);
  }, [type]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{capitalizeFirstLetter(questionnaireTypeTitle)}</Text>
      <Image source={{ uri: img }} style={styles.image} alt={qrCodePlaceHolder}></Image>
      <TouchableOpacity onPress={() => Linking.openURL(url)}>
        <Text style={styles.link}>Lien pour répondre au questionnaire {questionnaireTypeTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuestionnaireQRCodeCell;
