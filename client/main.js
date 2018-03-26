import { Template } from 'meteor/templating';
import { Notes } from '../lib/collections.js';
import { Personnel } from '../lib/collections.js';
import { Accounts } from 'meteor/accounts-base';
import dragula from 'dragula';


//Accounts config
Accounts.ui.config({
  passwordSignupFields:'USERNAME_ONLY'
});

import './main.html';

/*
Template.body.helpers({
  notes(){
    return Notes.find({});
  }
});
*/


Template.body.helpers({
  personnel(){
    return Personnel.find({})
  }
});

/*
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
*/


Template.add.events({
  'submit .add-form': function(){
    event.preventDefault();

    const target = event.target;
    const agency = target.agency.value;
    const name = target.name.value;
    const incident_role = target.incidentRole.value;
    const mobile_no = target.mobileNo.value;
    const callsign = target.callsign.value;
    const request_no = target.requestNo.value;
    const checkIn = target.checkIn.value;
    const departure_point = target.departurePoint.value;
    const travel_method = target.travelMethod.value;
    const date_time = target.dateTime.value;
    const date_time1 = target.dateTime1.value;
    const arrival_location = target.arrivalLocation.value;
    const eta = target.eta.value;
    const unknown = target.unknown.value;
    const incident_location = target.incidentLocation.value;
    const time = target.time.value;
    const status = target.status.value;
    const notes = target.notes.value;

    Personnel.insert({
      agency,
      name,
      incidentRole,
      mobileNo,
      callsign,
      requestNo,
      checkIn,
      departurePoint,
      travelMethod,
      dateTime,
      dateTime1,
      arrivalLocation,
      eta,
      unknown,
      incidentLocation,
      time,
      status,
      notes,
      createdAt: new Date()
    });

    //UI.insert(UI.render(Template.card), $('#b1').get(0));
    $("#personnel-form").trigger('reset');
    $('.modal').modal('close');
  }
});


$(document).ready(function(){
    $('.modal').modal();

    dragula([document.querySelector('#b1'), document.querySelector('#b2'),
    document.querySelector('#b3'), document.querySelector('#b4')]);
  });

/*
Template.card.events({
  'click .delete-note': function(){
    Notes.remove(this._id);
  }
});
*/


Template.card.events({
  'click .delete-card': function(){
    Personnel.remove(this._id);
  }
});
