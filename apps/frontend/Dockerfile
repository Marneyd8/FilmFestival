FROM node:22.2.0-alpine as runner
RUN apk add --no-cache dumb-init
ENV NODE_ENV production
WORKDIR /usr/src/app

COPY apps/frontend/ .
COPY . .

RUN chown -R node:node .
USER node
EXPOSE ${FRONTEND_PORT}
ENV NEXT_TELEMETRY_DISABLED 1
CMD ["dumb-init", "node", "server.js"]