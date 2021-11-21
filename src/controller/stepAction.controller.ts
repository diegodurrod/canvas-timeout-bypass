import { logger } from '../util/logger';
import { Page } from 'puppeteer';

const stepAction = async (page: Page, action: 'previous'|'next') => {
  const classname = '.module-sequence-footer-button--';
  await page.waitForSelector('.module-sequence-footer', { visible: true });
  logger({severity: 'info', message: `Clicking the ${action} button`});
  await page.click(`${classname}${action} > a`);
  await page.waitForNavigation();
}

export {
  stepAction
}