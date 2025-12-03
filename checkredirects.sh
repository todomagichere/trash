#!/bin/bash

REDIRECT_LIST_FILE="$1"
SESSION_COOKIE="$2"

if [ -z "$REDIRECT_LIST_FILE" ]; then
    echo "Uso: $0 file.csv <session_cookie>"
    exit 1
fi

for destination in $(cat $REDIRECT_LIST_FILE); do

	echo -n $destination
	status=$(curl -s -o /dev/null -w "%{http_code}" --cookie $SESSION_COOKIE $destination)
	echo -n " "
	echo -n $status
	echo -n " "
	if [[ "$status" -ge 200 && "$status" -lt 300 ]]; then
	  echo "OK"
	else
	  echo "KO"
	fi

done < "$REDIRECT_LIST_FILE"
