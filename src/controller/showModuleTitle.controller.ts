import { logger } from '../util/logger';
import { Page } from 'puppeteer';

const showModuleTitle = async (page: Page) => {
  const title = await page.evaluate(async () => {
    const heading = document
      .getElementsByTagName('h1');
    return (heading.length)
      ? heading[0].innerText
      : undefined;
  });
  const subTitle = await page.evaluate(async () => {
    const heading = document
      .getElementsByTagName('h2');
    return (heading.length)
      ? heading[0].innerText
      : undefined;
  });
  logger({severity: 'success', message: `Showing module '${title}' > '${subTitle}'`});
}

export {
  showModuleTitle,
}