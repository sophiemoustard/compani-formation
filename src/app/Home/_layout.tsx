// @ts-nocheck
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Tabs, Redirect } from 'expo-router';
import { useContext } from 'react';
import CatalogIcon from '../../../assets/icons/CatalogIcon';
import CatalogSelectedIcon from '../../../assets/icons/CatalogSelectedIcon';
import LearnerCoursesIcon from '../../../assets/icons/LearnerCoursesIcon';
import LearnerCoursesSelectedIcon from '../../../assets/icons/LearnerCoursesSelectedIcon';
import TrainerCoursesIcon from '../../../assets/icons/TrainerCoursesIcon';
import TrainerCoursesSelectedIcon from '../../../assets/icons/TrainerCoursesSelectedIcon';
import ProfileIcon from '../../../assets/icons/ProfileIcon';
import ProfileSelectedIcon from '../../../assets/icons/ProfileSelectedIcon';
import { getUserVendorRole } from '@/store/main/selectors';
import { PINK } from '@/styles/colors';
import { FIRA_SANS_BOLD } from '@/styles/fonts';
import { MARGIN, TAB_BAR_HEIGHT, TAB_BAR_LABEL_WIDTH } from '@/styles/metrics';
import { VENDOR_ADMIN, TRAINING_ORGANISATION_MANAGER, TRAINER } from '@/core/data/constants';
import { StateType } from '@/types/store/StoreType';
import { AuthContextType, Context as AuthContext } from '@/context/AuthContext';

interface tabBarProps {
  focused: boolean
}

const catalogIcon = ({ focused }: tabBarProps) => (focused
  ? <View style={styles.iconContainer}>
    <CatalogSelectedIcon />
    <Text style={styles.iconText}>Explorer</Text>
  </View>
  : <CatalogIcon style={styles.iconContainer} />);

const learnerCoursesIcon = ({ focused }: tabBarProps) => (focused
  ? <View style={styles.iconContainer}>
    <LearnerCoursesSelectedIcon />
    <Text style={styles.iconText}>Mes formations</Text>
  </View>
  : <LearnerCoursesIcon style={styles.iconContainer} />);

const trainerCoursesIcon = ({ focused }: tabBarProps) => (focused
  ? <View style={styles.iconContainer}>
    <TrainerCoursesSelectedIcon />
    <Text style={styles.iconText}>Espace intervenant</Text>
  </View>
  : <TrainerCoursesIcon style={styles.iconContainer} />);

const profileIcon = ({ focused }: tabBarProps) => (focused
  ? <View style={styles.iconContainer}>
    <ProfileSelectedIcon />
    <Text style={styles.iconText}>Profil</Text>
  </View>
  : <ProfileIcon style={styles.iconContainer} />);

interface HomeProps {
  userVendorRole: string | null,
}

const HomeLayout = ({ userVendorRole } : HomeProps) => {
  const showTrainerTab = !!userVendorRole &&
    [VENDOR_ADMIN, TRAINING_ORGANISATION_MANAGER, TRAINER].includes(userVendorRole);
  const { companiToken }: AuthContextType = useContext(AuthContext);

  if (!companiToken) return <Redirect href="Authentication" />;

  return (
    <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: styles.tabBar }}
      initialRouteName="LearnerCourses">
      <Tabs.Screen name="Catalog" options={{ tabBarIcon: catalogIcon }} />
      <Tabs.Screen name="LearnerCourses" options={{ tabBarIcon: learnerCoursesIcon }} />
      <Tabs.Screen name='TrainerCourses'
        options={{ tabBarIcon: trainerCoursesIcon, href: !showTrainerTab ? null : '/Home/TrainerCourses' }} />
      <Tabs.Screen name="profile" options={{ tabBarIcon: profileIcon }} />
    </Tabs>
  );
};

const mapStateToProps = (state: StateType) => ({ userVendorRole: getUserVendorRole(state) });

export default connect(mapStateToProps)(HomeLayout);

const styles = StyleSheet.create({
  tabBar: {
    height: TAB_BAR_HEIGHT,
  },
  iconContainer: {
    alignItems: 'center',
    width: TAB_BAR_LABEL_WIDTH,
    marginVertical: MARGIN.SM,
  },
  iconText: {
    ...FIRA_SANS_BOLD.SM,
    color: PINK[500],
    textAlign: 'center',
  },
});
