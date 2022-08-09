import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum InviteStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED"
}

export declare class HouseholdMember {
  readonly id: string;
  readonly points: number;
  constructor(init: ModelInit<HouseholdMember>);
}

export declare class Chores {
  readonly id: string;
  readonly name: string;
  readonly points: number;
  readonly icon: number;
  constructor(init: ModelInit<Chores>);
}

export declare class HouseholdInvite {
  readonly id: string;
  readonly householdId: string;
  readonly status: InviteStatus | keyof typeof InviteStatus;
  readonly name: string;
  constructor(init: ModelInit<HouseholdInvite>);
}

export declare class UserDoneChores {
  readonly userId: string;
  readonly choreId: string;
  readonly timeCompleted: string;
  readonly dateCompleted: string;
  constructor(init: ModelInit<UserDoneChores>);
}

type HouseholdMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type HouseholdUserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Household {
  readonly id: string;
  readonly creatorId: string;
  readonly householdMembers?: HouseholdMember[] | null;
  readonly availableChores?: (Chores | null)[] | null;
  readonly name: string;
  readonly adminIds?: string[] | null;
  readonly Users?: (HouseholdUser | null)[] | null;
  readonly doneChores?: (UserDoneChores | null)[] | null;
  readonly sentInvites?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Household, HouseholdMetaData>);
  static copyOf(source: Household, mutator: (draft: MutableModel<Household, HouseholdMetaData>) => MutableModel<Household, HouseholdMetaData> | void): Household;
}

export declare class User {
  readonly id: string;
  readonly firstName: string;
  readonly lastName?: string | null;
  readonly gender?: string | null;
  readonly householdInvites?: (HouseholdInvite | null)[] | null;
  readonly householdIds?: (string | null)[] | null;
  readonly households?: (HouseholdUser | null)[] | null;
  readonly sub: string;
  readonly imageId?: string | null;
  readonly activeHouseholdId?: string | null;
  readonly imageUrl?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class HouseholdUser {
  readonly id: string;
  readonly household: Household;
  readonly user: User;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<HouseholdUser, HouseholdUserMetaData>);
  static copyOf(source: HouseholdUser, mutator: (draft: MutableModel<HouseholdUser, HouseholdUserMetaData>) => MutableModel<HouseholdUser, HouseholdUserMetaData> | void): HouseholdUser;
}