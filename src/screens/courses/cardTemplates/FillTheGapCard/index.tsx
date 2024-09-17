// @ts-nocheck

import { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import shuffle from 'lodash/shuffle';
import { DraxProvider, DraxView } from 'react-native-drax';
import { useNavigation } from '@react-navigation/native';
import CardHeader from '../../../../components/cards/CardHeader';
import QuizCardFooter from '../../../../components/cards/QuizCardFooter';
import FillTheGapProposition from '../../../../components/cards/FillTheGapProposition';
import FillTheGapQuestion from '../../../../components/cards/FillTheGapQuestion';
import FillTheGapPropositionList from '../../../../components/cards/FillTheGapPropositionList';
import { IS_WEB } from '../../../../core/data/constants';
import { quizJingle } from '../../../../core/helpers/utils';
import { useGetCard, useGetCardIndex, useIncGoodAnswersCount } from '../../../../store/cards/hooks';
import { PINK, GREY, GREEN, ORANGE } from '../../../../styles/colors';
import { FillTheGapType, footerColorsType } from '../../../../types/CardType';
import styles from './styles';

interface FillTheGap {
  isLoading: boolean,
  setIsRightSwipeEnabled: (boolean: boolean) => void,
}

export interface FillTheGapAnswers {
  text: string
  visible: boolean,
  _id: string,
}

const FillTheGapCard = ({ isLoading, setIsRightSwipeEnabled }: FillTheGap) => {
  const card: FillTheGapType = useGetCard();
  const index = useGetCardIndex();
  const incGoodAnswersCount = useIncGoodAnswersCount();
  const [goodAnswers, setGoodAnswers] = useState<string[]>([]);
  const [propositions, setPropositions] = useState<FillTheGapAnswers[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState<boolean>(false);
  const areGapsFilled = !selectedAnswers.filter(answer => answer === '').length;
  const [footerColors, setFooterColors] = useState<footerColorsType>({
    buttons: PINK[500],
    text: GREY[100],
    background: GREY[100],
  });
  const navigation = useNavigation();

  useEffect(() => {
    if (!isLoading && !isValidated) {
      setGoodAnswers(card.gapAnswers.filter(a => a.correct).map(a => a._id));
    }
  }, [card, isLoading, isValidated]);

  useEffect(() => {
    if (!isLoading && !isValidated) {
      setPropositions(shuffle(card.gapAnswers.map(a => ({ text: a.text, _id: a._id, visible: true }))));
      setSelectedAnswers(goodAnswers.map(() => ''));
    }
    setIsRightSwipeEnabled(isValidated);
  }, [card, goodAnswers, isLoading, isValidated, setIsRightSwipeEnabled]);

  useEffect(() => {
    if (!isValidated) {
      return setFooterColors({ buttons: PINK[500], text: GREY[100], background: GREY[100] });
    }

    if (isAnsweredCorrectly) {
      return setFooterColors({ buttons: GREEN[600], text: GREEN[600], background: GREEN[100] });
    }

    return setFooterColors({ buttons: ORANGE[600], text: ORANGE[600], background: ORANGE[100] });
  }, [isValidated, isAnsweredCorrectly]);

  if (isLoading) return null;

  const style = styles(footerColors.background);

  const setAnswersAndPropositions = (event, gapIndex?) => {
    const { payload: movedProp } = event.dragged;
    const newPropositions = [...propositions];
    const selectedPropIdx = newPropositions.map(prop => prop._id).indexOf(movedProp);
    const isActionClick = Math.abs(event.dragged.dragTranslationRatio.x) < 0.1 &&
      Math.abs(event.dragged.dragTranslationRatio.y) < 0.1;
    const selectedAnswerIdx = selectedAnswers.indexOf(movedProp);

    const updateAnswer = (gapIdx: number, newGapValue: string) => {
      setSelectedAnswers(array => Object.assign([], array, { [gapIdx]: newGapValue }));
      newPropositions[selectedPropIdx].visible = !newGapValue;
    };

    const isMovingSelectedAnswer = selectedAnswerIdx > -1;
    if (isMovingSelectedAnswer) updateAnswer(selectedAnswerIdx, '');

    const isFillingGapByClicking = isActionClick && !isMovingSelectedAnswer;
    const emptyGapIdx = selectedAnswers.indexOf('');
    if (isFillingGapByClicking && emptyGapIdx > -1) updateAnswer(emptyGapIdx, movedProp);

    const isFillingGapByDroping = !isActionClick && Number.isInteger(gapIndex);
    if (isFillingGapByDroping) {
      const isGapAlreadyFilled = selectedAnswers[gapIndex] && selectedAnswers[gapIndex] !== movedProp;
      if (isGapAlreadyFilled) {
        const previousAnswerIdx = newPropositions.map(prop => prop._id).indexOf(selectedAnswers[gapIndex]);
        newPropositions[previousAnswerIdx].visible = true;
      }
      updateAnswer(gapIndex, movedProp);
    }
    setPropositions(newPropositions);
  };

  const isGoodAnswer = (_id, idx) => {
    if (Number.isInteger(idx)) {
      return card.canSwitchAnswers ? goodAnswers.includes(_id) : goodAnswers.indexOf(_id) === idx;
    }

    return goodAnswers.includes(_id);
  };

  const renderContent = (isVisible, item, _id, idx?) => {
    if (!isVisible) return null;

    const proposition = <FillTheGapProposition item={item} isValidated={isValidated}
      isSelected={selectedAnswers.includes(_id)} isGoodAnswer={isGoodAnswer(_id, idx)} />;

    const webAnswer = { dragged: { payload: _id, dragTranslationRatio: { x: 0, y: 0 } } };

    return IS_WEB
      ? <TouchableOpacity style={style.answerContainer} onPress={() => setAnswersAndPropositions(webAnswer)}>
        {proposition}
      </TouchableOpacity>
      : <DraxView style={style.answerContainer} draggingStyle={{ opacity: 0 }} dragPayload={_id} longPressDelay={0}>
        {proposition}
      </DraxView>;
  };

  const renderGap = idx => <DraxView style={style.gapContainer} key={`gap${idx}`}
    onReceiveDragDrop={event => setAnswersAndPropositions(event, idx)}
    renderContent={() => renderContent(
      !!selectedAnswers[idx],
      { ...propositions.find(p => p._id === selectedAnswers[idx]), visible: true },
      selectedAnswers[idx],
      idx
    )} />;

  const onPressFooterButton = () => {
    if (!isValidated) {
      const areAnswersCorrect = card.canSwitchAnswers
        ? selectedAnswers.every(_id => goodAnswers.includes(_id))
        : selectedAnswers.every((_id, idx) => (_id === goodAnswers[idx]));

      quizJingle(areAnswersCorrect);
      setIsAnsweredCorrectly(areAnswersCorrect);
      if (areAnswersCorrect) incGoodAnswersCount();

      return setIsValidated(true);
    }
    return index !== null ? navigation.navigate(`card-${index + 1}`) : null;
  };

  return (
    <SafeAreaView style={style.safeArea} edges={['top']}>
      <CardHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <DraxProvider>
          <FillTheGapQuestion text={card.gappedText} isValidated={isValidated} renderGap={renderGap} />
          <FillTheGapPropositionList isValidated={isValidated} propositions={propositions}
            setProposition={setAnswersAndPropositions} renderContent={renderContent} />
        </DraxProvider>
      </ScrollView>
      <View style={style.footerContainer}>
        <QuizCardFooter isValidated={isValidated} isValid={isAnsweredCorrectly} cardIndex={index}
          buttonDisabled={!areGapsFilled} footerColors={footerColors} explanation={card.explanation}
          onPressFooterButton={onPressFooterButton} />
      </View>
    </SafeAreaView>
  );
};

export default FillTheGapCard;
