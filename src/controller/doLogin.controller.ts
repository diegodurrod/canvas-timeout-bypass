import { logger } from '../util/logger';
import { Page } from 'puppeteer';
import env from '../config/env';

const doLogin = async (page: Page) => {
  await page.waitForSelector('#Username', { visible: true });
  logger({severity: 'info', message: 'Writing username'});
  await page.click('#Username');
  await page.type('#Username', env.username);
  logger({severity: 'info', message: 'Writing password'});
  await page.click('input[type="password"]');
  await page.type('input[type="password"]', env.password);
  logger({severity: 'info', message: 'Sending logging form'});
  await page.click('#btn-acceder');
  await page.waitForNavigation();
}

export {
  doLogin
}