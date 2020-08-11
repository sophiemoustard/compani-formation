import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, fireEvent, waitFor } from 'react-native-testing-library';
import { Provider as AuthProvider } from '../src/context/AuthContext';
import getEnvVars from '../environment';
import { AppContainer } from '../src/AppContainer';

describe('Authentication tests', () => {
  let axiosMock;
  beforeEach(() => {
    axiosMock = new MockAdapter(axios);
  });

  afterEach(() => {
    axiosMock.reset();
  });

  test('user should authenticate and be redirected to Home page', async () => {
    const { baseURL } = getEnvVars();
    axiosMock.onPost(`${baseURL}/users/authenticate`).reply(200, { data: { data: { token: 'token' } } });
    const element = render(
      <AuthProvider>
        <AppContainer/>
      </AuthProvider>
    );

    const emailInput = await waitFor(() => element.getByTestId('Email'));
    fireEvent.changeText(emailInput, 'test@alenvi.io');

    const passwordInput = await waitFor(() => element.getByTestId('Mot de passe'));
    fireEvent.changeText(passwordInput, '123456');

    const sendButton = await waitFor(() => element.getByTestId('Connexion'));
    fireEvent.press(sendButton);

    const header = await waitFor(() => element.getByTestId('header'));

    expect(header).toBeTruthy();
  });
});
