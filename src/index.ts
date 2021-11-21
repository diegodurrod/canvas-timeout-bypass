import * as puppeteer from 'puppeteer';
import urls from './config/url';
import puppeteerConfig from './config/puppetter.config';
import deviceConfig from "./config/device.config";

import { logger } from './util/logger';
import {
  doLogin,
  goToModule, showModuleTitle,
  stepAction,
} from './controller';

try {
  (async () => {
    logger({severity: 'info', message: 'Starting...'});

    const browser = await puppeteer.launch(puppeteerConfig);
    logger({severity: 'info', message: 'Initializing browser options'});

    let page = await browser.newPage();

    // Configure the navigation timeout
    await page.setDefaultNavigationTimeout(0);

    logger({severity: 'info', message: 'Emulating device'});
    await page.emulate(deviceConfig);

    try {
      logger({severity: 'info', message: 'Going to Canvas login URL...'});
      await page.goto(urls.INIT, { waitUntil: 'load' });
      await doLogin(page);
      await goToModule(page);
      await showModuleTitle(page);
      setInterval(async () => {
        const action = (Math.floor(Math.random() * 2) === 0)
          ? 'previous'
          : 'next';
        await stepAction(page, action);
        await showModuleTitle(page);
      }, 60000);
    } catch (error) {
      await page.screenshot({ path: `outputs/${Date.now()}.png` });
      logger({severity: 'error', message: 'There was an error'});
      logger({severity: 'error', message: error.message});
      logger({severity: 'error', message: 'Exiting'});
      process.exit(999);
    }
  })();
} catch (err) {
  logger({severity: 'error', message: 'Unknown fatal error, exiting!'});
  process.exit(1);
}