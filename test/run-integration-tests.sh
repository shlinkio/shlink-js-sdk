#!/usr/bin/env sh

if [ -z "${SHLINK_VERSION}" ]; then
  echo "SHLINK_VERSION not provided" >&2
  exit 1
fi

export SHLINK_VERSION=${SHLINK_VERSION}
export SHLINK_API_VERSION=${SHLINK_API_VERSION:='3'}
PORT="8765"
export SHLINK_BASE_URL="http://localhost:${PORT}"
CONTAINER=$(docker run --rm -d -p ${PORT}:8080 -e DEFAULT_DOMAIN=localhost:${PORT} -e IS_HTTPS_ENABLED=false ghcr.io/shlinkio/shlink:${SHLINK_VERSION})
sleep 2 # Let's give the server a couple of seconds to start
export SHLINK_API_KEY=$(docker exec ${CONTAINER} shlink api-key:generate | grep "Generated API key" | sed 's/.*Generated\ API\ key\:\ \"\(.*\)\".*/\1/')

### TODO Run tests here
npm run test -- --config vitest-integration.config.ts
TESTS_EXIT_CODE=$?

docker stop ${CONTAINER}

# Exit this script with the same code as the tests. If tests failed, this script has to fail
exit $TESTS_EXIT_CODE
