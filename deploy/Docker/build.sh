#!/bin/bash

for dir in `ls -d */`;
do
  cd ./$dir
  docker build --force-rm=true --no-cache=true -t adomenech73/${dir%%/} .
  cd ../
done

exit 0
