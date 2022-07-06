// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const InviteStatus = {
  "PENDING": "PENDING",
  "ACCEPTED": "ACCEPTED",
  "DECLINED": "DECLINED"
};

const { Household, User, HouseholdUser, Chores, HouseholdInvite, UserDoneChores } = initSchema(schema);

export {
  Household,
  User,
  HouseholdUser,
  InviteStatus,
  Chores,
  HouseholdInvite,
  UserDoneChores
};