env ?= dev
DEBUG ?=

build: ## Build
	@yarn --silent build

clean: clean-modules clean-coverage
clean-coverage: ## Remove test coverage directory
	@rm -rf coverage/
clean-modules: ## Remove Javascript dependencies directory
	@rm -rf node_modules/

install: ## Install the Javascript dependencies
	@yarn --silent install

start: ## Start (local)
	@PORT=5400 DEBUG=$(DEBUG)  yarn --silent start

test: ## Execute the tests
	@CI=true yarn --silent test --all --color --coverage --detectOpenHandles

.DEFAULT_GOAL := install
.PHONY: build \
		clean clean-coverage clean-modules \
		install \
		start \
		test \
