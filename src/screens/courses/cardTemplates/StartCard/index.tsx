import React, { useEffect } from 'react';
import { View, Text, Image, ImageBackground, ScrollView, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Button from '../../../../components/form/Button';
import { PINK, WHITE } from '../../../../styles/colors';
import CardHeader from '../../../../components/cards/CardHeader';
import ActivitiesActions from '../../../../store/activities/actions';
import styles from './styles';
import MainActions from '../../../../store/main/actions';
import CardsActions from '../../../../store/cards/actions';

interface StartCardProps {
  title: string,
  setStatusBarVisible: (boolean) => void,
  goBack: () => void,
}

const StartCard = ({
  title,
  setStatusBarVisible,
  goBack,
}: StartCardProps) => {
  const navigation = useNavigation();

  useEffect(() => {
    setStatusBarVisible(false);
  });

  const hardwareBackPress = () => {
    goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      <CardHeader color={WHITE} onPress={goBack} icon='arrow-left' />
      <View style={styles.wrapper}>
        <View>
          <ImageBackground imageStyle={{ resizeMode: 'contain' }} style={styles.imageBackground}
            source={require('../../../../../assets/images/start_card_background.png')}>
            <Image source={require('../../../../../assets/images/doct_liste.png')} style={styles.image} />
          </ImageBackground>
          <Text style={styles.text}>{title}</Text>
        </View>
        <Button style={styles.button} bgColor={WHITE} color={PINK[500]} caption="Démarrer"
          onPress={() => navigation.navigate('card-0')} />
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = dispatch => ({
  resetActivityReducer: () => dispatch(ActivitiesActions.resetActivityReducer()),
  setStatusBarVisible: statusBarVisible => dispatch(MainActions.setStatusBarVisible(statusBarVisible)),
  resetCardReducer: () => dispatch(CardsActions.resetCardReducer()),
});

export default connect(null, mapDispatchToProps)(StartCard);
