import { BlendedCourseType, ELearningProgramType } from './CourseTypes';

export type RootStackParamList = {
  Authentication: undefined;
  EmailForm: { firstConnection: Boolean } | undefined;
  CreateAccount: { email: string };
  PasswordReset: { userId: string, email: string, token: string }
  ActivityCardContainer: { activityId: string, profileId: string };
  QuestionnaireCardContainer: { questionnaireId: string, profileId: string };
  BlendedAbout: { course: BlendedCourseType }
  ElearningAbout: { program: ELearningProgramType }
  ProfileEdition: undefined;
  PasswordEdition: { userId: string };
  ImagePickerManager: undefined;
  LearnerCourseProfile: {
    courseId: string,
    endedActivity?: string | null,
    endedQuestionnaire?: string | null,
  };
  TrainerCourseProfile: {
    courseId: string,
  };
  SubProgramProfile: { subProgramId: string };
  CourseProfileHeader: undefined,
}

export type RootBottomTabParamList = {
  Catalog: undefined;
  LearnerCourses: undefined;
  TrainerCourses: undefined;
  Profile: undefined;
}

export type RootCreateAccountParamList = {
  [key: `create-account-screen-${number}`]: undefined;
}

export type RootCardParamList = {
  [key: `card-${number}`]: undefined;
  'startCard': undefined;
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
    interface RootParamList extends RootBottomTabParamList {}
    interface RootParamList extends RootCreateAccountParamList {}
    interface RootParamList extends RootCardParamList {}
  }
}
