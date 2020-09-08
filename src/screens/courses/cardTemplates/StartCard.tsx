import React from 'react';
import { View, StyleSheet, Text, Image, ImageBackground } from 'react-native';
import Button from '../../../components/form/Button';
import { navigate } from '../../../navigationRef';
import { PINK, WHITE } from '../../../styles/colors';
import { PADDING } from '../../../styles/metrics';
import { FIRA_SANS_BLACK } from '../../../styles/fonts';
import CardHeader from '../../../components/cards/CardHeader';

interface StartCardProps {
  title: string,
  courseId: string,
}

const StartCard = ({ title, courseId }: StartCardProps) => (
  <View style={styles.container}>
    <CardHeader
      color={WHITE}
      onPress={() => navigate('Home', { screen: 'Courses', params: { screen: 'CourseProfile', params: { courseId } } })}
      icon={'arrow-left'}/>
    <View style={styles.subcontainer}>
      <View>
        <ImageBackground style={styles.pink_potato}
          source={require('../../../../assets/images/pink_background_start_card.png')}>
          <ImageBackground style={styles.white_potato}
            source={require('../../../../assets/images/white_background_start_card.png.png')}>
            <Image source={require('../../../../assets/images/doct-liste.png')} style={styles.image}/>
          </ImageBackground>
        </ImageBackground>
        <Text style={styles.text}>{title}</Text>
      </View>
      <Button style={styles.button}
        bgColor={WHITE}
        color={PINK['500']}
        caption="Démarrer"
        onPress={() => navigate('card-0')}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: PINK['500'],
    flex: 1,
  },
  subcontainer: {
    marginHorizontal: PADDING.XXL,
    justifyContent: 'space-between',
    flex: 1,
  },
  text: {
    ...FIRA_SANS_BLACK.XL,
    color: WHITE,
    alignSelf: 'center',
    marginTop: 71,
  },
  white_potato: {
    height: 227,
    width: 260,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 7,
    marginTop: 15,
  },
  pink_potato: {
    height: 268,
    width: 288,
    resizeMode: 'contain',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 131.91,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  button: {
    marginBottom: 48,
  },
});

export default StartCard;
