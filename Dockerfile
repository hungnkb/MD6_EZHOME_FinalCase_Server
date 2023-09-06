FROM node:16.14-alpine as base
WORKDIR /app
COPY package.json . yarn.lock ./
RUN yarn install && yarn cache clean

FROM base as builder
WORKDIR /app
COPY . .
COPY --from=base ./app/node_modules ./node_modules
CMD yarn build

FROM base
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder ./app/.env .
EXPOSE 3002
CMD yarn start

