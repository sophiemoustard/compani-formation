if [ -f .env ]; then
  set -a
  . ./.env
  set +a
fi

if [ "$PLATFORM" = "web" ] && [ "$PROFILE" != "local" ]; then
  echo "Running: npx expo export -p web"
  npx expo export -p web
fi