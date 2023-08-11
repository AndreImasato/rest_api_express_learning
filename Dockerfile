FROM node:19.7-slim

ENV APP_DEPS="net-tools netcat" \
    ROOT_DIR="/usr/app"

RUN apt-get update \
    && apt-get install -y \
        ${APP_DEPS} \
        --no-install-recommends

WORKDIR ${ROOT_DIR}

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon 

COPY . .

EXPOSE 8080