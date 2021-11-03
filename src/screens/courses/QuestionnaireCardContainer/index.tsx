import React, { useEffect, useContext, useState } from 'react';
import { BackHandler } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import { connect } from 'react-redux';
import Questionnaires from '../../../api/questionnaires';
import { CardType } from '../../../types/CardType';
import { RootCardParamList, RootStackParamList } from '../../../types/NavigationType';
import { Context as AuthContext } from '../../../context/AuthContext';
import StartCard from '../cardTemplates/StartCard';
import QuestionnaireEndCard from '../cardTemplates/QuestionnaireEndCard';
import { StateType } from '../../../types/store/StoreType';
import MainActions from '../../../store/main/actions';
import CardsActions from '../../../store/cards/actions';
import CardScreen from '../CardScreen';
import { QuestionnaireType } from '../../../types/QuestionnaireType';

interface QuestionnaireCardContainerProps extends StackScreenProps<RootStackParamList, 'QuestionnaireCardContainer'> {
  cardIndex: number | null,
  exitConfirmationModal: boolean,
  cards: CardType[],
  setCards: (questionnaire: CardType[] | null) => void,
  setExitConfirmationModal: (boolean) => void,
  setStatusBarVisible: (boolean) => void,
}

const QuestionnaireCardContainer = ({
  route,
  navigation,
  cards,
  cardIndex,
  exitConfirmationModal,
  setCards,
  setExitConfirmationModal,
  setStatusBarVisible,
}: QuestionnaireCardContainerProps) => {
  const { signOut } = useContext(AuthContext);
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireType | null>(null);
  const { profileId } = route.params;

  useEffect(() => {
    setStatusBarVisible(false);
  }, [setStatusBarVisible]);

  const getQuestionnaire = async () => {
    try {
      const fetchedQuestionnaire = await Questionnaires.getQuestionnaire(route.params.questionnaireId);
      setQuestionnaire(fetchedQuestionnaire);
      setCards(fetchedQuestionnaire.cards);
    } catch (e: any) {
      if (e.response.status === 401) signOut();
      setQuestionnaire(null);
      setCards([]);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await getQuestionnaire();
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = async () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);

    navigation.navigate('CourseProfile', { courseId: profileId, endedQuestionnaire: questionnaire?._id });
  };

  const hardwareBackPress = () => {
    if (cardIndex === null) goBack();
    else setExitConfirmationModal(true);

    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardIndex]);

  const Tab = createMaterialTopTabNavigator<RootCardParamList>();

  return <Tab.Navigator tabBar={() => <></>} screenOptions={{ swipeEnabled: false }}>
    <Tab.Screen key={0} name={'startCard'} >
      {() => <StartCard title={questionnaire?.name || ''} goBack={goBack}
        isLoading={!(cards.length > 0 && questionnaire)} />}
    </Tab.Screen>
    {cards.length > 0 && questionnaire
      ? <>
        {cards.map((_, index) => (
          <Tab.Screen key={index} name={`card-${index}`}>
            {() => <CardScreen index={index} goBack={goBack} />}
          </Tab.Screen>
        ))}
        <Tab.Screen key={cards.length + 1} name={`card-${cards.length}`}>
          {() => <QuestionnaireEndCard goBack={goBack} questionnaire={questionnaire} courseId={profileId} />}
        </Tab.Screen>
      </>
      : null}
  </Tab.Navigator>;
};

const mapStateToProps = (state: StateType) => ({
  cards: state.cards.cards,
  cardIndex: state.cards.cardIndex,
  exitConfirmationModal: state.cards.exitConfirmationModal,
});

const mapDispatchToProps = dispatch => ({
  setCards: cards => dispatch(CardsActions.setCards(cards)),
  setExitConfirmationModal: openModal => dispatch(CardsActions.setExitConfirmationModal(openModal)),
  setStatusBarVisible: statusBarVisible => dispatch(MainActions.setStatusBarVisible(statusBarVisible)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireCardContainer);
