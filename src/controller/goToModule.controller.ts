import { logger } from '../util/logger';
import { Page } from 'puppeteer';
import urls from '../config/url';

const goToModule = async (page: Page) => {
  await page.waitForSelector('#context_module_item_410195', { visible: true });
  logger({severity: 'info', message: 'Going to first module'});
  await page.goto(urls.MODULE, { waitUntil: 'load' });
}

export {
  goToModule
}