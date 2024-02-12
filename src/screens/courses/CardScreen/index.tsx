// @ts-nocheck

import { useState } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import Actions from '../../../store/cards/actions';
import ExitModal from '../../../components/ExitModal';
import CardTemplate from '../cardTemplates/CardTemplate';
import { SWIPE_SENSIBILITY } from '../../../core/data/constants';
import styles from './styles';
import { StateType, ActionType } from '../../../types/store/StoreType';

interface CardScreenProps {
  index: number,
  exitConfirmationModal: boolean,
  setExitConfirmationModal: (boolean: boolean) => void,
  goBack: () => void,
}

const CardScreen = ({ index, exitConfirmationModal, setExitConfirmationModal, goBack }: CardScreenProps) => {
  const navigation = useNavigation();
  const [isLeftSwipeEnabled, setIsLeftSwipeEnabled] = useState<boolean>(true);
  const [isRightSwipeEnabled, setIsRightSwipeEnabled] = useState<boolean>(false);

  const onSwipe = Gesture.Pan().onEnd((event) => {
    if (event.translationX > SWIPE_SENSIBILITY && index > 0 && isLeftSwipeEnabled) {
      runOnJS(navigation.navigate)(`card-${index - 1}`);
    }

    if (event.translationX < -SWIPE_SENSIBILITY && isRightSwipeEnabled) {
      runOnJS(navigation.navigate)(`card-${index + 1}`);
    }
  });

  return (
    <GestureDetector gesture={onSwipe}
      activeOffsetX={[-SWIPE_SENSIBILITY, SWIPE_SENSIBILITY]}>
      <View style={styles.cardScreen}>
        <ExitModal onPressConfirmButton={goBack} visible={exitConfirmationModal} title={'Êtes-vous sûr(e) de cela ?'}
          onPressCancelButton={() => setExitConfirmationModal(false)} contentText={'Tous vos progrès seront perdus'} />
        <CardTemplate index={index} setIsLeftSwipeEnabled={setIsLeftSwipeEnabled}
          setIsRightSwipeEnabled={setIsRightSwipeEnabled} />
      </View>
    </GestureDetector>
  );
};

const mapStateToProps = (state: StateType) => ({
  exitConfirmationModal: state.cards.exitConfirmationModal,
});

const mapDispatchToProps = (dispatch: ({ type, payload }: ActionType) => void) => ({
  setExitConfirmationModal: (openModal: boolean) => dispatch(Actions.setExitConfirmationModal(openModal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardScreen);
