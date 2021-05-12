import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from './moment';

const isTokenValid = (token: string | null, expiryDate: string | null): boolean =>
  !!token && moment().isBefore(expiryDate);

interface AlenviToken {
  alenviToken: string | null,
  alenviTokenExpiryDate: string | null,
}

const getAlenviToken = async (): Promise<AlenviToken> => ({
  alenviToken: await AsyncStorage.getItem('alenvi_token'),
  alenviTokenExpiryDate: await AsyncStorage.getItem('alenvi_token_expiry_date'),
});

const setAlenviToken = async (token: string, tokenExpireDate: string): Promise<void> => {
  await AsyncStorage.setItem('alenvi_token', token);
  await AsyncStorage.setItem('alenvi_token_expiry_date', tokenExpireDate);
};

const removeAlenviToken = async (): Promise<void> => {
  await AsyncStorage.removeItem('alenvi_token');
  await AsyncStorage.removeItem('alenvi_token_expiry_date');
};

interface RefreshToken {
  refreshToken: string | null,
  refreshTokenExpiryDate: string | null,
}

const getRefreshToken = async (): Promise<RefreshToken> => ({
  refreshToken: await AsyncStorage.getItem('refresh_token'),
  refreshTokenExpiryDate: await AsyncStorage.getItem('refresh_token_expiry_date'),
});

const setRefreshToken = async (refreshToken: string): Promise<void> => {
  await AsyncStorage.setItem('refresh_token', refreshToken);
  await AsyncStorage.setItem('refresh_token_expiry_date', moment().endOf('d').add(1, 'year').toISOString());
};

const removeRefreshToken = async (): Promise<void> => {
  await AsyncStorage.removeItem('refresh_token');
  await AsyncStorage.removeItem('refresh_token_expiry_date');
};

const getUserId = async (): Promise<string | null> => AsyncStorage.getItem('user_id');

const setUserId = async (id: string): Promise<void> => AsyncStorage.setItem('user_id', id);

const removeUserId = async (): Promise<void> => AsyncStorage.removeItem('user_id');

const getExpoToken = async (): Promise<string | null> => AsyncStorage.getItem('expo_token');

const setExpoToken = async (expoToken: string): Promise<void> => AsyncStorage.setItem('expo_token', expoToken);

const removeExpoToken = async (): Promise<void> => AsyncStorage.removeItem('expo_token');

export default {
  isTokenValid,
  getAlenviToken,
  setAlenviToken,
  removeAlenviToken,
  getRefreshToken,
  setRefreshToken,
  removeRefreshToken,
  getUserId,
  setUserId,
  removeUserId,
  getExpoToken,
  setExpoToken,
  removeExpoToken,
};
