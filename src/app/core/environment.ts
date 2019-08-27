export interface Environment {
  displayName: string;
  members: Array<EnvironmentMember>;
  users: Array<string>;
  id?: string;
  // privateData: EnvironmentPrivateData;
}

export interface EnvironmentPrivateData {
  roles?: object;
}

export interface EnvironmentMember {
  displayName: string;
  id?: string;
  icon?: string;
  img?: string;
}
