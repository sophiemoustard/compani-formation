import React, { useContext, useEffect, useState } from 'react';
import { Text, ScrollView, Image, View, ImageBackground, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { formatPhone } from '../../../core/helpers/utils';
import NiButton from '../../../components/form/Button';
import commonStyles from '../../../styles/common';
import { Context as AuthContext } from '../../../context/AuthContext';
import styles from './styles';
import Course from '../../../api/courses';
import { GREY, PINK } from '../../../styles/colors';
import { UserType } from '../../../types/UserType';
import { NavigationType } from '../../../types/NavigationType';
import { ICON } from '../../../styles/metrics';
import FeatherButton from '../../../components/icons/FeatherButton';
import PictureModal from '../../../components/PictureModal';

interface ProfileProps {
  loggedUser: UserType,
  navigation: NavigationType,
}

const Profile = ({ loggedUser, navigation }: ProfileProps) => {
  const { signOut } = useContext(AuthContext);
  const [onGoingCoursesCount, setOnGoingCoursesCount] = useState<number>();
  const [achievedCoursesCount, setAchievedCoursesCount] = useState<number>();
  const [source, setSource] = useState(require('../../../../assets/images/default_avatar.png'));
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const [pictureModal, setPictureModal] = useState<boolean>(false);

  const getUserCourses = async () => {
    try {
      const fetchedCourses = await Course.getUserCourses();
      setOnGoingCoursesCount(fetchedCourses.filter(course => course.progress < 1).length);
      setAchievedCoursesCount(fetchedCourses.filter(course => course.progress === 1).length);
    } catch (e) {
      if (e.status === 401) signOut();
      setOnGoingCoursesCount(0);
      setAchievedCoursesCount(0);
    }
  };

  const editProfile = () => navigation.navigate('ProfileEdition');

  const editPassword = () => navigation.navigate('PasswordEdition', { userId: loggedUser._id });

  useEffect(() => {
    async function fetchData() { await getUserCourses(); }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView style={commonStyles.container} contentContainerStyle={styles.container}>
      {!!loggedUser &&
        <>
          <Text style={[commonStyles.title, styles.title]}>Mon profil</Text>
          <View style={styles.identityContainer}>
            <ImageBackground imageStyle={{ resizeMode: 'contain' }} style={styles.identityBackground}
              source={require('../../../../assets/images/profile_background.png')}>
              <TouchableOpacity onPress={() => setPictureModal(true)}>
                <Image style={styles.profileImage} source={source} />
                <FeatherButton name={hasPhoto ? 'edit-2' : 'plus'} onPress={() => setPictureModal(true)} size={ICON.SM}
                  color={PINK[500]} style={styles.profileImageEdit} />
              </TouchableOpacity>
              <Text style={styles.name}>{loggedUser.identity.firstname || ''} {loggedUser.identity.lastname}</Text>
              <Text style={styles.company}>{loggedUser.company?.name || ''}</Text>
              <View style={styles.coursesContainer}>
                <View style={styles.coursesContent}>
                  <Text style={styles.courses}>FORMATIONS EN COURS</Text>
                  <Text style={styles.numberOfCourses}>{onGoingCoursesCount}</Text>
                </View>
                <View style={styles.coursesContent}>
                  <Text style={styles.courses}>FORMATIONS TERMINÉES</Text>
                  <Text style={styles.numberOfCourses}>{achievedCoursesCount}</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.sectionDelimiter} />
          <View style={styles.contactsContainer}>
            <Text style={styles.contact}>Contact</Text>
            <Text style={styles.subTitle}>Téléphone</Text>
            <Text style={styles.infos}>
              {loggedUser.contact?.phone ? formatPhone(loggedUser.contact.phone) : 'Non renseigné'}
            </Text>
            <Text style={styles.subTitle}>E-mail</Text>
            <Text style={styles.infos}>{loggedUser.local.email}</Text>
            <NiButton caption="Modifier mes informations" onPress={editProfile}
              bgColor={GREY[100]} color={GREY[600]} borderColor={GREY[600]} />
            <NiButton style={styles.passwordButton} caption="Modifier mon mot de passe" onPress={editPassword}
              bgColor={GREY[100]} color={GREY[600]} borderColor={GREY[600]} />
          </View>
          <View style={styles.sectionDelimiter} />
        </>
      }
      <NiButton style={styles.logOutButton} caption="Se déconnecter" onPress={signOut}
        bgColor={GREY[100]} color={GREY[600]} borderColor={GREY[600]} />
      <View style={styles.footer}>
        <Image style={styles.elipse} source={require('../../../../assets/images/log_out_background.png')} />
        <Image source={require('../../../../assets/images/aux_joie.png')} style={styles.fellow} />
      </View>
      <PictureModal visible={pictureModal} hasPhoto={hasPhoto} setPictureModal={setPictureModal} setSource={setSource}
        setHasPhoto={setHasPhoto} />
    </ScrollView>
  );
};

const mapStateToProps = state => ({ loggedUser: state.main.loggedUser });

export default connect(mapStateToProps)(Profile);
