import { View } from 'react-native';
import { useRouter } from 'expo-router';
import ArrowButton from '../../ArrowButton';
import { LEFT, RIGHT } from '../../../core/data/constants';
import styles from './styles';

interface CardFooterProps {
  index: number | null,
  color?: string,
  removeRight?: boolean
}

const CardFooter = ({ index, color, removeRight }: CardFooterProps) => {
  const removeLeft = index === 0;
  const router = useRouter();

  return index !== null
    ? (<View style={styles({ removeLeft, removeRight }).container}>
      {!removeLeft && <ArrowButton color={color} direction={LEFT}
        onPress={() => router.navigate(`/Courses/ActivityCardContainer/${index - 1}`)} />}
      {!removeRight && <ArrowButton color={color} direction={RIGHT}
        onPress={() => router.navigate(`/Courses/ActivityCardContainer/${index + 1}`)} />}
    </View>)
    : null;
};

export default CardFooter;
