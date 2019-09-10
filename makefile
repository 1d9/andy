sourcefiles = $(shell find src -name '*.js' -not -name '*.test.js')

build: $(sourcefiles) package.json package-lock.json
	mkdir -p build
	touch build
	cp -r --parents $(sourcefiles) package.json package-lock.json build
	(cd build; npm ci install --production)
