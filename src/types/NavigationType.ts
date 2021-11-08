import { CourseType, ProgramType } from './CourseTypes';
import { ActivityWithCardsType } from './ActivityTypes';
import { QuestionnaireType } from './QuestionnaireType';

export type RootStackParamList = {
  Home: undefined;
  Authentication: undefined;
  EmailForm: { firstConnection?: Boolean };
  CreateAccount: { email: string };
  PasswordReset: { userId: string, email: string, token: string }
  ActivityCardContainer: { activityId: string, profileId: string };
  QuestionnaireCardContainer: { questionnaireId: number, profileId: number };
  BlendedAbout: { course: CourseType }
  ElearningAbout: { program: ProgramType }
  ProfileEdition: undefined;
  PasswordEdition: { userId: string };
  Camera: undefined;
  ImagePickerManager: undefined;
  CourseProfile: {
    courseId: string,
    endedActivity?: ActivityWithCardsType | null,
    endedQuestionnaire?: QuestionnaireType | null,
  };
  SubProgramProfile: { subProgramId: string };
}

export type RootBottomTabParamList = {
  Catalog: undefined;
  Courses: undefined;
  Profile: undefined;
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
