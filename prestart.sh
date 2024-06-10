if [ -f .env ]; then
  set -a
  . ./.env
  set +a
fi

if [ "$PLATFORM" != "web" ] || [ "$PROFILE" = "local" ]; then
  echo "Running: .nvm/nvm.sh; nvm use 18.17.0"
  source $HOME/.nvm/nvm.sh; nvm use 18.17.0
fi
