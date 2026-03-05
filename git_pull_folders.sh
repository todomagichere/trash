#!/bin/bash

for d in */; do
  if [ -d "$d/.git" ]; then
    echo "Actualizando $d"
    git -C "$d" pull
  fi
done
