express-sync-error:
	ROUTES_ONLY=1 node ./express-sync-error.js &&\
	node ../bin/attack -r ./attack-routes.json -o sync-results.txt -t ab -u http://localhost:5001 > express-sync-error-attack.sh &&\
	echo "Now run 'node express-sync-error' and 'sh express-sync-error-attack.sh' script in another terminal."

express-async-error:
	ROUTES_ONLY=1 node ./express-async-error.js &&\
	node ../bin/attack -r ./attack-routes.json -o async-results.txt -t ab -u http://localhost:5002 > express-async-error-attack.sh &&\
	echo "Now run 'node express-async-error' and 'sh express-async-error-attack.sh' script in another terminal."

clean:
	rm -rf *.sh attack-routes.json result.txt || true
