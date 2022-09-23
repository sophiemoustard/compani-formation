import { useContext, useEffect, useState } from 'react';
import { Text, ScrollView, Image, View, ImageBackground, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { CameraCapturedPicture } from 'expo-camera';
import { RootBottomTabParamList, RootStackParamList } from '../../../types/NavigationType';
import { formatPhone, getCourseProgress } from '../../../core/helpers/utils';
import NiSecondaryButton from '../../../components/form/SecondaryButton';
import NiPrimaryButton from '../../../components/form/PrimaryButton';
import commonStyles from '../../../styles/common';
import { Context as AuthContext } from '../../../context/AuthContext';
import styles from './styles';
import Courses from '../../../api/courses';
import Users from '../../../api/users';
import { PINK } from '../../../styles/colors';
import { UserType } from '../../../types/UserType';
import { HIT_SLOP, ICON } from '../../../styles/metrics';
import FeatherButton from '../../../components/icons/FeatherButton';
import PictureModal from '../../../components/PictureModal';
import CompanySearchModal from '../../../components/companyLinkRequest/CompanySearchModal';
import DeletionConfirmationModal from '../../../components/DeletionConfirmationModal';
import UserAccountDeletedModal from '../../../components/UserAccountDeletedModal';
import HomeScreenFooter from '../../../components/HomeScreenFooter';
import { formatImagePayload } from '../../../core/helpers/pictures';
import { ActionType, ActionWithoutPayloadType } from '../../../types/store/StoreType';
import MainActions from '../../../store/main/actions';
import CameraModal from '../../../components/camera/CameraModal';
import ImagePickerManager from '../../../components/ImagePickerManager';

interface ProfileProps extends CompositeScreenProps<
StackScreenProps<RootBottomTabParamList>,
StackScreenProps<RootStackParamList>
> {
  loggedUser: UserType,
  setLoggedUser: (user: UserType) => void,
}

const Profile = ({ loggedUser, setLoggedUser, navigation }: ProfileProps) => {
  const { signOut } = useContext(AuthContext);
  const [onGoingCoursesCount, setOnGoingCoursesCount] = useState<number>();
  const [achievedCoursesCount, setAchievedCoursesCount] = useState<number>();
  const [source, setSource] = useState(require('../../../../assets/images/default_avatar.png'));
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const [pictureModal, setPictureModal] = useState<boolean>(false);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [deletionConfirmationModal, setDeletionConfirmationModal] = useState<boolean>(false);
  const [userAccountDeletedModal, setUserAccountDeletedModal] = useState<boolean>(false);
  const [userFirstName, setUserFirstName] = useState<string>('');
  const [camera, setCamera] = useState<boolean>(false);
  const [imagePickerManager, setImagePickerManager] = useState<boolean>(false);

  const getUserCourses = async () => {
    try {
      const fetchedCourses = await Courses.getUserCourses();
      setOnGoingCoursesCount(fetchedCourses.filter(course => getCourseProgress(course) < 1).length);
      setAchievedCoursesCount(fetchedCourses.filter(course => getCourseProgress(course) === 1).length);
    } catch (e: any) {
      console.error(e);
      setOnGoingCoursesCount(0);
      setAchievedCoursesCount(0);
    }
  };

  const editProfile = () => navigation.navigate('ProfileEdition');

  const editPassword = () => navigation.navigate('PasswordEdition', { userId: loggedUser._id });

  const clearExpoTokenAndSignOut = () => signOut(true);

  useEffect(() => {
    async function fetchData() { await getUserCourses(); }
    fetchData();
    setUserFirstName(get(loggedUser, 'identity.firstname'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderCompanyLinkRequest = () => {
    if (loggedUser.companyLinkRequest) {
      return (
        <Text style={styles.linkRequestContainer}>
          <Text style={styles.linkRequestText}>Demande de rattachement envoyée à </Text>
          <Text style={styles.companyName}>{loggedUser.companyLinkRequest.company.name}</Text>
        </Text>
      );
    }

    return (
      <View style={styles.linkRequestButton}>
        <NiPrimaryButton caption="Ajouter ma structure" onPress={() => setIsModalOpened(true)} />
      </View>
    );
  };

  const savePicture = async (picture: CameraCapturedPicture) => {
    const { firstname, lastname } = loggedUser.identity;
    const fileName = `photo_${firstname}_${lastname}`;
    const data = await formatImagePayload(picture, fileName);

    if (loggedUser.picture?.link) await Users.deleteImage(loggedUser._id);
    await Users.uploadImage(loggedUser._id, data);

    const user = await Users.getById(loggedUser._id);
    setLoggedUser(user);
  };

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        {!!loggedUser &&
          <>
            <Text style={[commonStyles.title, styles.title]}>Mon profil</Text>
            <View style={styles.identityContainer}>
              <ImageBackground imageStyle={{ resizeMode: 'contain' }} style={styles.identityBackground}
                source={require('../../../../assets/images/profile_background.png')}>
                <TouchableOpacity onPress={() => setPictureModal(true)}>
                  <Image style={styles.profileImage} source={source} />
                  <FeatherButton name={hasPhoto ? 'edit-2' : 'plus'} onPress={() => setPictureModal(true)}
                    size={ICON.SM} color={PINK[500]} style={styles.profileImageEdit} />
                </TouchableOpacity>
                <Text style={styles.name}>{loggedUser.identity.firstname || ''} {loggedUser.identity.lastname}</Text>
                {loggedUser.company?.name
                  ? <Text style={styles.company}>{loggedUser.company.name}</Text>
                  : renderCompanyLinkRequest()}
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
              <NiSecondaryButton caption="Modifier mes informations" onPress={editProfile} />
              <NiSecondaryButton customStyle={styles.passwordButton} caption="Modifier mon mot de passe"
                onPress={editPassword} />
            </View>
            <View style={styles.sectionDelimiter} />
          </>
        }
        <NiSecondaryButton customStyle={styles.logOutButton} caption="Me déconnecter"
          onPress={clearExpoTokenAndSignOut} />
        <TouchableOpacity hitSlop={HIT_SLOP} onPress={() => Linking.openURL('https://www.compani.fr/rgpd')}
          style={styles.legalNoticeContainer}>
          <Text style={styles.legalNotice}>Politique de confidentialité</Text>
        </TouchableOpacity>
        <TouchableOpacity hitSlop={HIT_SLOP} onPress={() => Linking.openURL('https://www.compani.fr/cgu-cgv')}
          style={styles.legalNoticeContainer}>
          <Text style={styles.legalNotice}>Conditions d’utilisation</Text>
        </TouchableOpacity>
        {!get(loggedUser, 'company') &&
          <TouchableOpacity hitSlop={HIT_SLOP} onPress={() => setDeletionConfirmationModal(true)}
            style={styles.legalNoticeContainer}>
            <Text style={styles.legalNotice}>Supprimer mon compte</Text>
          </TouchableOpacity>}
        <HomeScreenFooter source={require('../../../../assets/images/aux_joie.png')} />
        <PictureModal visible={pictureModal} hasPhoto={hasPhoto} setPictureModal={setPictureModal} setSource={setSource}
          setHasPhoto={setHasPhoto} openCamera={() => setCamera(true)}
          openImagePickerManager={() => setImagePickerManager(true)} />
        <CameraModal onRequestClose={() => setCamera(false)} savePicture={savePicture} visible={camera} />
        {imagePickerManager && <ImagePickerManager onRequestClose={() => setImagePickerManager(false)}
          savePicture={savePicture} />}
        <CompanySearchModal visible={isModalOpened} onRequestClose={() => setIsModalOpened(false)} />
        <DeletionConfirmationModal visible={deletionConfirmationModal} loggedUserId={get(loggedUser, '_id')}
          setVisible={() => setDeletionConfirmationModal(false)}
          setConfirmationModal={() => setUserAccountDeletedModal(true)} />
        <UserAccountDeletedModal visible={userAccountDeletedModal} name={userFirstName} logout={() => signOut()} />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({ loggedUser: state.main.loggedUser });

const mapDispatchToProps = (dispatch: ({ type }: ActionType | ActionWithoutPayloadType) => void) => ({
  setLoggedUser: (user: UserType) => dispatch(MainActions.setLoggedUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
