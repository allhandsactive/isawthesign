FROM node:19.0.1-alpine

ENV NODE_ENV="production"
ENV SIGN_HOST="0.0.0.0"
ENV SIGN_PORT="3000"

WORKDIR /api

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install

COPY ./ ./

EXPOSE $SIGN_PORT/tcp

ENTRYPOINT ["npm", "run", "production"]