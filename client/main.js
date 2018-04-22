import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { OnCall } from '../lib/collections.js';
import { Deployed } from '../lib/collections.js';
import { Pending } from '../lib/collections.js';
import { Operational } from '../lib/collections.js';
import { Accounts } from 'meteor/accounts-base';
import dragula from 'dragula';
import './main.html';

Session.set('isTeam', true);
var formData = 1;

//Accounts config
Accounts.ui.config({
  passwordSignupFields:'USERNAME_ONLY'
});

//Body helpers
Template.body.helpers({
  onCall(){
    return OnCall.find({})
  },
  deployed(){
    return Deployed.find({})
  },
  pending(){
    return Pending.find({})
  },
  operational(){
    return Operational.find({})
  }
});

//Add helpers
Template.add.helpers({
  isPersonnel: function(){
    return Session.get('isPersonnel');
  },
  isTeam: function(){
    return Session.get('isTeam');
  },
  isBoat: function(){
    return Session.get('isBoat');
  }
});

//Enables select on form
Template.team.onRendered(function(){
  this.$('select').material_select();
});

Template.personnel.onRendered(function(){
  this.$('select').material_select();
});

Template.boat.onRendered(function(){
  this.$('select').material_select();
});

//Add event
Template.add.events({
  'change select': function(el, e) {
    event.preventDefault();
    var e = document.getElementById("cardType");
    formData = e.options[e.selectedIndex].value;

    if(formData == 1) {
      Session.set('isTeam', true);
      Session.set('isPersonnel', false);
      Session.set('isBoat', false);
    }
    else if(formData == 2) {
      Session.set('isTeam', false);
      Session.set('isPersonnel', true);
      Session.set('isBoat', false);
    }
    else if(formData == 3) {
      Session.set('isTeam', false);
      Session.set('isPersonnel', false);
      Session.set('isBoat', true);
    }
  }
});

Template.add.events({
  'submit .add-form': function(el, e){
    event.preventDefault();

    //FormData is the card choice e.g. 1 = team card
    if(formData == 1) {
    }
    else if(formData == 2){
    const target = event.target;
    const cardType = 'personnel';
    const agency = target.agencyP.value;
    const name = target.nameP.value;
    const incident_role = target.incidentRoleP.value;
    const mobile_no = target.mobileNoP.value;
    const callsign = target.callsignP.value;
    const request_no = target.requestNoP.value;
    const checkIn = target.checkInP.value;
    const departure_point = target.departurePointP.value;
    const travel_method = target.travelMethodP.value;
    const date_time = target.dateTimeP.value;
    const date_time1 = target.dateTime1P.value;
    const arrival_location = target.arrivalLocationP.value;
    const eta = target.etaP.value;
    const unknown = target.unknownP.value;
    const incident_location = target.incidentLocationP.value;
    const time = target.timeP.value;
    const status = target.statusP.value;
    const notes = target.notesP.value;

    OnCall.insert({
      cardType,
      agency,
      name,
      incident_role,
      mobile_no,
      callsign,
      request_no,
      checkIn,
      departure_point,
      travel_method,
      date_time,
      date_time1,
      arrival_location,
      eta,
      unknown,
      incident_location,
      time,
      status,
      notes,
      createdAt: new Date()
      });
    }

    $("#personnel-form").trigger('reset');
    $('.modal').modal('close');
  }
});


Template.body.onRendered(function(el, e) {
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
      Pending.find({ _id: el.id}).forEach(
        function(doc){
          OnCall.insert(doc);
          Pending.remove(el.id);
        }
      )
      Operational.find({ _id: el.id}).forEach(
        function(doc){
          OnCall.insert(doc);
          Operational.remove(el.id);
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
      Pending.find({ _id: el.id}).forEach(
        function(doc){
          Deployed.insert(doc);
          Pending.remove(el.id);
        }
      )
      Operational.find({ _id: el.id}).forEach(
        function(doc){
          Deployed.insert(doc);
          Operational.remove(el.id);
        }
      )
    }
    else if(board === 'b3') {
      OnCall.find({ _id: el.id}).forEach(
        function(doc){
          Pending.insert(doc);
          OnCall.remove(el.id);
        }
      )
      Deployed.find({ _id: el.id}).forEach(
        function(doc){
          Pending.insert(doc);
          Deployed.remove(el.id);
        }
      )
      Operational.find({ _id: el.id}).forEach(
        function(doc){
          Pending.insert(doc);
          Operational.remove(el.id);
        }
      )
    }
    else if(board === 'b4') {
      OnCall.find({ _id: el.id}).forEach(
        function(doc){
          Operational.insert(doc);
          OnCall.remove(el.id);
        }
      )
      Deployed.find({ _id: el.id}).forEach(
        function(doc){
          Operational.insert(doc);
          Deployed.remove(el.id);
        }
      )
      Pending.find({ _id: el.id}).forEach(
        function(doc){
          Operational.insert(doc);
          Pending.remove(el.id);
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
  	  if(confirm("Do you want to delete this card?")){
      OnCall.remove(this._id);
      Deployed.remove(this._id);
      Pending.remove(this._id);
      Operational.remove(this._id);
  	  }
    }
  });

Template.card.helpers({
  id(){
    return this._id;
  }
});
