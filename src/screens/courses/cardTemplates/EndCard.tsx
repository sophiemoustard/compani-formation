import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground } from 'react-native';
import Button from '../../../components/form/Button';
import { navigate } from '../../../navigationRef';
import { YELLOW, GREY } from '../../../styles/colors';
import { MARGIN } from '../../../styles/metrics';
import { FIRA_SANS_BLACK } from '../../../styles/fonts';

interface EndCardProps {
  courseId: String,
}

const EndCard = ({ courseId }: EndCardProps) => {
  const goBack = () => {
    navigate('Home', { screen: 'Courses', params: { screen: 'CourseProfile', params: { courseId } } });
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.elipse} source={require('../../../../assets/images/end_card_background.png')}>
        <Text style={styles.text}>Activité terminée</Text>
        <Image source={require('../../../../assets/images/aux_fierte.png')} style={styles.image} />
      </ImageBackground>
      <Button style={styles.button} caption="Terminer" onPress={goBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: YELLOW['100'],
    flex: 1,
    justifyContent: 'space-between',
  },
  text: {
    ...FIRA_SANS_BLACK.XL,
    color: GREY['800'],
    marginVertical: MARGIN.XXL,
  },
  image: {
    height: 160,
    resizeMode: 'contain',
    marginTop: MARGIN.XL,
  },
  elipse: {
    height: 320,
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {
    marginBottom: MARGIN.XL,
    marginHorizontal: MARGIN.XL,
  },
});

export default EndCard;
