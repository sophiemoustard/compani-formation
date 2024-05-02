// @ts-nocheck

import { useContext, useState } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import Actions from '@/store/cards/actions';
import ExitModal from '@/components/ExitModal';
import CardTemplate from '@/components/cardTemplates/CardTemplate';
import { SWIPE_SENSIBILITY } from '@/core/data/constants';
import styles from './styles';
import { StateType, ActionType } from '@/types/store/StoreType';
import { Context as CardContext } from '@/context/CardContext';
import { CardType } from '@/types/CardType';

interface CardScreenProps {
  exitConfirmationModal: boolean,
  cards: CardType[],
  setExitConfirmationModal: (boolean: boolean) => void,
  resetCardReducer: () => void,
}

const CardScreen = ({ exitConfirmationModal, cards, setExitConfirmationModal, resetCardReducer }: CardScreenProps) => {
  const router = useRouter();
  const [isLeftSwipeEnabled, setIsLeftSwipeEnabled] = useState<boolean>(true);
  const [isRightSwipeEnabled, setIsRightSwipeEnabled] = useState<boolean>(false);
  const { cardscreen } = useLocalSearchParams();
  const index = Number(cardscreen);
  const { profileId, setIsActive } = useContext(CardContext);

  const onSwipe = Gesture.Pan().onEnd((event) => {
    if (event.translationX > SWIPE_SENSIBILITY && index > 0 && isLeftSwipeEnabled) {
      runOnJS(router.navigate)(`Courses/QuestionnaireCardContainer/${index - 1}`);
    }

    if (event.translationX < -SWIPE_SENSIBILITY && isRightSwipeEnabled) {
      runOnJS(router.navigate)(`Courses/QuestionnaireCardContainer/${index + 1}`);
    }
  });

  const goBack = async () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);

    router.navigate({ pathname: '/Courses/LearnerCourseProfile', params: { courseId: profileId } });

    setIsActive(false);
    resetCardReducer();
  };

  if (cards.length === index) {
    return <Redirect href={'/Courses/QuestionnaireCardContainer/cardTemplates/QuestionnaireEndCard'} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={onSwipe}
        activeOffsetX={[-SWIPE_SENSIBILITY, SWIPE_SENSIBILITY]}>
        <View style={styles.cardScreen}>
          <ExitModal onPressConfirmButton={goBack} visible={exitConfirmationModal} title={'Êtes-vous sûr(e) de cela ?'}
            onPressCancelButton={() => setExitConfirmationModal(false)} contentText={'Tous vos progrès seront perdus'}
          />
          <CardTemplate index={index} setIsLeftSwipeEnabled={setIsLeftSwipeEnabled}
            setIsRightSwipeEnabled={setIsRightSwipeEnabled} />
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const mapStateToProps = (state: StateType) => ({
  exitConfirmationModal: state.cards.exitConfirmationModal,
  cards: state.cards.cards,
});

const mapDispatchToProps = (dispatch: ({ type, payload }: ActionType) => void) => ({
  setExitConfirmationModal: (openModal: boolean) => dispatch(Actions.setExitConfirmationModal(openModal)),
  resetCardReducer: () => dispatch(Actions.resetCardReducer()),

});

export default connect(mapStateToProps, mapDispatchToProps)(CardScreen);
