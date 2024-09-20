FROM node:18-alpine as build

WORKDIR /app

COPY package.json tsconfig.json ./

RUN npm install
COPY . .

RUN npm run build

FROM nginx:1.21.6-alpine as prod
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/default.conf  /etc/nginx/conf.d/
EXPOSE 80
