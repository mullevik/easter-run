#!/bin/bash

set -e

BASE_URL="$1"

if [ -z "$BASE_URL" ]; then
    echo "No BASE_URL provided - pass it as the first argument"
    exit 1
fi

TARGET_FILE=er-client/client.js

echo "Updating $BASE_URL in $TARGET_FILE"

ESCAPED_BASE_URL=$(printf '%s\n' "$BASE_URL" | sed -e 's/[]\/$*.^[]/\\&/g')

sed -i "s/^const BASE_URL \= \".*\"\;$/const BASE_URL = ${ESCAPED_BASE_URL}\;/g" "$TARGET_FILE"
