FROM node:alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

FROM nginx:alpine

COPY --from=build /usr/src/app/dist/simpli-f/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
