module.exports = function connection(o) {
  
  var connection = new RTCMultiConnection();
  o.roomId = o.roomId || 'as220-Doorstep';

  // Config

  connection.socketURL = o.socketURL || 'https://rtcmulticonnection.herokuapp.com:443/';

  // if you want audio+video conferencing
  connection.session = o.session || {
    audio: true,
    video: false
  };

  connection.mediaConstraints = o.mediaConstraints || {
    audio: true,
    video: false
  };

  connection.sdpConstraints = o.sdpConstraints || {};
  connection.sdpConstraints.mandatory = connection.sdpConstraints.mandatory || {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: false
  };

  // https://www.rtcmulticonnection.org/docs/iceServers/
  // use your own TURN-server here!
  connection.iceServers = o.iceServers || [{
    'urls': [
      'stun:stun.l.google.com:19302',
      'stun:stun1.l.google.com:19302',
      'stun:stun2.l.google.com:19302',
      'stun:stun.l.google.com:19302?transport=udp',
    ]
  }];

  // Initialize

  connection.openOrJoin(roomId);
}