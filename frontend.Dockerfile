FROM node:15.3.0 as builder
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install && mkdir src public
COPY .browserslistrc .eslintrc.js .prettierrc babel.config.js tsconfig.json  vue.config.js /app/
COPY .env-production .env
COPY public public
COPY src src
RUN yarn build

FROM nginx:1.19.5-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
