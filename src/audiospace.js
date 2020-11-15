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