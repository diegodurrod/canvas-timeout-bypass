import { logger } from '../util/logger';
import { Page } from 'puppeteer';

const stepAction = async (page: Page, action: 'previous'|'next') => {
  const existsPrevButton = await page.evaluate(async () => {
    return !!document
      .getElementsByClassName('module-sequence-footer-button--previous')
      .length;
  });
  const existsNextButton = await page.evaluate(async () => {
    return !!document
      .getElementsByClassName('module-sequence-footer-button--next')
      .length;
  });

  const classname = '.module-sequence-footer-button--';
  await page.waitForSelector('.module-sequence-footer', { visible: true });
  if (existsPrevButton && action === 'previous' || existsNextButton && action === 'next') {
    logger({ severity: 'info', message: `Clicking the ${action} button` });
    await page.click(`${classname}${action} > a`);
  } else {
    if (existsPrevButton) {
      logger({
        severity: 'warning',
        message: `No ${action} button found, clicking on previous button`
      });
      await page.click(`${classname}previous > a`);
    } else if (existsNextButton) {
      logger({
        severity: 'warning',
        message: `No ${action} button found, clicking on next button`
      });
      await page.click(`${classname}next > a`);
    } else {
      logger({ severity: 'error', message: `No ${action} button found` });
      throw new Error(`No ${action} button found`);
    }
  }
  await page.waitForNavigation();
}

export {
  stepAction
}