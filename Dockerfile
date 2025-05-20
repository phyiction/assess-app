FROM alpine:latest AS builder

WORKDIR /home

RUN apk add --update --no-cache nodejs npm

# Build React application
COPY . /home
RUN rm -rf dist node_modules
RUN npm install
RUN npm run build

FROM nginx:mainline-alpine

RUN mkdir -p /usr/share/nginx/html/projects/assess-app

COPY --from=builder /home/dist /usr/share/nginx/html/projects/assess-app