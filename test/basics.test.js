const timeout = process.env.SLOWMO ? 60000 : 10000;
const fs = require('fs');

beforeAll(async () => {
  await page.goto('https://localhost:8080/', {waitUntil: 'domcontentloaded'});
});

describe('Initialize library', () => {
  test('using the constructor', () => {

    console.log(page.title()); // debug

    expect($('.header').length).not.toBe(0);

    let audiospace = Audiospace({

    });

    expect(audiospace).not.toBeNull();

  });

  // async example:
  test('using the constructor', async () => {

    let audiospace = Audiospace({

    });

    expect(audiospace).not.toBeNull();

  }, timeout);

});
