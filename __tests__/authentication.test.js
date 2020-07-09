import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, fireEvent, waitFor, act } from 'react-native-testing-library';
import { Provider as AuthProvider } from '../src/context/AuthContext';
import getEnvVars from '../environment';
import { AppContainer } from '../src/stack';

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
    const passwordInput = await waitFor(() => element.getByTestId('Mot de passe'));
    const sendButton = await waitFor(() => element.getByTestId('Connexion'));

    fireEvent.changeText(emailInput, 'chloe@alenvi.io');
    fireEvent.changeText(passwordInput, '123456');

    fireEvent.press(sendButton);

    const header = await waitFor(() => element.getByTestId('header'));

    expect(header).toBeTruthy();
  });
});

