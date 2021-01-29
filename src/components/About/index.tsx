import React, { useEffect } from 'react';
import { Image, Text, View, ScrollView, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import Markdown from 'react-native-markdown-display';
import get from 'lodash/get';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { markdownStyle } from '../../styles/common';
import { GREY, TRANSPARENT_GRADIENT, WHITE } from '../../styles/colors';
import { ICON } from '../../styles/metrics';
import Button from '../../components/form/Button';
import FeatherButton from '../../components/icons/FeatherButton';
import CoursesActions from '../../store/courses/actions';
import { ActionWithoutPayloadType } from '../../types/store/StoreType';
import { ProgramType } from '../../types/ProgramType';
import FooterGradient from '../design/FooterGradient';

interface AboutProps {
  program: ProgramType,
  buttonCaption?: string,
  children?: any,
  onPress: () => void,
}

const About = ({ program, buttonCaption = 'Continuer', children, onPress }: AboutProps) => {
  const defaultImg = require('../../../assets/images/authentication_background_image.jpg');
  const programImage = get(program, 'image.link') || '';
  const source = programImage ? { uri: programImage } : defaultImg;
  const navigation = useNavigation();

  const hardwareBackPress = () => {
    goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = () => navigation.goBack();

  return (
    <>
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header} />
        <View style={styles.content}>
          <FeatherButton name='arrow-left' onPress={goBack} size={ICON.MD} color={WHITE} />
          <View style={styles.titleContainer}>
            <Text style={styles.aboutTitle}>A PROPOS</Text>
            <Text style={styles.programTitle}>{program.name}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={source} />
          </View>
          {!!program.description &&
            <>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.sectionContent}>{program.description}</Text>
            </>}
          {!!program.learningGoals &&
            <>
              <Text style={styles.sectionTitle}>Objectifs pédagogiques</Text>
              <Markdown style={markdownStyle(styles.sectionContent)}>{program.learningGoals}</Markdown>
            </>}
        </View>
        {children}
      </ScrollView>
      <View style={styles.footer}>
        <FooterGradient colors={[TRANSPARENT_GRADIENT, GREY[0]]} />
        <Button caption={buttonCaption} onPress={onPress} />
      </View>
    </>
  );
};

const mapDispatchToProps = (dispatch: ({ type }: ActionWithoutPayloadType) => void) => ({
  setIsCourse: (isCourse: boolean) => dispatch(CoursesActions.setIsCourse(isCourse)),
});

export default connect(null, mapDispatchToProps)(About);
