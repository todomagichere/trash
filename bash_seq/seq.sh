#!/bin/bash

c=261.63
d=293.66
e=329.63
f=349.23
g=392.00
a=440
b=493.88
x=0

TIME=$2
WAVEFORM=$3

for i in $(cat $1); do 
  note="${!i}"
  play -n synth $TIME $3 $note &> /dev/null
done

