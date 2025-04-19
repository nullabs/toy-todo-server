FROM node:lts-alpine AS deps
WORKDIR /app
COPY yarn.lock package.json ./
RUN yarn install --frozen-lockfile --production && yarn cache clean

FROM node:lts-alpine
ENV NODE_ENV=production
RUN addgroup -S deploy && adduser -S deploy -G deploy
RUN apk add --no-cache wget tini
WORKDIR /server
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN chown -R deploy:deploy /server
USER deploy
EXPOSE 3000
EXPOSE 9229
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD wget --spider --quiet http://localhost:3000/ || exit 1
ENTRYPOINT ["/sbin/tini", "--", "node", "--inspect=0.0.0.0:9229", "app.js"]
