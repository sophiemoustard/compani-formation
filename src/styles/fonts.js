// 12 - 16 - 20 - 14 - 18 - 24

import { Platform, PixelRatio } from 'react-native';
import { AppConfig } from 'Config';
import Metrics from './Metrics';
const type = {
  base: Platform.OS === 'ios' ? 'gtWalsheimRegular' : 'GtWalsheimRegular',
  bold: Platform.OS === 'ios' ? 'gtWalsheimBold' : 'GtWalsheimBold',
  emphasis: Platform.OS === 'ios' ? 'gtWalsheimThin' : 'GtWalsheimThin',
  icons: 'icomoon',
};
const pixelRatio = PixelRatio.get();
const size = Platform.select({
  ios: {
    h1: Metrics.screenWidth < AppConfig.iosMinLogicalWidth ? 35 : 38,
    h2: Metrics.screenWidth < AppConfig.iosMinLogicalWidth ? 31 : 34,
    h3: Metrics.screenWidth < AppConfig.iosMinLogicalWidth ? 27 : 30,
    h4: Metrics.screenWidth < AppConfig.iosMinLogicalWidth ? 23 : 26,
    h5: Metrics.screenWidth < AppConfig.iosMinLogicalWidth ? 17 : 20,
    // h6: Metrics.screenWidth < AppConfig.iosMinLogicalWidth ? 16 : 19,
    input: Metrics.screenWidth < AppConfig.iosMinLogicalWidth ? 15 : 18,
    // regular: Metrics.screenWidth < AppConfig.iosMinLogicalWidth ? 14 : 17,
    medium: Metrics.screenWidth < AppConfig.iosMinLogicalWidth ? 13 : 16,
    // smallPlus: Metrics.screenWidth < AppConfig.iosMinLogicalWidth ? 12 : 15,
    small: Metrics.screenWidth < AppConfig.iosMinLogicalWidth ? 11 : 12,
    // tiny: Metrics.screenWidth < AppConfig.iosMinLogicalWidth ? 5.5 : 8.5,
  },
  android: {
    h1: pixelRatio < AppConfig.androidXHDPIPixelDensity ? 35 : 38,
    h2: pixelRatio < AppConfig.androidXHDPIPixelDensity ? 31 : 34,
    h3: pixelRatio < AppConfig.androidXHDPIPixelDensity ? 27 : 30,
    h4: pixelRatio < AppConfig.androidXHDPIPixelDensity ? 23 : 26,
    h5: pixelRatio < AppConfig.androidXHDPIPixelDensity ? 17 : 20,
    // h6: pixelRatio < AppConfig.androidXHDPIPixelDensity ? 16 : 19,
    input: pixelRatio < AppConfig.androidXHDPIPixelDensity ? 15 : 18,
    // regular: pixelRatio < AppConfig.androidXHDPIPixelDensity ? 14 : 17,
    medium: pixelRatio < AppConfig.androidXHDPIPixelDensity ? 13 : 16,
    // smallPlus: pixelRatio < AppConfig.androidXHDPIPixelDensity ? 12 : 15,
    small: pixelRatio < AppConfig.androidXHDPIPixelDensity ? 11 : 12,
    // tiny: pixelRatio < AppConfig.androidXHDPIPixelDensity ? 5.5 : 8.5,
  },
});
const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1,
  },
  h2: {
    fontFamily: type.bold,
    fontSize: size.h2,
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3,
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4,
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5,
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6,
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular,
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium,
  },
};
export default {
  type,
  size,
  style,
};