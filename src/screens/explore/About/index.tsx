import React from 'react';
import { Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import get from 'lodash/get';
import { navigate } from '../../../navigationRef';
import styles from './styles';
import { PINK, WHITE } from '../../../styles/colors';
import { ICON } from '../../../styles/metrics';
import { ProgramType } from '../../../types/ProgramType';

interface AboutProps {
  route: { params: { program: ProgramType } },
}

const About = ({ route }: AboutProps) => {
  const { program } = route.params;

  const programImage = get(program, 'image.link') || '';
  const programName = get(program, 'name') || '';
  const programDescription = get(program, 'description') || '';
  const source = programImage
    ? { uri: programImage }
    : require('../../../../assets/images/authentication_background_image.jpg');
  const goBack = () => {
    navigate('Home', { screen: 'Explore', params: { screen: 'Catalog' } });
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.header} />
      <View style={styles.content}>
        <TouchableOpacity onPress={goBack}>
          <Feather name="arrow-left" color={WHITE} size={ICON.MD} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.aboutTitle}>A PROPOS</Text>
          <Text style={styles.programTitle}>{programName}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={source} />
        </View>
        <View style={styles.description}>
          <Text>{programDescription}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default About;
