import { useEffect, useContext, useState, useRef, useCallback } from 'react';
import { StatusBar, View, AppState } from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import get from 'lodash/get';
import { AxiosRequestConfig, AxiosError } from 'axios';
import AppNavigation from '../navigation/AppNavigation';
import { Context as AuthContext } from '../context/AuthContext';
import MainActions from '../store/main/actions';
import { ActionType, ActionWithoutPayloadType, StateType } from '../types/store/StoreType';
import axiosLogged from '../api/axios/logged';
import axiosNotLogged from '../api/axios/notLogged';
import Users from '../api/users';
import Version from '../api/version';
import asyncStorage from '../core/helpers/asyncStorage';
import {
  registerForPushNotificationsAsync,
  handleNotificationResponse,
  handleExpoToken,
} from '../core/helpers/notifications';
import { ACTIVE_STATE } from '../core/data/constants';
import UpdateAppModal from '../components/UpdateAppModal';
import MaintenanceModal from '../components/MaintenanceModal';
import { UserType } from '../types/UserType';
import { WHITE } from '../styles/colors';
import styles from './styles';

type AppContainerProps = {
  setLoggedUser: (user: UserType) => void,
  statusBarVisible: boolean,
}

const getAxiosLoggedConfig = (config: AxiosRequestConfig, token: string) => {
  const axiosLoggedConfig = { ...config };
  if (axiosLoggedConfig.headers) axiosLoggedConfig.headers.common['x-access-token'] = token;

  return axiosLoggedConfig;
};

const AppContainer = ({ setLoggedUser, statusBarVisible }: AppContainerProps) => {
  const { tryLocalSignIn, companiToken, appIsReady, signOut, refreshCompaniToken } = useContext(AuthContext);
  const [updateModaleVisible, setUpdateModaleVisible] = useState(false);
  const [maintenanceModalVisible, setMaintenanceModalVisible] = useState<boolean>(false);
  const axiosLoggedRequestInterceptorId = useRef<number | null>(null);
  const axiosLoggedResponseInterceptorId = useRef<number | null>(null);
  const axiosNotLoggedResponseInterceptorId = useRef<number | null>(null);
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  useEffect(() => {
    registerForPushNotificationsAsync().then(async (data) => {
      if (!companiToken) return;
      await handleExpoToken(data);
    });

    const isValidNotification = get(lastNotificationResponse, 'notification.request.content.data') &&
      get(lastNotificationResponse, 'actionIdentifier') === Notifications.DEFAULT_ACTION_IDENTIFIER;
    if (companiToken && isValidNotification) handleNotificationResponse(lastNotificationResponse);
  }, [companiToken, lastNotificationResponse]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { tryLocalSignIn(); }, []);

  const initializeAxiosNotLogged = () => {
    if (axiosNotLoggedResponseInterceptorId.current !== null) {
      axiosNotLogged.interceptors.response.eject(axiosNotLoggedResponseInterceptorId.current);
    }

    axiosNotLoggedResponseInterceptorId.current = axiosNotLogged.interceptors.response.use(
      (response) => {
        setMaintenanceModalVisible(false);
        return response;
      },
      async (error: AxiosError) => {
        if (error?.response?.status === 502 || error?.response?.status === 503) setMaintenanceModalVisible(true);
        return Promise.reject(error);
      }
    );
  };

  const handleUnauthorizedRequest = useCallback(async (error: AxiosError) => {
    const storedTokens = await asyncStorage.getCompaniToken();
    if (asyncStorage.isTokenValid(storedTokens.companiToken, storedTokens.companiTokenExpiryDate)) {
      await signOut();
      return Promise.reject(error);
    } // handle invalid refreshToken reception from api which trigger infinite 401 calls

    await asyncStorage.removeCompaniToken();
    const { refreshToken } = await asyncStorage.getRefreshToken();
    await refreshCompaniToken(refreshToken);

    const { companiToken: newCompaniToken, companiTokenExpiryDate } = await asyncStorage.getCompaniToken();
    if (asyncStorage.isTokenValid(newCompaniToken, companiTokenExpiryDate)) {
      const config = { ...error.config };
      if (config.headers) config.headers['x-access-token'] = newCompaniToken || '';

      return axiosLogged.request(config);
    }

    await signOut();
    return Promise.reject(error.response);
  }, [signOut, refreshCompaniToken]);

  const initializeAxiosLogged = useCallback((token: string) => {
    if (axiosLoggedRequestInterceptorId.current !== null) {
      axiosLogged.interceptors.request.eject(axiosLoggedRequestInterceptorId.current);
    }

    axiosLoggedRequestInterceptorId.current = axiosLogged.interceptors
      .request
      .use(
        async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => getAxiosLoggedConfig(config, token),
        err => Promise.reject(err)
      );

    if (axiosLoggedResponseInterceptorId.current !== null) {
      axiosLogged.interceptors.response.eject(axiosLoggedResponseInterceptorId.current);
    }

    axiosLoggedResponseInterceptorId.current = axiosLogged.interceptors
      .response
      .use(
        response => response,
        async (error: AxiosError) => {
          if (error?.response?.status === 401) return handleUnauthorizedRequest(error);
          if (error?.response?.status === 502 || error?.response?.status === 503) setMaintenanceModalVisible(true);
          return Promise.reject(error);
        }
      );
  }, [handleUnauthorizedRequest]);

  useEffect(() => {
    async function setUser() {
      try {
        const userId = await asyncStorage.getUserId();

        if (!userId) signOut();
        else {
          const user = await Users.getById(userId);
          setLoggedUser(user);
        }
      } catch (e: any) {
        console.error(e);
      }
    }

    initializeAxiosLogged(companiToken);
    if (companiToken) setUser();
  }, [companiToken, initializeAxiosLogged, setLoggedUser, signOut]);

  const shouldUpdate = async (nextState) => {
    try {
      if (nextState === ACTIVE_STATE) {
        const { mustUpdate } = await Version.shouldUpdate();
        setUpdateModaleVisible(mustUpdate);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    initializeAxiosNotLogged();
    shouldUpdate(ACTIVE_STATE);
    AppState.addEventListener('change', shouldUpdate);

    return () => { AppState.removeEventListener('change', shouldUpdate); };
  }, []);

  if (!appIsReady) return null;

  const style = styles(statusBarVisible);

  if (maintenanceModalVisible) return <MaintenanceModal />;
  if (updateModaleVisible) return <UpdateAppModal />;

  return (
    <>
      <View style={style.statusBar}>
        <StatusBar hidden={!statusBarVisible} translucent barStyle="dark-content" backgroundColor={WHITE} />
      </View>
      <SafeAreaProvider>
        <AppNavigation />
      </SafeAreaProvider>
    </>
  );
};

const mapStateToProps = (state: StateType) => ({
  statusBarVisible: state.main.statusBarVisible,
});

const mapDispatchToProps = (dispatch: ({ type }: ActionType | ActionWithoutPayloadType) => void) => ({
  setLoggedUser: (user: UserType) => dispatch(MainActions.setLoggedUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
