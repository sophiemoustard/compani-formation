import { NavigatorScreenParams } from '@react-navigation/native';
import { CourseType, ProgramType } from './CourseTypes';

export type RootStackParamList = {
  Home: NavigatorScreenParams<RootBottomTabParamList>;
  Authentication: undefined;
  EmailForm: { firstConnection: Boolean } | undefined;
  CreateAccount: { email: string };
  PasswordReset: { userId: string, email: string, token: string }
  ActivityCardContainer: { activityId: string, profileId: string };
  QuestionnaireCardContainer: { questionnaireId: string, profileId: string };
  BlendedAbout: { course: CourseType }
  ElearningAbout: { program: ProgramType }
  ProfileEdition: undefined;
  PasswordEdition: { userId: string };
  Camera: undefined;
  ImagePickerManager: undefined;
  CourseProfile: {
    courseId: string,
    endedActivity?: string | null,
    endedQuestionnaire?: string | null,
  };
  SubProgramProfile: { subProgramId: string };
}

export type RootBottomTabParamList = {
  Catalog: undefined;
  Courses: { screen: string } | undefined;
  Profile: { screen: string } | undefined;
}

export type RootCreateAccountParamList = {
  [key: `create-account-screen-${number}`]: undefined;
}

export type RootCardParamList = {
  [key: `card-${number}`]: undefined;
  'startCard': undefined;
}

export interface NavigationType {
  navigate: (
    path: keyof RootBottomTabParamList | keyof RootStackParamList | keyof RootCreateAccountParamList
    | keyof RootCardParamList,
    params?: any
  ) => {},
  dispatch: (action: any) => {},
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
    interface RootParamList extends RootBottomTabParamList {}
    interface RootParamList extends RootCreateAccountParamList {}
    interface RootParamList extends RootCardParamList {}
  }
}
