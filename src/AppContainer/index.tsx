import React, { useEffect, useContext, useState, useRef } from 'react';
import { StatusBar, View, AppState } from 'react-native';
import { connect } from 'react-redux';
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
  const { tryLocalSignIn, alenviToken, appIsReady, signOut, refreshAlenviToken } = useContext(AuthContext);
  const [updateModaleVisible, setUpdateModaleVisible] = useState(false);
  const [maintenanceModaleVisible, setMaintenanceModalVisible] = useState<boolean>(false);
  const axiosLoggedRequestInterceptorId = useRef<number | null>(null);
  const axiosLoggedResponseInterceptorId = useRef<number | null>(null);
  const axiosNotLoggedResponseInterceptorId = useRef<number | null>(null);
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  useEffect(() => {
    registerForPushNotificationsAsync().then(async (data) => {
      if (!alenviToken) return;
      await handleExpoToken(data);
    });

    const isValidNotification = get(lastNotificationResponse, 'notification.request.content.data') &&
      get(lastNotificationResponse, 'actionIdentifier') === Notifications.DEFAULT_ACTION_IDENTIFIER;
    if (alenviToken && isValidNotification) handleNotificationResponse(lastNotificationResponse);
  }, [alenviToken, lastNotificationResponse]);

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

  const handleUnauthorizedRequest = async (error: AxiosError) => {
    const storedTokens = await asyncStorage.getAlenviToken();
    if (asyncStorage.isTokenValid(storedTokens.alenviToken, storedTokens.alenviTokenExpiryDate)) {
      await signOut();
      return Promise.reject(error);
    } // handle invalid refreshToken reception from api which trigger infinite 401 calls

    await asyncStorage.removeAlenviToken();
    await refreshAlenviToken();

    const { alenviToken: newAlenviToken, alenviTokenExpiryDate } = await asyncStorage.getAlenviToken();
    if (asyncStorage.isTokenValid(newAlenviToken, alenviTokenExpiryDate)) {
      const config = { ...error.config };
      if (config.headers) config.headers['x-access-token'] = newAlenviToken || '';

      return axiosLogged.request(config);
    }

    await signOut();
    return Promise.reject(error.response);
  };

  const initializeAxiosLogged = (token: string) => {
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
  };

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

    initializeAxiosLogged(alenviToken);
    if (alenviToken) setUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alenviToken]);

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

  const style = styles(statusBarVisible, StatusBar.currentHeight);

  if (maintenanceModaleVisible) return <MaintenanceModal />;
  if (updateModaleVisible) return <UpdateAppModal />;

  return (
    <>
      <View style={style.statusBar}>
        <StatusBar hidden={!statusBarVisible} translucent barStyle="dark-content" backgroundColor={WHITE} />
      </View>
      <AppNavigation />
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
