export interface RouteType {
  params: {
    courseId?: string,
    activityId?: string,
  }
}

export interface NavigationType {
  navigate: (path?: string, activityId?: any, option?: { screen?: string, params?: object}) => {},
}
