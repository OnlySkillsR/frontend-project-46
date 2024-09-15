gendiff:
	gendiff file1.json file2.json

install:
	npm install

publish:
	npm publish --dry-run

lint:
	npx eslint

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8
