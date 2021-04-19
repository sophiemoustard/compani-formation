import React, { useEffect, useContext, useState } from 'react';
import { BackHandler } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { connect } from 'react-redux';
import Questionnaires from '../../../api/questionnaires';
import { CardType } from '../../../types/CardType';
import { NavigationType } from '../../../types/NavigationType';
import { Context as AuthContext } from '../../../context/AuthContext';
import StartCard from '../cardTemplates/StartCard';
import QuestionnaireEndCard from '../cardTemplates/QuestionnaireEndCard';
import { StateType } from '../../../types/store/StoreType';
import MainActions from '../../../store/main/actions';
import CardsActions from '../../../store/cards/actions';
import CardScreen from '../CardScreen';
import { QuestionnaireType } from '../../../types/QuestionnaireType';

interface QuestionnaireCardContainerProps {
  route: { params: { questionnaireId: string, profileId: string } },
  navigation: NavigationType,
  cardIndex: number | null,
  exitConfirmationModal: boolean,
  cards: Array<CardType>,
  setCards: (questionnaire: Array<CardType> | null) => void,
  setExitConfirmationModal: (boolean) => void,
  resetCardReducer: () => void,
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
  resetCardReducer,
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
    } catch (e) {
      if (e.status === 401) signOut();
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

    resetCardReducer();
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

  const Tab = createMaterialTopTabNavigator();

  return cards.length > 0 && questionnaire && (
    <Tab.Navigator tabBar={() => <></>} swipeEnabled={false}>
      <Tab.Screen key={0} name={'startCard'} >
        {() => <StartCard title={questionnaire.name} goBack={goBack} />}
      </Tab.Screen>
      {cards.map((_, index) => (
        <Tab.Screen key={index} name={`card-${index}`}>
          {() => <CardScreen index={index} goBack={goBack} />}
        </Tab.Screen>
      ))}
      <Tab.Screen key={cards.length + 1} name={`card-${cards.length}`}>
        {() => <QuestionnaireEndCard goBack={goBack} questionnaire={questionnaire} courseId={profileId} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const mapStateToProps = (state: StateType) => ({
  cards: state.cards.cards,
  cardIndex: state.cards.cardIndex,
  exitConfirmationModal: state.cards.exitConfirmationModal,
});

const mapDispatchToProps = dispatch => ({
  setCards: cards => dispatch(CardsActions.setCards(cards)),
  setExitConfirmationModal: openModal => dispatch(CardsActions.setExitConfirmationModal(openModal)),
  resetCardReducer: () => dispatch(CardsActions.resetCardReducer()),
  setStatusBarVisible: statusBarVisible => dispatch(MainActions.setStatusBarVisible(statusBarVisible)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireCardContainer);
