export interface NavigationType {
  navigate: (path: string, params?: object) => {},
  dispatch: (action: any) => {},
}
