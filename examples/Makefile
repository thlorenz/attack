express-app:
	ROUTES_ONLY=1 node ./express-app.js &&\
	node ../bin/attack -r ./attack-routes.json -t ab -u http://localhost:5001 > express-app-attack.sh &&\
	echo "Now start the express-app and run the express-app-attack.sh script in another terminal."
