install:
	npm install

docs:
	mkdir -p docs
	npx jsdoc2md index.js > docs/README.md

test:
	npm test -s

lint:
	npx eslint .

publish:
	npm publish --access public

.PHONY: test docs
