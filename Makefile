.PHONY: client mongo server unbindAPIPort unbindClientPort unbindMongoPort

client:
	#

mongo:
	#

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
