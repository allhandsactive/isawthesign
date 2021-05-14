const fs = require("fs");
const winston = require("winston");
const path = require("path");

const server = require("./src/server");

const logLevel = process.env.SIGN_LOGLEVEL || "debug";
const serverPort = process.env.SIGN_PORT || 3000;
const serverHost = process.env.SIGN_HOST || "127.0.0.1";
const authControllerToken =
  process.env.SIGN_CONTROLLER_SECRET || "controllerchangeme";
const authStaffToken = process.env.SIGN_STAFF_SECRET || "staffchangeme";

const nodeEnv = process.env.NODE_ENV || "development";
const { version } = JSON.parse(
  fs.readFileSync(path.join(__dirname, "package.json"), "utf8"),
);

// configure the logger
const log = winston.createLogger({
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
  ),
  transports: [
    new winston.transports.Console({
      level: logLevel,
    }),
  ],
});

// set up error handling
process.on("uncaughtException", (err) => {
  log.error("Uncaught exception!", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  log.error("Uncaught promise rejection!", err);
  process.exit(1);
});

// handle shutdown requests gracefully
process.on("SIGTERM", () => {
  log.info("Received SIGTERM, shutting down.");
  process.exit(0);
});

process.on("SIGINT", () => {
  log.info("Received SIGINT, shutting down.");
  process.exit(0);
});

const app = server(log, authControllerToken, authStaffToken).listen(
  serverPort,
  serverHost,
  () => {
    const { port, address: host } = app.address();

    log.info(
      "I Saw The Sign (and it opened up my eyes) Server v%s (%s) listening at http://%s:%s (Node.js %s)",
      version,
      nodeEnv,
      host,
      port,
      process.version,
    );
  },
);
