export interface Roles {
  subscriber?: boolean;
  editor?: boolean;
  admin?: boolean;
}

export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  roles?: Roles;
  defaultEnvironment?: string;
}
