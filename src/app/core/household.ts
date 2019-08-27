export interface Household {
  displayName: string;
  members: Array<HouseholdMember>;
  users: Array<string>;
  id?: string;
  // privateData: HouseholdPrivateData;
}

export interface HouseholdPrivateData {
  roles?: object;
}

export interface HouseholdMember {
  displayName: string;
  id?: string;
  icon?: string;
  img?: string;
}
