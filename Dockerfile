FROM node:16.17.0-alpine3.15
RUN mkdir -p /taskward
WORKDIR /taskward
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
EXPOSE 5173
CMD ["yarn","dev","--host","0.0.0.0"]