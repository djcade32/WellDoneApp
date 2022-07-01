// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const InviteStatus = {
  "PENDING": "PENDING",
  "ACCEPTED": "ACCEPTED",
  "DECLINED": "DECLINED"
};

const { Household, User, Chores, UserDoneChores, HouseholdInvite } = initSchema(schema);

export {
  Household,
  User,
  InviteStatus,
  Chores,
  UserDoneChores,
  HouseholdInvite
};