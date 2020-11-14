[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/jywarren/audiospace)

# audiospace

A library for managing multiple audio chatrooms, as well as spatialized sound management among participants. For example, smoothly move between multiple audio chatrooms without terrible microphone crosstalk, or hear fellow participants who are in "the same corner" of a room, while still hearing the quieter background noise of other "further away" participants speaking.

This library is in very early stage development. Try out a demo at https://jywarren.github.io/audiospace/

It has 2 rooms and also 2 "areas" in each room... at first you hear everyone in the room at 100% volume but then if you go to an "area," you hear people in the area at full volume and only 50% volume for people who are not in the same area. 

I also want to add a mode where it's truly spatialized so that it could be used as the audio system for other projects. I want to make it read a layout of rooms and areas from a JSON config file. 

More soon!

## Usage

### Initialize

```js
let audiospace = Audiospace({
  roomId: "cozy-hangout",
  rooms: {
    Doorstep: {
      entryArea: 'Left'
    },
    Printshop: {
      entryArea: 'Left'
    }
  }
});
```

