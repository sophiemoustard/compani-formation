import { useCallback, useEffect, useState } from 'react';
import { Image, Text, View, ScrollView, BackHandler, ImageSourcePropType } from 'react-native';
import { connect } from 'react-redux';
import Markdown from 'react-native-markdown-display';
import get from 'lodash/get';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { markdownStyle } from '../../styles/common';
import { GREY, TRANSPARENT_GRADIENT, WHITE } from '../../styles/colors';
import { ICON } from '../../styles/metrics';
import NiPrimaryButton from '../../components/form/PrimaryButton';
import FeatherButton from '../../components/icons/FeatherButton';
import CoursesActions from '../../store/courses/actions';
import { ActionWithoutPayloadType } from '../../types/store/StoreType';
import { ProgramType } from '../../types/CourseTypes';
import FooterGradient from '../design/FooterGradient';

type AboutProps = {
  program: ProgramType,
  buttonCaption?: string,
  children?: any,
  onPress: () => void,
}

const About = ({ program, buttonCaption = 'Continuer', children, onPress }: AboutProps) => {
  const [source, setSource] =
    useState<ImageSourcePropType>(require('../../../assets/images/authentication_background_image.jpg'));
  const navigation = useNavigation();

  useEffect(() => {
    const programImage = get(program, 'image.link') || '';
    if (programImage) setSource({ uri: programImage });
    else setSource(require('../../../assets/images/authentication_background_image.jpg'));
  }, [program]);

  const hardwareBackPress = useCallback(() => {
    navigation.goBack();
    return true;
  }, [navigation]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  }, [hardwareBackPress]);

  return (
    <>
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header} />
        <View style={styles.content}>
          <FeatherButton name='arrow-left' onPress={navigation.goBack} size={ICON.MD} color={WHITE} />
          <View style={styles.titleContainer}>
            <Text style={styles.aboutTitle}>A PROPOS</Text>
            <Text style={styles.programTitle}>{program.name}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={source} />
          </View>
          {!!program.description && <>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionContent}>{program.description}</Text>
          </>}
          {!!program.learningGoals && <>
            <Text style={styles.sectionTitle}>Objectifs pédagogiques</Text>
            <Markdown style={markdownStyle(styles.sectionContent)}>{program.learningGoals}</Markdown>
          </>}
        </View>
        {children}
      </ScrollView>
      <View style={styles.footer}>
        <FooterGradient colors={[TRANSPARENT_GRADIENT, GREY[0]]} />
        <NiPrimaryButton caption={buttonCaption} onPress={onPress} />
      </View>
    </>
  );
};

const mapDispatchToProps = (dispatch: ({ type }: ActionWithoutPayloadType) => void) => ({
  setIsCourse: (isCourse: boolean) => dispatch(CoursesActions.setIsCourse(isCourse)),
});

export default connect(null, mapDispatchToProps)(About);
