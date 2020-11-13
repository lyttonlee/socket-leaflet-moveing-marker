FROM daocloud.io/library/node:latest
EXPOSE 7900
RUN rm -rf /app \
    && mkdir /app
WORKDIR /app
COPY . /app
RUN npm install
CMD [ "npm", "run", "dev" ]