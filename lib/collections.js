import { Mongo } from 'meteor/mongo';

export const OnCall = new Mongo.Collection('onCall');
export const Deployed = new Mongo.Collection('deployed');
export const Pending = new Mongo.Collection('pending');
export const Operational = new Mongo.Collection('operational');
export const Members = new Mongo.Collection('members');
