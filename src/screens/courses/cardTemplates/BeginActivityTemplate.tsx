import React from 'react';
import Button from '../../../components/form/Button';
import { navigate } from '../../../navigationRef';

const BeginActivityTemplate = () => (<Button caption="Démarrer" onPress={() => navigate('template0')} />);

export default BeginActivityTemplate;
