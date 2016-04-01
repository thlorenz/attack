express-sync-error:
	ROUTES_ONLY=1 node ./express-sync-error.js &&\
	node ../bin/attack -r ./attack-routes.json -t ab -u http://localhost:5001 > express-sync-error-attack.sh &&\
	echo "Now run 'node express-sync-error' and 'sh express-sync-error-attack.sh' script in another terminal."
