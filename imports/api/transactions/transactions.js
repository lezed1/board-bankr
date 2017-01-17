// Definition of the transactions collection

import { Mongo } from 'meteor/mongo';

export const Transactions = new Mongo.Collection('transactions');
