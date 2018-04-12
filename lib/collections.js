import { Mongo } from 'meteor/mongo';

export const Notes = new Mongo.Collection('notes');
export const Personnel = new Mongo.Collection('personnel');
export const OnCall = new Mongo.Collection('onCall');
export const Deployed = new Mongo.Collection('deployed');
