// @ts-nocheck

import { useState } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Actions from '../../../store/cards/actions';
import ExitModal from '../../../components/ExitModal';
import CardTemplate from '../cardTemplates/CardTemplate';
import { SWIPE_SENSIBILITY } from '../../../core/data/constants';
import styles from './styles';
import { StateType, ActionType } from '../../../types/store/StoreType';

interface CardScreenProps {
  index: number,
  exitConfirmationModal: boolean,
  setExitConfirmationModal: (boolean) => void,
  goBack: () => void,
}

const CardScreen = ({ index, exitConfirmationModal, setExitConfirmationModal, goBack }: CardScreenProps) => {
  const navigation = useNavigation();
  const [isLeftSwipeEnabled, setIsLeftSwipeEnabled] = useState<boolean>(true);
  const [isRightSwipeEnabled, setIsRightSwipeEnabled] = useState<boolean>(false);

  const onSwipe = (cardIndex, event) => {
    if (event.nativeEvent.translationX > SWIPE_SENSIBILITY && cardIndex > 0 && isLeftSwipeEnabled) {
      navigation.navigate(`card-${cardIndex - 1}`);
    }

    if (event.nativeEvent.translationX < -SWIPE_SENSIBILITY && isRightSwipeEnabled) {
      navigation.navigate(`card-${cardIndex + 1}`);
    }
  };

  return (
    <PanGestureHandler onGestureEvent={event => onSwipe(index, event)}
      activeOffsetX={[-SWIPE_SENSIBILITY, SWIPE_SENSIBILITY]}>
      <View style={styles.cardScreen}>
        <ExitModal onPressConfirmButton={goBack} visible={exitConfirmationModal} title={'Êtes-vous sûr(e) de cela ?'}
          onPressCancelButton={() => setExitConfirmationModal(false)} contentText={'Tous vos progrès seront perdus'} />
        <CardTemplate index={index} setIsLeftSwipeEnabled={setIsLeftSwipeEnabled}
          setIsRightSwipeEnabled={setIsRightSwipeEnabled} />
      </View>
    </PanGestureHandler>
  );
};

const mapStateToProps = (state: StateType) => ({
  exitConfirmationModal: state.cards.exitConfirmationModal,
});

const mapDispatchToProps = (dispatch: ({ type, payload }: ActionType) => void) => ({
  setExitConfirmationModal: openModal => dispatch(Actions.setExitConfirmationModal(openModal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardScreen);
