if [ -f .env ]; then
  set -a
  . ./.env
  set +a
fi
if [ "$PLATFORM" = "web" ] && [ "$PROFILE" != "local" ]; then
  echo "Running: npx serve dist --single"
  npx serve dist --single
else
  echo "Running: npx expo start"
  npx expo start
fi