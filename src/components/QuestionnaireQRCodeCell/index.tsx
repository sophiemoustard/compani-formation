import { useEffect, useState } from 'react';
import { TouchableOpacity, Image, Text, View, Linking } from 'react-native';
import { capitalizeFirstLetter } from '../../core/helpers/utils';
import { getQuestionnaireTitle } from '../../core/helpers/courses';
import Environment from '../../../environment';
import styles from './styles';

interface QuestionnaireQRCodeCellProps {
  img: string,
  types: string[],
  courseId: string,
}

const QuestionnaireQRCodeCell = ({ img, types, courseId }: QuestionnaireQRCodeCellProps) => {
  const [questionnaireTypeTitle, setQuestionnaireTypeTitle] = useState('');
  const [qrCodePlaceHolder, setQrCodePlaceHolder] = useState('');
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    const defineURL = async () => {
      const webappURL = await Environment.getWebappUrl();

      setUrl(`${webappURL}/ni/questionnaires?courseId=${courseId}`);
    };

    defineURL();
  }, [courseId]);

  useEffect(() => {
    const title = getQuestionnaireTitle(types);
    setQuestionnaireTypeTitle(title);
    setQrCodePlaceHolder(`QR Code pour répondre au ${title}`);
  }, [types]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{capitalizeFirstLetter(questionnaireTypeTitle)}</Text>
      <Image source={{ uri: img }} style={styles.image} alt={qrCodePlaceHolder}></Image>
      <TouchableOpacity onPress={() => Linking.openURL(url)}>
        <Text style={styles.link}>Lien pour répondre au {questionnaireTypeTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuestionnaireQRCodeCell;
