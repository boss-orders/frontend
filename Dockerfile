FROM node:21-alpine3.17

WORKDIR /front

COPY . /front

RUN npm install