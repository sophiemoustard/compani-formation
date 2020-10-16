import React, { useEffect, useRef, useState } from 'react';
import { Text, ScrollView, View, TouchableOpacity } from 'react-native';
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
import Shadow from '../../../../components/design/Shadow';
import { navigate } from '../../../../navigationRef';
import Actions from '../../../../store/activities/actions';

interface FillTheGap {
  card: FillTheGapType,
  index: number,
  isFocused: boolean,
  incGoodAnswersCount: () => void,
}

interface footerColorsType {
  buttonsColor: string,
  textColor: string,
  backgroundColor: string,
}

const FillTheGapCard = ({ card, index, isFocused, incGoodAnswersCount }: FillTheGap) => {
  const goodAnswers = useRef<Array<string>>([]);
  const [propositions, setPropositions] = useState<Array<any>>([]);
  const [received, setReceived] = useState<Array<any>>([]);
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState<boolean>(false);
  const [footerColors, setFooterColors] = useState<footerColorsType>({
    buttonsColor: PINK[500],
    textColor: GREY[100],
    backgroundColor: GREY[100],
  });

  useEffect(() => {
    if (card && isFocused) {
      goodAnswers.current = card.gappedText.match(/<trou>[^<]*<\/trou>/g)?.map(rep => rep.replace(/<\/?trou>/g, '')) ||
    [];
      setPropositions(shuffle([...card.falsyGapAnswers, ...goodAnswers.current]));
    }
  }, [card, isFocused]);

  useEffect(() => {
    if (!isValidated) {
      return setFooterColors({ buttonsColor: PINK[500], textColor: GREY[100], backgroundColor: GREY[100] });
    }

    if (isAnsweredCorrectly) {
      return setFooterColors({ buttonsColor: GREEN[600], textColor: GREEN[600], backgroundColor: GREEN[100] });
    }

    return setFooterColors({ buttonsColor: ORANGE[600], textColor: ORANGE[600], backgroundColor: ORANGE[100] });
  }, [isValidated, isAnsweredCorrectly]);

  if (!isFocused) return null;

  const style = styles(footerColors.textColor, footerColors.backgroundColor);

  const renderAnswers = () => <View style={style.answersContainer} pointerEvents={isValidated ? 'none' : 'auto'}>
    {propositions.map((txt, idx) =>
      <View style={style.empty} key={`answer${idx}`}>
        <DraxView
          style={style.answerContainer}
          draggingStyle={{ opacity: 0 }}
          // dragReleasedStyle={{ opacity: 0 }}
          dragPayload={txt}
          longPressDelay={0}>
          <View style={txt ? style.textContainer : { opacity: 0 }}>
            <Text style={style.answer}>{txt}</Text>
          </View>
          <Shadow customStyle={style.shadow} />
        </DraxView>
      </View>)}
  </View>;

  const renderQuestion = (text) => {
    const splittedText = text.split(/<trou>[^<]*<\/trou>/g);
    return <View style={[cardsStyle.question, style.questionContainer]}>
      {
        splittedText.map((txt, idx) => {
          if (idx === 0 && txt === '') return <View style={style.gapContainer} key={`gap${idx}`} />;
          if (idx === splittedText.length - 1 && txt === '') return null;
          if (idx < splittedText.length - 1) {
            return <>
              <Text style={style.question} key={`text${idx}`}>{txt}</Text>
              {/* <View style={styles.gapContainer} key={`gap${idx}`} /> */}
              <DraxView
                style={!received[idx] ? style.gapContainer : style.answerContainer}
                // receivingStyle={styles.receiving}
                renderContent={() => received[idx] &&
                  <>
                    <View style={style.textContainer}>
                      <Text style={style.answer}>{received[idx]}</Text>
                    </View>
                    <Shadow customStyle={style.shadow} />
                  </>
                }
                onReceiveDragDrop={(event) => {
                  const tempArray = [...received];
                  const tempArray2 = [...propositions];
                  if (tempArray[idx]) {
                    tempArray2[tempArray2.indexOf(event.dragged.payload)] = tempArray[idx];
                  } else {
                    tempArray2[tempArray2.indexOf(event.dragged.payload)] = '';
                  }
                  tempArray[idx] = event.dragged.payload;
                  setReceived(tempArray);
                  setPropositions(tempArray2);
                }}
              />
            </>;
          }
          return <Text style={style.question} key={`text${idx}`}>{txt}</Text>;
        })
      }
    </View>;
  };

  const onPressFooterButton = () => {
    if (!isValidated) {
      const areAnswersCorrect = received.every((receive, idx) => (receive === goodAnswers.current[idx]));
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
        {console.log('afficher question', isFocused, card)}
          {isFocused && card.gappedText && renderQuestion(card.gappedText)}
          {renderAnswers()}
        </DraxProvider>
      </ScrollView>
      <View style={style.footerContainer}>
        {isValidated && <Text style={[cardsStyle.explanation, style.explanation]}>{card.explanation}</Text>}
        <QuestionCardFooter onPressButton={onPressFooterButton} buttonCaption={isValidated ? 'Continuer' : 'Valider'}
          arrowColor={footerColors.buttonsColor} index={index}
          buttonDisabled={!(received.length === goodAnswers.current.length)}
          buttonColor={(received.length === goodAnswers.current.length) ? footerColors.buttonsColor : GREY[300]} />
      </View>
    </>
  );
};

const mapStateToProps = (state: StateType) => ({ card: Selectors.getCard(state), index: state.activities.cardIndex });
const mapDispatchToProps = dispatch => ({
  incGoodAnswersCount: () => dispatch(Actions.incGoodAnswersCount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FillTheGapCard);
