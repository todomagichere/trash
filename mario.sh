#!/bin/bash

TIME=0.125

play -n synth $TIME sine 659 &> /dev/null
play -n synth $TIME sine 659 &> /dev/null
sleep $TIME
play -n synth $TIME sine 659 &> /dev/null
sleep $TIME
play -n synth $TIME sine 523 &> /dev/null
play -n synth $TIME sine 659 &> /dev/null
sleep $TIME
play -n synth $TIME sine 784 &> /dev/null

echo ""
echo "        🟥🟥🟥🟥🟥"
echo "      🟥🟥🟥🟥🟥🟥🟥🟥🟥"
echo "      🟫🟫🟫🟧🟧🟫🟧"
echo "    🟫🟧🟫🟧🟧🟧🟫🟧🟧🟧"
echo "    🟫🟧🟫🟫🟧🟧🟧🟫🟧🟧🟧"
echo "    🟫🟫🟧🟧🟧🟧🟫🟫🟫🟫"
echo "        🟧🟧🟧🟧🟧🟧🟧"
echo "      🟫🟫🟥🟫🟫🟫"
echo "    🟫🟫🟫🟥🟫🟫🟥🟫🟫🟫"
echo "  🟫🟫🟫🟥🟧🟥🟥🟥🟫🟫🟫🟫"
echo "  🟧🟧🟥🟥🟧🟥🟥🟧🟥🟫🟧🟧"
echo "  🟧🟧🟧🟥🟥🟥🟥🟥🟥🟧🟧🟧"
echo "  🟧🟧🟥🟥🟥🟥🟥🟥🟥🟥🟧🟧"
echo "      🟥🟥🟥    🟥🟥🟥"
echo "    🟫🟫🟫        🟫🟫🟫"
echo "  🟫🟫🟫🟫        🟫🟫🟫🟫"
echo ""
