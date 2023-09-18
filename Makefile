env ?= dev
DEBUG ?=

build: build-api-public build-api-user## Build

build-api-public:
	@make -C api-public/ build env=$(env)

build-api-user:
	@make -C api-user/ build env=$(env)

start-api-user:
	@make -C api-user/ start env=$(env)

start-api-public:
	@make -C api-public/ start env=$(env)

start:
	@npx concurrently -n api-user api-public "make start-api-user" "make start-api-public"

.DEFAULT_GOAL := install
.PHONY: build start start-api-public start-api-user
