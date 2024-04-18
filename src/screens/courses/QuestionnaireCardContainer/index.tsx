// @ts-nocheck

import { Dispatch, useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import { connect } from 'react-redux';
import Questionnaires from '../../../api/questionnaires';
import { CardType } from '../../../types/CardType';
import { RootCardParamList, RootStackParamList } from '../../../types/NavigationType';
import StartCard from '../cardTemplates/StartCard';
import QuestionnaireEndCard from '../cardTemplates/QuestionnaireEndCard';
import { StateType } from '../../../types/store/StoreType';
import MainActions from '../../../store/main/actions';
import CardsActions from '../../../store/cards/actions';
import CardScreen from '../CardScreen';
import { capitalizeFirstLetter, getQuestionnaireTitle, sortStrings } from '../../../core/helpers/utils';
import { QuestionnaireType } from '../../../types/QuestionnaireType';
import { ActionType } from '../../../context/types';

interface QuestionnaireCardContainerProps extends StackScreenProps<RootStackParamList, 'QuestionnaireCardContainer'> {
  cardIndex: number | null,
  exitConfirmationModal: boolean,
  cards: CardType[],
  setCards: (questionnaire: CardType[] | null) => void,
  setExitConfirmationModal: (boolean: boolean) => void,
  resetCardReducer: () => void,
  setStatusBarVisible: (boolean: boolean) => void,
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
  const [questionnaires, setQuestionnaires] = useState<QuestionnaireType[]>([]);
  const [title, setTitle] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(true);
  const { profileId } = route.params;

  useEffect(() => {
    setStatusBarVisible(false);
  }, [setStatusBarVisible]);

  const getQuestionnaires = async () => {
    try {
      const fetchedQuestionnaires = await Questionnaires.list({ course: profileId });
      const sortedQuestionnaires = [...fetchedQuestionnaires].sort((a, b) => sortStrings(a.type, b.type));
      setQuestionnaires(sortedQuestionnaires);
      setCards(sortedQuestionnaires.map(q => q.cards).flat());
      setTitle(capitalizeFirstLetter(getQuestionnaireTitle(sortedQuestionnaires.map(q => q.type))));
    } catch (e: any) {
      console.error(e);
      setQuestionnaires([]);
      setCards([]);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await getQuestionnaires();
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = async () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);

    navigation.navigate('LearnerCourseProfile', { courseId: profileId });

    setIsActive(false);
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

  const Tab = createMaterialTopTabNavigator<RootCardParamList>();

  return isActive
    ? <Tab.Navigator tabBar={() => <></>} screenOptions={{ swipeEnabled: false }}>
      <Tab.Screen key={0} name={'startCard'} >
        {() => <StartCard title={title} goBack={goBack}
          isLoading={!(cards.length > 0 && questionnaires.length)} />}
      </Tab.Screen>
      {cards.length > 0 && questionnaires.length &&
        <>
          {cards.map((_, index) => (
            <Tab.Screen key={index} name={`card-${index}`}>
              {() => <CardScreen index={index} goBack={goBack} />}
            </Tab.Screen>
          ))}
          <Tab.Screen key={cards.length + 1} name={`card-${cards.length}`}>
            {() => <QuestionnaireEndCard goBack={goBack} questionnaires={questionnaires} courseId={profileId} />}
          </Tab.Screen>
        </>
      }
    </Tab.Navigator>
    : null;
};

const mapStateToProps = (state: StateType) => ({
  cards: state.cards.cards,
  cardIndex: state.cards.cardIndex,
  exitConfirmationModal: state.cards.exitConfirmationModal,
});

const mapDispatchToProps = (dispatch: Dispatch<ActionType>) => ({
  setCards: (cards: CardType[]) => dispatch(CardsActions.setCards(cards)),
  setExitConfirmationModal: (openModal: boolean) => dispatch(CardsActions.setExitConfirmationModal(openModal)),
  resetCardReducer: () => dispatch(CardsActions.resetCardReducer()),
  setStatusBarVisible: (statusBarVisible: boolean) => dispatch(MainActions.setStatusBarVisible(statusBarVisible)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireCardContainer);
