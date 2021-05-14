const basicAuth = require("express-basic-auth");
const express = require("express");
const expressWinston = require("express-winston");
const helmet = require("helmet");
const nocache = require("nocache");

module.exports = (log, authControllerToken, authStaffToken) => {
  const app = express();
  // trust x-forwarded headers (since we'll always be using a reverse proxy)
  app.enable("trust proxy");

  app.use(
    expressWinston.logger({
      winstonInstance: log,
      expressFormat: true,
    }),
  );

  // security
  app.use(helmet());
  // don't cache responses
  app.use(nocache());
  // parse bodies as json
  app.use(express.json({ strict: false }));

  // default the sign state to off
  let state = false;
  // should we toggle the state?
  let toggle = false;

  app.get("/state", (req, res) => {
    res.json(state);
  });

  app.put(
    "/state",
    basicAuth({ users: { controller: authControllerToken } }),
    (req, res) => {
      if (req.body) {
        state = true;
      } else {
        state = false;
      }

      res.sendStatus(204);
    },
  );

  app.get(
    "/toggle",
    basicAuth({ users: { controller: authControllerToken } }),
    (req, res) => {
      res.json(toggle);
      toggle = false;
    },
  );

  app.put(
    "/toggle",
    basicAuth({ users: { staff: authStaffToken } }),
    (req, res) => {
      toggle = true;
      res.sendStatus(204);
    },
  );

  return app;
};
