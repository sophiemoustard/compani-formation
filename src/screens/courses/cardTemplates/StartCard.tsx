import React from 'react';
import Button from '../../../components/form/Button';
import { navigate } from '../../../navigationRef';

const StartCard = () => (<Button caption="Démarrer" onPress={() => navigate('card-0')} />);

export default StartCard;
