FROM node:15.3.0-alpine3.12
WORKDIR /app
RUN yarn global add json-server@0.16.2
COPY json-server .
CMD ["json-server",\
    "-H", "0.0.0.0",\
    "-s", "./public",\
    "-w", "./db.json"]

