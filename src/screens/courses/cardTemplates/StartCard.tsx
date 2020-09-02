import React from 'react';
import Button from '../../../components/form/Button';
import { navigate } from '../../../navigationRef';

const StartCard = () => (<Button caption="Démarrer" onPress={() => navigate('template0')} />);

export default StartCard;
