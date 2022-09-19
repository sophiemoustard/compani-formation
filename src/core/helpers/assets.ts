import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

const fetchFonts = () => Font.loadAsync({
  'fira-sans-black': require('../../../assets/fonts/FiraSans-Black.ttf'),
  'fira-sans-bold': require('../../../assets/fonts/FiraSans-Bold.ttf'),
  'fira-sans-bold-italic': require('../../../assets/fonts/FiraSans-SemiBoldItalic.ttf'),
  'fira-sans-italic': require('../../../assets/fonts/FiraSans-Italic.ttf'),
  'fira-sans-medium': require('../../../assets/fonts/FiraSans-Medium.ttf'),
  'fira-sans-regular': require('../../../assets/fonts/FiraSans-Regular.ttf'),
  'nunito-semi': require('../../../assets/fonts/Nunito-SemiBold.ttf'),
  'nunito-regular': require('../../../assets/fonts/Nunito-Regular.ttf'),
  'nunito-regular-bold-italic': require('../../../assets/fonts/Nunito-BoldItalic.ttf'),
  'nunito-light': require('../../../assets/fonts/Nunito-Light.ttf'),
  'nunito-black': require('../../../assets/fonts/Nunito-Black.ttf'),
});

const fetchAssets = async () => {
  const cachedImages = [
    require('../../../assets/images/authentication_background_image.jpg'),
    require('../../../assets/images/aux_detective.png'),
    require('../../../assets/images/aux_joie.png'),
    require('../../../assets/images/aux_fierte.png'),
    require('../../../assets/images/default_avatar.png'),
    require('../../../assets/images/doct_liste.png'),
    require('../../../assets/images/end_card_background.png'),
    require('../../../assets/images/green_section_background.png'),
    require('../../../assets/images/home_footer_ellipse.png'),
    require('../../../assets/images/pa_aidant_balade_bleu.png'),
    require('../../../assets/images/pa_aidant_balade_rose.png'),
    require('../../../assets/images/pink_section_background.png'),
    require('../../../assets/images/profile_background.png'),
    require('../../../assets/images/purple_section_background.png'),
    require('../../../assets/images/start_card_background.png'),
    require('../../../assets/images/yellow_section_background.png'),
  ];
  const imageAssets = cachedImages.map(img => Asset.fromModule(img).downloadAsync());

  await Promise.all([...imageAssets]);
};

export const initializeAssets = async () => {
  try {
    await Promise.all([fetchFonts(), fetchAssets()]);
  } catch (error) {
    console.error(error);
  }
};
