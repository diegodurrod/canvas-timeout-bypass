import * as chalk from 'chalk';
import {Chalk} from "chalk";

const generateConsoleColors = (severity: string): Chalk => {
  let color;
  switch (severity) {
    case 'info':
      color = chalk.blue;
      break;
    case 'warning':
      color = chalk.yellow;
      break;
    case 'error':
      color = chalk.white.bgRed;
      break;
    case 'success':
      color = chalk.green;
      break;
    default:
      color = chalk.reset;
      break;
  }
  return color;
}

export {
  generateConsoleColors
}