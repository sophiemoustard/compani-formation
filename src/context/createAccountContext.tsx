import { createContext, useState } from 'react';
import { CreateAccountDataType } from '@/types/CreateAccountDataType';

export const Context = createContext({});

export const ContextProvider = ({ children }: { children: JSX.Element }) => {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formList, setFormList] = useState<CreateAccountDataType[][]>(
    [
      [{
        type: 'text',
        field: 'firstname',
        title: 'Quel est votre prénom ?',
        caption: 'Prénom',
        value: '',
        isValid: true,
        errorMessage: '',
        isValidationAttempted: false,
        required: false,
      }],
      [{
        type: 'text',
        field: 'lastname',
        title: 'Quel est votre nom ?',
        caption: 'Nom',
        value: '',
        isValid: false,
        errorMessage: 'Ce champ est obligatoire',
        isValidationAttempted: false,
        required: true,
      }],
      [{
        type: 'phone',
        field: 'phone',
        title: 'Quel est votre téléphone ?',
        caption: 'Téléphone',
        value: '',
        isValid: true,
        errorMessage: 'Votre numéro de téléphone n\'est pas valide',
        isValidationAttempted: false,
        required: false,
      }],
      [{
        type: 'password',
        field: 'password',
        title: 'Créer votre mot de passe',
        caption: 'Mot de passe',
        value: '',
        isValid: false,
        errorMessage: 'Le mot de passe doit comporter au minimum 6 caractères',
        isValidationAttempted: false,
        required: true,
      },
      {
        type: 'password',
        field: 'confirmedPassword',
        title: 'Créer votre mot de passe',
        caption: 'Confirmer mot de passe',
        value: '',
        isValid: false,
        errorMessage: 'Votre mot de passe et sa confirmation ne correspondent pas',
        isValidationAttempted: false,
        required: true,
        openUrl: {
          text: 'En continuant, vous acceptez nos ',
          link: 'conditions d\'utilisation et notre politique de confidentialité',
        },
      }],
    ]
  );
  return (
    <Context.Provider value={{ isLoading, setIsLoading, formList, setFormList, email, setEmail }}>
      {children}
    </Context.Provider>
  );
};
