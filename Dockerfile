FROM node:16.1.0

ENV NODE_ENV="production"
ENV SIGN_HOST="0.0.0.0"
ENV SIGN_PORT="3000"

# update npm (we can kill this once node 16 hits lts)
RUN npm install -g npm@7.13.0

WORKDIR /api

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install

COPY ./ ./

EXPOSE $SIGN_PORT/tcp

ENTRYPOINT ["npm", "run", "production"]