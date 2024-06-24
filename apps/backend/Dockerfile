FROM node:22.2.0-alpine as deps

RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

COPY dist/apps/backend/package*.json ./

COPY apps/backend/prisma prisma

RUN npx prisma generate

RUN npm install --omit=dev

FROM node:22.2.0-alpine as runner

RUN apk add --no-cache dumb-init

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules

COPY --from=deps /usr/src/app/package.json ./package.json

COPY dist/apps/backend .

RUN chown -R node:node .

USER node

EXPOSE ${BACKEND_PORT}

CMD ["node", "main.js"]