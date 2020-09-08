import React from 'react';
import { View, StyleSheet, Text, Image, ImageBackground } from 'react-native';
import Button from '../../../components/form/Button';
import { navigate } from '../../../navigationRef';
import { PINK, WHITE } from '../../../styles/colors';
import { PADDING, MARGIN } from '../../../styles/metrics';
import { FIRA_SANS_BLACK } from '../../../styles/fonts';
import CardHeader from '../../../components/cards/CardHeader';

interface StartCardProps {
  title: string,
  courseId: string,
}

const StartCard = ({ title, courseId }: StartCardProps) => {
  const goBack = () => {
    navigate('Home', { screen: 'Courses', params: { screen: 'CourseProfile', params: { courseId } } });
  };

  return (
    <View style={styles.container}>
      <CardHeader color={WHITE} onPress={() => goBack()} icon='arrow-left' />
      <View style={styles.contentContainer}>
        <View>
          <ImageBackground imageStyle={{ resizeMode: 'contain' }} style={styles.imageBackground}
            source={require('../../../../assets/images/start_card_background.png')}>
            <Image source={require('../../../../assets/images/doct_liste.png')} style={styles.image} />
          </ImageBackground>
          <Text style={styles.text}>{title}</Text>
        </View>
        <Button style={styles.button} bgColor={WHITE} color={PINK['500']} caption="Démarrer"
          onPress={() => navigate('card-0')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: PINK['500'],
    flex: 1,
  },
  contentContainer: {
    marginHorizontal: PADDING.XXL,
    justifyContent: 'space-between',
    flex: 1,
  },
  text: {
    ...FIRA_SANS_BLACK.XL,
    color: WHITE,
    marginTop: MARGIN.XXL,
    textAlign: 'center',
  },
  imageBackground: {
    height: 264,
    width: 288,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 128,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  button: {
    marginBottom: MARGIN.XL,
  },
});

export default StartCard;
