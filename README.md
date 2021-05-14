# isawthesign

Simple API for the open sign controller

## Environment Config

- `SIGN_LOGLEVEL` defaults to `debug`
- `SIGN_PORT` defaults to `3000`
- `SIGN_HOST` defaults to `127.0.0.1`
- `SIGN_CONTROLLER_SECRET` the secret used by the sign controller (should be a long random string)
- `SIGN_STAFF_SECRET` the secret used by staff to manually control the sign (should be a long random string)

## API

The API will live at `isawthesign.allhandsactive.org`. Methods listed as public don't require auth. Methods listed as private require HTTP basic auth.

- GET /state - public, returns `true`/`false` for power on/off
- PUT /state - private, reports an update of the sign state to the API (meant to be used by the sign controller only). The update is passed as `true` for power on, and `false` for power off. This should be called each time the power state changes, and periodically to keep the API in sync (once a minute or so).
- GET /toggle - private, reports true/false (meant to be used by the sign controller only), once true is read, it goes back to false. This should be called periodically by the sign controller to check for a remote state change (once every 5 seconds or so).
- PUT /toggle - private, allows staff to submit a toggle request (only used by AHA staff, separate auth)

## NPM Scripts

- `npm run build` - build and push the docker image - expects the `DOCKER_PASS` environment variable to be a valid auth token for `allhandsactive`
- `npm run lint:fix` - fix various code formatting problems and report errors
- `npm start` - start the development server and monitor for changes
- `npm test` - run the test suite
