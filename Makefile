.PHONY: client mongoBuild mongoDestroyData mongoData mongoRebuild mongoStart server unbindAPIPort unbindClientPort unbindMongoPort

client:
	#

# kill any running instances of the mongo docker service and rebuild the docker image
mongoBuild:
	docker-compose kill mongo
	docker-compose rm -f mongo
	docker-compose build mongo

# destroys DB data volume shared between host and container
mongoDestroyData:
	sudo rm -rf ./docker/mongo/data

# adds data to mongo. should only be executed while the mongo docker-compose service is running
mongoData:
	docker-compose exec -d mongo sh -c "/docker-entrypoint-initdb.d/users.sh"

# rebuilds mongo docker image, restarts container with rebuilt image and adds data to database
mongoRebuild: mongoDestroyData mongoBuild mongoStart mongoData

# starts the mongo docker-compose service
mongoStart:
	docker-compose up mongo

server:
	#

unbindAPIPort:
	kill -9 $$(lsof -i :3000 | grep main | awk '{ print $$2}' | xargs) ||:

unbindClientPort:
	kill -9 $$(lsof -i :8080 | grep main | awk '{ print $$2}' | xargs) ||:

unbindMongoPort:
	kill -9 $$(lsof -i :27017 | grep main | awk '{ print $$2}' | xargs) ||:

start:
	docker-compose up
