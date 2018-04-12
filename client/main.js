import { Template } from 'meteor/templating';
import { Notes } from '../lib/collections.js';
import { Personnel } from '../lib/collections.js';
import { OnCall } from '../lib/collections.js';
import { Deployed } from '../lib/collections.js';
import { Accounts } from 'meteor/accounts-base';
import dragula from 'dragula';

var lastBoard = null;


//Accounts config
Accounts.ui.config({
  passwordSignupFields:'USERNAME_ONLY'
});

import './main.html';

Template.body.helpers({
  onCall(){
    return OnCall.find({})
  }
});

Template.body.helpers({
  deployed(){
    return Deployed.find({})
  }
});

Template.add.events({
  'submit .add-form': function(el, e){
    event.preventDefault();

    const target = event.target;
    const cardType = 'personnel';
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

    OnCall.insert({
      cardType,
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

    $("#personnel-form").trigger('reset');
    $('.modal').modal('close');
  }
});


Template.body.onRendered(function() {
  var drake = dragula([document.querySelector('#b1'), document.querySelector('#b2'),
  document.querySelector('#b3'), document.querySelector('#b4')]);

  drake.on('drop', function(el, e, target) {
    var board = e.id;

    if(board === 'b1') {
      Deployed.find({ _id: el.id}).forEach(
        function(doc){
          OnCall.insert(doc);
          Deployed.remove(el.id);
        }
      )
    }
    else if(board === 'b2') {
      OnCall.find({ _id: el.id}).forEach(
        function(doc){
          Deployed.insert(doc);
          OnCall.remove(el.id);
        }
      )
    }
  });
});

$(document).ready(function(){
    $('.modal').modal();
    $('select').material_select();
  });

Template.card.events({
  'click .delete-card': function(){
    OnCall.remove(this._id);
    Deployed.remove(this._id);
  }
});

Template.card.helpers({
  id(){
    return this._id;
  }
});
