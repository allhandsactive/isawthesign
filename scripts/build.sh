#!/bin/sh
TAG=${GITHUB_SHA:-`git rev-parse HEAD`}
docker build -t allhandsactive/isawthesign:$TAG -t allhandsactive/isawthesign:latest .
echo "$DOCKER_PASS" | docker login -u "allhandsactive" --password-stdin
docker push -a allhandsactive/isawthesign