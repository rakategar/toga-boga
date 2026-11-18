#!/bin/bash
# usage: SHOTDIR=... _dev/shot.sh out.png W H "anchor1,anchor2" totalW totalH
P="$SHOTDIR/prof-$RANDOM"
cd "$SHOTDIR" && timeout 60 google-chrome --headless=new --disable-gpu --hide-scrollbars --no-first-run --user-data-dir="$P" --window-size=$5,$6 --virtual-time-budget=9000 --screenshot="$1" "http://localhost:5317/_dev/frames.html?w=$2&h=$3&a=$4" >/dev/null 2>&1
rm -rf "$P"
