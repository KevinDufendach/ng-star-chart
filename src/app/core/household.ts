export interface Household {
  displayName: string;
  members: Array<HouseholdMember>;
  // privateData: HouseholdPrivateData;
}

export interface HouseholdPrivateData {
  roles?: object;
}

export interface HouseholdMember {
  displayName: string;
  icon?: string;
  img?: string;
}
