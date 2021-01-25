const timeout = process.env.SLOWMO ? 60000 : 10000;
const fs = require('fs');

describe('Initialize library', () => {

  beforeAll(async () => {
    await page.goto('https://localhost:8080/', {waitUntil: 'domcontentloaded'});
  });

  it('using the constructor', async () => {

    await expect(page).toMatch('Doorstep');

    let audiospace = await page.evaluate(function() {
      Audiospace({

      });
    });

    await expect(audiospace).not.toBeNull();

    await expect($('.header').length).not.toBe(0);

  }, timeout);

});
