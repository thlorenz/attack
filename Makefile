test-extract-routes:
	npm rm express && npm install express@3 && node test/special/extract-routes.js 
	npm rm express && npm install express@4 && node test/special/extract-routes.js
	npm rm express
