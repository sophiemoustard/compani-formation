import { Dimensions, PixelRatio } from 'react-native';
const { width, height } = Dimensions.get('window');

export const MAIN_MARGIN_LEFT = 15;
export const MARGIN = {
  XS: 5,
  SM: 10,
  MD: 15,
  LG: 20,
  XL: 30,
  XXL: 50,
  XXXL: 100,
};

export const PADDING = {
  XS: 2,
  SM: 5,
  MD: 10,
  LG: '',
  XL: 20,
  XXL: 40,
};

export const BORDER_WIDTH = 1;
export const BORDER_RADIUS = {
  XS: 5,
  SM: 10,
  MD: 15,
  LG: '',
  XL: 25,
};

export const ICON = {
  XS: '',
  SM: '',
  MD: '',
  LG: '',
  XL: '',
};

export const IOS_WIDTH_THRESHOLD = 375;
export const ANDROID_PIXEL_DENSITY_THRESHOLD = 2;
export const SCREEN_WIDTH = width < height ? width : height;
export const SCREEN_HEIGHT = width < height ? height : width;
const PIXEL_RATIO = PixelRatio.get();
export const IS_SMALL_SCREEN = Platform.select({
  ios: SCREEN_WIDTH < IOS_WIDTH_THRESHOLD,
  android: PIXEL_RATIO < ANDROID_PIXEL_DENSITY_THRESHOLD,
});

export const INPUT_HEIGHT = 40;
export const COURSE_CELL_WIDTH = IS_SMALL_SCREEN ? 200 : 250;
