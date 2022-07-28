import { View, TouchableOpacity, Text } from 'react-native';
import Shadow from '../../design/Shadow';
import styles from './styles';

interface QuestionAnswerPropositionProps {
  item: string,
  index: number,
  isSelected: boolean,
  onPress: (index: number) => void,
}

const QuestionAnswerProposition = ({ item, index, isSelected, onPress }: QuestionAnswerPropositionProps) => {
  const style = styles(isSelected);

  return (
    <View style={style.answerContainer}>
      <TouchableOpacity style={style.answer} onPress={() => onPress(index)}>
        <View style={style.textContainer}>
          <Text style={style.text}>{item}</Text>
        </View>
      </TouchableOpacity>
      <Shadow customStyle={style.shadow} />
    </View>
  );
};

export default QuestionAnswerProposition;
