import { LogThisInput } from '../model/util/logThis.model';
import { generateConsoleColors } from '../helper/functions/generateConsoleColors';
import { loggerIcons } from "../helper/constant/loggerIcons";

const logger = (log: LogThisInput) => {
  const color = generateConsoleColors(log.severity)
  const icon = loggerIcons[log.severity];
  const date = new Date()
    .toLocaleString("es-ES", { timeZone: "Europe/Madrid" });

  console.log(color(`${icon} [${date}]: ${log.message}`));
}

export {
  logger
}