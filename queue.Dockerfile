FROM node:lts-alpine as queue
WORKDIR /queue
COPY ./package*.json ./
COPY ./tsconfig.json ./
COPY ./svelte.config.js ./
COPY ./vite.config.js ./
COPY ./.env.production ./.env
RUN npm ci --omit dev --force
ENV NODE_OPTIONS=--max_old_space_size=1800
RUN export $(cat .env | xargs)
RUN npx --yes graphile-worker