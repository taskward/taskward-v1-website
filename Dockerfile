FROM node
RUN mkdir -p /taskward-docker
WORKDIR /taskward-docker
COPY . .
RUN yarn
CMD yarn dev
EXPOSE 5173