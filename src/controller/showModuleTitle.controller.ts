import { logger } from '../util/logger';
import { Page } from 'puppeteer';

const showModuleTitle = async (page: Page) => {
  const title = await page.evaluate(async () => {
    return document
      .getElementsByTagName('h1')[0].innerText;
  });
  const subTitle = await page.evaluate(async () => {
    return document
      .getElementsByTagName('h2')[0].innerText;
  });
  logger({severity: 'success', message: `Showing module '${title}' > '${subTitle}'`});
}

export {
  showModuleTitle,
}