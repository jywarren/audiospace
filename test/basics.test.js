const timeout = process.env.SLOWMO ? 60000 : 10000;
const fs = require('fs');
beforeAll(async () => {
  path = fs.realpathSync('file://../index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
});

describe('Initialize library', () => {
  test('using the constructor', {

    var audiospace = new Audiospace({

    });

    expect(audiospace).not.toBeNull();

  });

  //test('using the constructor', async () => {
  //}, timeout);

});
