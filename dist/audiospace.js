(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// working from https://www.rtcmulticonnection.org/docs/getting-started/
/*
TODO:
* toggle area button using entryArea property
* begin managing UI logic like buttons, using events like onEnterRoom
*/

Audiospace = function constructor(o) {

  o.connection = require('./connection.js')({
    roomId: o.roomId || 'as220-Doorstep'
  });

  // add dingdong event connection.onNewParticipant

  o.rooms = o.rooms || {
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

  let publicApi = {
    switchToRoom: switchToRoom,
    leaveRoom: leaveRoom,
    setVolume: setVolume,
    loudenAllPeers: loudenAllPeers,
    quietDistantPeers: quietDistantPeers,
    getNearbyPeers: getNearbyPeers,
    getDistantPeers: getDistantPeers,
    goToArea: goToArea,
    options: o
  };
  return publicApi;
}

module.exports = Audiospace;
},{"./connection.js":2}],2:[function(require,module,exports){
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
  connection.sdpConstraints.mandatory = o.sdpConstraints.mandatory || {
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
},{}]},{},[1]);
