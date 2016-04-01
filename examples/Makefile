ab-siege-sync: express-sync-error siege-sync

ab-siege-async: express-async-error siege-async

express-sync-error:
	ROUTES_ONLY=1 node ./express-sync-error.js &&\
	node ../bin/attack -r ./attack-routes.json -o sync-results.txt -t ab -u http://localhost:5001 > ab-attack.sh &&\
	echo "Now run 'node express-sync-error' and 'sh ab-attack.sh' script in another terminal."

express-async-error:
	ROUTES_ONLY=1 node ./express-async-error.js &&\
	node ../bin/attack -r ./attack-routes.json -o async-results.txt -t ab -u http://localhost:5002 > ab-attack.sh &&\
	echo "Now run 'node express-async-error' and 'sh ab-attack.sh' script in another terminal."

siege-sync:
	ROUTES_ONLY=1 node ./express-sync-error.js &&\
	node ../bin/attack -r ./attack-routes.json -o sync-results.txt -t siege -u http://localhost:5001 > siege-attack.sh &&\
	echo "Now run 'node express-sync-error' and 'sh siege-attack.sh' script in another terminal."

siege-async:
	ROUTES_ONLY=1 node ./express-async-error.js &&\
	node ../bin/attack -r ./attack-routes.json -o async-results.txt -t siege -u http://localhost:5002 > siege-attack.sh &&\
	echo "Now run 'node express-async-error' and 'sh siege-attack.sh' script in another terminal."

clean:
	rm -rf *.sh attack-routes.json result.txt *siege* || true
