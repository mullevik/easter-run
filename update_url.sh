#!/bin/bash

set -e

BASE_URL=$( tofu output | cut -d" " -f 3 )
TARGET_FILE=er-client/client.js

echo "Updating $BASE_URL in $TARGET_FILE"

ESCAPED_BASE_URL=$(printf '%s\n' "$BASE_URL" | sed -e 's/[]\/$*.^[]/\\&/g')

sed -i "s/^const BASE_URL \= \".*\"\;$/const BASE_URL = ${ESCAPED_BASE_URL}\;/g" "$TARGET_FILE"
