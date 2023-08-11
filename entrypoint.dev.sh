#!/bin/bash

echo "Checking database availability"
while ! nc -z mongo 27017; do
    sleep 0.1
done

echo "Run dev"
#npm run dev
nodemon --exec babel-node src/index.js localhost 8000

exec "$@"