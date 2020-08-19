export interface RouteType {
  params: {
    courseId: string,
  }
}

export interface NavigationType {
  navigate: (path: string, option?: { screen: string, params: object }) => {},
}
