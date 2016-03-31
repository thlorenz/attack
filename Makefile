test-extract-routes:
	npm rm express && npm --cache-min=Infinity install express@3 && bash ./test/special/run.sh
	npm rm express && npm --cache-min=Infinity install express@4 && bash ./test/special/run.sh
