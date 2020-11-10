import React, { useContext, useEffect, useState } from 'react';
import { Text, ScrollView, Image, ImageSourcePropType, View, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import NiButton from '../../components/form/Button';
import commonStyles from '../../styles/common';
import { Context as AuthContext } from '../../context/AuthContext';
import styles from './styles';
import User from '../../api/users';
import Course from '../../api/courses';
import { getLoggedUserId } from '../../store/main/selectors';
import { CourseType } from '../../types/CourseType';
import { GREY } from '../../styles/colors';

interface ProfileProps {
  loggedUserId: string,
}

const Profile = ({ loggedUserId } :ProfileProps) => {
  const { signOut } = useContext(AuthContext);
  const defaultImg = require('../../../assets/images/authentication_background_image.jpg');
  const [user, setUser] = useState<any>(null);
  const [courses, setCourses] = useState<Array<CourseType>>([]);
  const [source, setSource] = useState<ImageSourcePropType>(defaultImg);

  const getProfile = async () => {
    try {
      const fetchedUser = await User.getById(loggedUserId);
      setUser(fetchedUser);
      setSource(fetchedUser.picture.link
        ? { uri: fetchedUser.picture.link }
        : { uri: 'https://res.cloudinary.com/alenvi/image/upload/c_scale,h_400,q_auto,w_400/v1513764284/images/users/default_avatar.png' });
    } catch (e) {
      if (e.status === 401) signOut();
      setUser(null);
    }
  };
  const getUserCourses = async () => {
    try {
      const fetchedCourses = await Course.getUserCourses();
      setCourses(fetchedCourses);
    } catch (e) {
      if (e.status === 401) signOut();
      setUser(null);
    }
  };

  useEffect(() => {
    async function fetchData() { await getProfile(); await getUserCourses(); }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user && (
    <ScrollView style={commonStyles.container}>
      <Text style={[commonStyles.title, styles.title]}>Mon profil</Text>
      <View style={styles.identityContainer}>
        <ImageBackground imageStyle={{ resizeMode: 'contain' }} style={styles.identityBackground}
          source={require('../../../assets/images/profile_background.png')}>
          <View style={styles.imageContainer}>
            <Image style={styles.profileImage} source={source} />
          </View>
          <View>
            <Text style={styles.name}>{user.identity.firstname || ''} {user.identity.lastname}</Text>
            <Text style={styles.company}>{user.company.name}</Text>
          </View>
          <Text style={styles.courses}>FORMATIONS EN COURS</Text>
          <Text style={styles.numberOfCourses}>{courses.length}</Text>
        </ImageBackground>
      </View>
      <View style={styles.sectionDelimiter} />
      <View style={styles.contactsContainer}>
        <Text style={styles.contact}>Contact</Text>
        <Text style={styles.subTitle}>Téléphone</Text>
        <Text style={styles.infos}>{user.contact.phone || 'Non renseigné'}</Text>
        <Text style={styles.subTitle}>E-mail</Text>
        <Text style={styles.infos}>{user.local.email}</Text>
      </View>
      <View style={styles.sectionDelimiter} />
      <NiButton style={styles.logOutButton} caption="Se déconnecter" onPress={signOut}
        bgColor={GREY[200]} color={GREY[800]} borderColor={GREY[200]} />
      <View style={styles.footer}>
        <Image style={styles.elipse} source={require('../../../assets/images/log_out_background.png')} />
        <Image source={require('../../../assets/images/aux-joie.png')} style={styles.fellow} />
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => ({ loggedUserId: getLoggedUserId(state) });

export default connect(mapStateToProps)(Profile);
