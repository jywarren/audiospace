// working from https://www.rtcmulticonnection.org/docs/getting-started/
/*
TODO:
* toggle area button using entryArea property
* begin managing UI logic like buttons, using events like onEnterRoom

*/

var connection = new RTCMultiConnection();
var roomId = 'as220-Doorstep';

// Config

// this line is VERY_important
connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

// if you want audio+video conferencing
connection.session = {
  audio: true,
  video: false
};

connection.mediaConstraints = {
  audio: true,
  video: false
};

connection.sdpConstraints.mandatory = {
  OfferToReceiveAudio: true,
  OfferToReceiveVideo: false
};

// https://www.rtcmulticonnection.org/docs/iceServers/
// use your own TURN-server here!
connection.iceServers = [{
  'urls': [
    'stun:stun.l.google.com:19302',
    'stun:stun1.l.google.com:19302',
    'stun:stun2.l.google.com:19302',
    'stun:stun.l.google.com:19302?transport=udp',
  ]
}];

// Initialize

connection.openOrJoin(roomId);

// Utilities

// dingdong event connection.onNewParticipant

let rooms = {
  Doorstep: {
    entryArea: 'Left'
  },
  Printshop: {
    entryArea: 'Left'
  } 
}

function switchToRoom(newRoomId) {
  leaveRoom();
  connection.openOrJoin(newRoomId);
  if (rooms[newRoomId] && rooms[newRoomId].entryArea) {
    goToArea(rooms[newRoomId].entryArea);
  } else {
    goToArea(false); // remove "area"
  }
}

// disconnects from all current peers
function leaveRoom() {
  connection.getAllParticipants().forEach(function(participantId) {
    connection.disconnectWith( participantId );
  });
}

// set volume of one peer
function setVolume(peer, volume) {
  let streamid = peer.streams[0].streamid;
  $('#' + streamid)[0].volume = volume;
}

// return all peers to volume 1 (100%)
function loudenAllPeers() {
  connection.peers.getAllParticipants().forEach(function(peer) {
    setVolume(peer, 1);
  });
}

// set peers who don't share areaId to volume 50%
function quietDistantPeers(areaId) {
  let peers = getDistantPeers(areaId);
  peers.forEach(function(peer) {
    setVolume(peer, 0.5);
  });
}

// collect peers with same areaId
function getNearbyPeers(areaId) {
  let near = [];
  connection.peers.forEach(function(peer) {
    if (peer.extra.hasOwnProperty('area') && peer.extra.area == areaId) near.push(peer);
  });
  return near;
}

function getDistantPeers(areaId) {
  let far = [];
  connection.peers.forEach(function(peer) {
    if (peer.extra.area != areaId) far.push(peer);
  });
  return far;
}

// set areaId; set to false for no area
function goToArea(areaId) {
  connection.extra.area = areaId;
  connection.updateExtraData();
}

