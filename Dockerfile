# FROM docker.io/oven/bun:1.1.20-alpine
# DO NOT USE BUN. See https://github.com/oven-sh/bun/issues/14299
FROM docker.io/library/node:22.11.0-alpine3.20

COPY ./build /app
WORKDIR /app
CMD ["node", "/app/index.js"]
# CMD ["bun", "/app/index.js"]

