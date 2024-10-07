#!/bin/bash

TIME=0.125

play -n synth $TIME sine 659  
play -n synth $TIME sine 659
sleep $TIME
play -n synth $TIME sine 659
sleep $TIME
play -n synth $TIME sine 523
play -n synth $TIME sine 659
sleep $TIME
play -n synth $TIME sine 784
