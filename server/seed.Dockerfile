FROM node:18-alpine3.19

WORKDIR /app

COPY ./package*.json .

RUN npm ci

COPY ./src/utils ./src/utils
COPY ./src/db ./src/db


ENTRYPOINT [ "node", "src/utils/seed.js" ]