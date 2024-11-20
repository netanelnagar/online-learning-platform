import winston from "winston";
import * as pj from "../../package.json";


const logger = winston.createLogger({
    level: "debug",
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf((info) => {
            return `<${pj.name} v${pj.version}> [${process.env.MODE}] ${info.timestamp} [${info.module}] ${info.level}: ${info.message}`
        }),

    ),
    transports: new winston.transports.Console()
});


export const getLogger = (moduleName: string) => {
    return logger.child({ module: moduleName })
}