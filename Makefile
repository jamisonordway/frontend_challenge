.PHONY: client mongo server unbindPort3000 unbindPort8080 unbindPort27017

client:
	#

mongo:
	#

server:
	#

unbindPort3000:
	kill -9 $$(lsof -i :3000 | grep main | awk '{ print $$2}' | xargs) ||:

unbindPort8080:
	kill -9 $$(lsof -i :8080 | grep main | awk '{ print $$2}' | xargs) ||:

unbindPort27017:
	kill -9 $$(lsof -i :27017 | grep main | awk '{ print $$2}' | xargs) ||:

start:
	docker-compose up
