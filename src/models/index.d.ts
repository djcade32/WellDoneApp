import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum InviteStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED"
}

export declare class Chores {
  readonly id: string;
  readonly name: string;
  readonly points: number;
  readonly icon: number;
  constructor(init: ModelInit<Chores>);
}

export declare class UserDoneChores {
  readonly householdId: string;
  readonly choreId: string;
  readonly timeCompleted: string;
  readonly dateCompleted: string;
  constructor(init: ModelInit<UserDoneChores>);
}

export declare class HouseholdInvite {
  readonly id: string;
  readonly senderId: string;
  readonly receiverId: string;
  readonly householdId: string;
  readonly status?: InviteStatus | keyof typeof InviteStatus | null;
  constructor(init: ModelInit<HouseholdInvite>);
}

type HouseholdMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Household {
  readonly id: string;
  readonly creatorId: string;
  readonly householdMembers?: string[] | null;
  readonly numberOfMembers: number;
  readonly availableChores?: (Chores | null)[] | null;
  readonly name: string;
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
  readonly choresDone?: (UserDoneChores | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}