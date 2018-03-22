import { Template } from 'meteor/templating';
import { Notes } from '../lib/collections.js';
import { Accounts } from 'meteor/accounts-base';

//Accounts config
Accounts.ui.config({
  passwordSignupFields:'USERNAME_ONLY'
});

import './main.html';

Template.body.helpers({
  notes(){
    return Notes.find({});
  }
});

Template.add.events({
  'submit .add-form': function(){
    event.preventDefault();

    //Get form text
    const target = event.target;
    const text = target.text.value;

    //Insert note into collections
    Notes.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });

    //Clear form
    target.text.value = '';

    //Close addModal
    $('.modal').modal('close');
  }
});

$(document).ready(function(){
    $('.modal').modal();
  });

Template.note.events({
  'click .delete-note':function(){
    Notes.remove(this._id);
  }
})
