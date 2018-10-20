FROM mongo:3.2.21-jessie

RUN apt-get update

# copies init scripts to populate DB with mock data
COPY ./docker/mongo/docker-entrypoint-initdb.d /docker-entrypoint-initdb.d

# changes the file mode for the init scripts to executable files
RUN chmod +x -R /docker-entrypoint-initdb.d

CMD ["mongod"]
