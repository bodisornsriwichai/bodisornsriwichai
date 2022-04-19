FROM node:16-alpine3.14 as builder
WORKDIR /usr/src/app
COPY package*.json ./
COPY yarn.lock ./
COPY .env ./
RUN yarn
COPY . .
RUN yarn run build

FROM node:16-alpine3.14
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/.env .

EXPOSE 3000
CMD [ "node", "dist/main.js" ]
