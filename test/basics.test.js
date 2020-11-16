const timeout = process.env.SLOWMO ? 60000 : 10000;
const fs = require('fs');
beforeAll(async () => {
  path = fs.realpathSync('file://../index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
});

describe('Initialize library', () => {
  test('using the constructor', () => {

    console.log("SYNC", document.body.innerHTML); // debug

    let audiospace = Audiospace({

    });

    expect(audiospace).not.toBeNull();

  });

  // async example:
  test('using the constructor', async () => {

    console.log("ASYNC", document.body.innerHTML); // debug

    let audiospace = Audiospace({

    });

    expect(audiospace).not.toBeNull();

  }, timeout);

});
