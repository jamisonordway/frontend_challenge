FROM mongo:3.2.21-jessie

# adds init script to populate DB with mock data
ADD ./docker/mongo/init.js /docker-entrypoint-initdb.d/
CMD ["mongod"]
