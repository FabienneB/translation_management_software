all: .setup front/node_modules

start-db: .setup
	cockroach start --insecure --background

start-back: .setup
	rails server >log/back 2>&1 & echo $$! >.pid-back

start-front: .setup front/node_modules
	cd front; npm start >../log/front 2>&1 & echo $$! >../.pid-front

stop: .setup
	cat .pid-* | xargs kill
	cockroach quit --insecure

front/node_modules: .setup
	cd front; npm install

.setup:
	./setup.sh

help:
	@cat .make-help

clean:
	rm -rf front/node_modules logs/*

.PHONY: start-db start-back start-front help
