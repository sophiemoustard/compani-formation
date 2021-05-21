import React from 'react';
import { View, Text, Image, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NiPrimaryButton from '../../../../components/form/PrimaryButton';
import { PINK, WHITE } from '../../../../styles/colors';
import CardHeader from '../../../../components/cards/CardHeader';
import styles from './styles';

interface StartCardProps {
  title: string,
  goBack: () => void,
}

const StartCard = ({
  title,
  goBack,
}: StartCardProps) => {
  const navigation = useNavigation();

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
        <NiPrimaryButton customStyle={styles.button} bgColor={WHITE} color={PINK[500]} caption="Démarrer"
          onPress={() => navigation.navigate('card-0')} />
      </View>
    </ScrollView>
  );
};

export default StartCard;
