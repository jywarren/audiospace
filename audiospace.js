// working from https://www.rtcmulticonnection.org/docs/getting-started/

var connection = new RTCMultiConnection();
var roomId = 'as220-Doorstep';

connection.openOrJoin(roomId);

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

// Utilities

// set volume of one peer
function setAudio(volume) {
  let streamid = connection.peers.selectFirst().streams[0].streamid;
  $('#' + streamid)[0].volume = volume;
}

// dingdong event connection.onNewParticipant

function switchToRoom(newRoomId) {
  leaveRoom();
  connection.openOrJoin(newRoomId);
}

// disconnects from all current peers
function leaveRoom() {
  connection.getAllParticipants().forEach(function(participantId) {
    connection.disconnectWith( participantId );
  });
}
