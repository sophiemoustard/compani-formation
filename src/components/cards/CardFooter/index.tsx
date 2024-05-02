// @ts-nocheck

import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import ArrowButton from '../../ArrowButton';
import { LEFT, RIGHT } from '../../../core/data/constants';
import styles from './styles';
import { Context as CardContext } from '@/context/CardContext';

interface CardFooterProps {
  index: number | null,
  color?: string,
  removeRight?: boolean
}

const CardFooter = ({ index, color, removeRight }: CardFooterProps) => {
  const removeLeft = index === 0;
  const router = useRouter();
  const { questionnaire, activity } = useContext(CardContext);

  const goNextCard = () => {
    if (index !== null) {
      if (activity) return router.navigate(`/Courses/ActivityCardContainer/${index + 1}`);
      if (questionnaire) return router.navigate(`/Courses/QuestionnaireCardContainer/${index + 1}`);
    }

    return null;
  };

  const goPreviousCard = () => {
    if (index !== null) {
      if (activity) return router.navigate(`/Courses/ActivityCardContainer/${index - 1}`);
      if (questionnaire) return router.navigate(`/Courses/QuestionnaireCardContainer/${index - 1}`);
    }

    return null;
  };

  return index !== null
    ? (<View style={styles({ removeLeft, removeRight }).container}>
      {!removeLeft && <ArrowButton color={color} direction={LEFT} onPress={goPreviousCard} />}
      {!removeRight && <ArrowButton color={color} direction={RIGHT} onPress={goNextCard} />}
    </View>)
    : null;
};

export default CardFooter;
