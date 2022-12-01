#!/bin/bash
DAYINPUT=$1

printf -v DAY "%02d" $DAYINPUT

if [ -d "./src/$DAY" ];
then
  echo "./src/$DAY already exists"
else
  cp -r "./src/00" "./src/$DAY"
  sed -i s/00/$DAY/ ./src/$DAY/tasks/*
fi
if [ -d "./input/$DAY" ];
then
  echo "./input/$DAY already exists"
else
  cp -r "./input/00" "./input/$DAY"
fi
