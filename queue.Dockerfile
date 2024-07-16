FROM node:lts-alpine as queue
WORKDIR /queue
COPY ./package*.json ./
COPY ./tsconfig.json ./
COPY ./svelte.config.js ./
COPY ./vite.config.ts ./
COPY ./.env.production ./.env
RUN npm ci --omit dev --force
ENV NODE_OPTIONS=--max_old_space_size=1800
RUN export $(grep -v '^#' .env | xargs)
CMD ["sh", "-c", "DATABASE_URL=$(grep '^DATABASE_URL=' .env | cut -d'=' -f2) && GRAPHILE_WORKER_TOKEN=$(grep '^GRAPHILE_WORKER_TOKEN=' .env | cut -d'=' -f2) && GRAPHILE_WORKER_ENDPOINT=$(grep '^GRAPHILE_WORKER_ENDPOINT=' .env | cut -d'=' -f2) && npx --yes graphile-worker"]
