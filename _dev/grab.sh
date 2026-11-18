#!/bin/bash
# usage: SHOTDIR=... _dev/grab.sh name W H anchors cols
S=$SHOTDIR; n=$(echo "$4" | tr ',' '\n' | wc -l); cols=${5:-1}; rows=$(( (n + cols - 1) / cols ))
"$(dirname "$0")/shot.sh" "$S/$1.png" "$2" "$3" "$4" $(( $2 * cols )) $(( $3 * rows ))
python3 -c "
from PIL import Image; im=Image.open('$S/$1.png'); s=min(1, 1400/im.width); im.resize((int(im.width*s),int(im.height*s))).convert('RGB').save('$S/$1.jpg',quality=82)"
