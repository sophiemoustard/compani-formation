import React, { useEffect, useRef, useState } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import shuffle from 'lodash/shuffle';
import { DraxProvider, DraxView } from 'react-native-drax';
import { StateType } from '../../../../types/store/StoreType';
import Selectors from '../../../../store/activities/selectors';
import { FillTheGapType } from '../../../../types/CardType';
import CardHeader from '../../../../components/cards/CardHeader';
import cardsStyle from '../../../../styles/cards';
import styles from './styles';
import QuestionCardFooter from '../../../../components/cards/QuestionCardFooter';
import { PINK, GREY, GREEN, ORANGE } from '../../../../styles/colors';
import { navigate } from '../../../../navigationRef';
import Actions from '../../../../store/activities/actions';
import FillTheGapProposition from '../../../../components/cards/FillTheGapProposition';

interface FillTheGap {
  card: FillTheGapType,
  index: number,
  isFocused: boolean,
  incGoodAnswersCount: () => void,
}

interface footerColorsType {
  buttons: string,
  text: string,
  background: string,
}

export interface FillTheGapAnswers {
  text: string
  visible: boolean,
}

const FillTheGapCard = ({ card, index, isFocused, incGoodAnswersCount }: FillTheGap) => {
  const goodAnswers = useRef<Array<string>>([]);
  const [propositions, setPropositions] = useState<Array<FillTheGapAnswers>>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Array<string>>([]);
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState<boolean>(false);
  const areGapsFilled = (selectedAnswers.length === goodAnswers.current.length);
  const [footerColors, setFooterColors] = useState<footerColorsType>({
    buttons: PINK[500],
    text: GREY[100],
    background: GREY[100],
  });

  useEffect(() => {
    if (isFocused && !isValidated) {
      goodAnswers.current = card.gappedText.match(/<trou>[^<]*<\/trou>/g)?.map(rep => rep.replace(/<\/?trou>/g, '')) ||
        [];
      setPropositions(shuffle([...card.falsyGapAnswers, ...goodAnswers.current])
        .map(proposition => ({ text: proposition, visible: true })));
    }
  }, [card, isFocused, isValidated]);

  useEffect(() => {
    if (!isValidated) {
      return setFooterColors({ buttons: PINK[500], text: GREY[100], background: GREY[100] });
    }

    if (isAnsweredCorrectly) {
      return setFooterColors({ buttons: GREEN[600], text: GREEN[600], background: GREEN[100] });
    }

    return setFooterColors({ buttons: ORANGE[600], text: ORANGE[600], background: ORANGE[100] });
  }, [isValidated, isAnsweredCorrectly]);

  if (!isFocused) return null;

  const style = styles(footerColors.text, footerColors.background);

  const renderPropositions = () => <View style={style.answersContainer} pointerEvents={isValidated ? 'none' : 'auto'}>
    {propositions.map((proposition, idx) =>
      <View style={style.gap} key={`proposition${idx}`}>
        { proposition.visible &&
        <DraxView style={style.answerContainer} draggingStyle={{ opacity: 0 }}
          dragPayload={proposition.text} longPressDelay={0}>
          <FillTheGapProposition isGap={false} item={proposition} isValidated={isValidated}
            isGoodAnswer={goodAnswers.current.includes(proposition.text)}
            isSelected={selectedAnswers.includes(proposition.text)} />
        </DraxView>
        }
      </View>)
    }
  </View>;

  const renderAnswers = (event, idx) => {
    const { payload } = event.dragged;
    const tempAnswers = [...selectedAnswers] || [];
    const tempPropositions = [...propositions];
    tempPropositions[tempPropositions.map(answer => answer.text).indexOf(payload)].visible = false;
    if (tempAnswers[idx]) {
      tempPropositions[tempPropositions.map(answer => answer.text).indexOf(tempAnswers[idx])] =
      { text: tempAnswers[idx], visible: true };
    }
    tempAnswers[idx] = event.dragged.payload;
    setSelectedAnswers(tempAnswers);
    setPropositions(tempPropositions);
  };

  const renderGap = idx => <DraxView style={!selectedAnswers[idx] ? style.gapContainer : style.answerContainer}
    renderContent={() => selectedAnswers[idx] &&
      <FillTheGapProposition item={{ text: selectedAnswers[idx], visible: true }} isValidated={isValidated}
        isGap={true} isGoodAnswer={selectedAnswers[idx] === goodAnswers.current[idx]} isSelected={true} />
    } onReceiveDragDrop={event => renderAnswers(event, idx)} />;

  const renderQuestion = (text) => {
    const splittedText = text.split(/<trou>[^<]*<\/trou>/g);
    return <View style={[cardsStyle.question, style.questionContainer]}>
      {
        splittedText.map((txt, idx) => {
          if (idx === 0 && txt === '') return renderGap(idx);
          if (idx === splittedText.length - 1 && txt === '') return null;
          if (idx < splittedText.length - 1) {
            return <>
              <Text style={style.question} key={`text${idx}`}>{txt}</Text>
              {renderGap(idx)}
            </>;
          }
          return <Text style={style.question} key={`text${idx}`}>{txt}</Text>;
        })
      }
    </View>;
  };

  const onPressFooterButton = () => {
    if (!isValidated) {
      const areAnswersCorrect = selectedAnswers.every((text, idx) => (text === goodAnswers.current[idx]));
      setIsAnsweredCorrectly(areAnswersCorrect);
      if (areAnswersCorrect) incGoodAnswersCount();

      return setIsValidated(true);
    }
    return navigate(`card-${index + 1}`);
  };

  return (
    <>
      <CardHeader />
      <ScrollView contentContainerStyle={style.container} showsVerticalScrollIndicator={false}>
        <DraxProvider>
          {renderQuestion(card.gappedText)}
          {renderPropositions()}
        </DraxProvider>
      </ScrollView>
      <View style={style.footerContainer}>
        {isValidated && <Text style={[cardsStyle.explanation, style.explanation]}>{card.explanation}</Text>}
        <QuestionCardFooter onPressButton={onPressFooterButton} buttonCaption={isValidated ? 'Continuer' : 'Valider'}
          arrowColor={footerColors.buttons} index={index}
          buttonDisabled={!areGapsFilled}
          buttonColor={(selectedAnswers.length === goodAnswers.current.length) ? footerColors.buttons : GREY[300]} />
      </View>
    </>
  );
};

const mapStateToProps = (state: StateType) => ({ card: Selectors.getCard(state), index: state.activities.cardIndex });
const mapDispatchToProps = dispatch => ({
  incGoodAnswersCount: () => dispatch(Actions.incGoodAnswersCount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FillTheGapCard);
