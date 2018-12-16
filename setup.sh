#!/bin/bash

if [[ -e .setup ]]; then
  echo "Setup seems to have already been run, so we won't do it again."
  echo "If you wish to run it anyway, please remove the .setup file and run it."
  exit 1
fi

OS=$(if [[ $OSTYPE =~ linux ]]; then
  echo linux;
elif [[ $OSTYPE =~ Darwin ]]; then
  echo mac;
else echo unknown;
fi)
INSTALL_CMD=$(if [[ $OS = linux ]]; then
  echo sudo apt install;
elif [[ $OS = mac ]]; then
  echo brew install;
fi)

if [[ $OS = mac && ! $(which brew >/dev/null) ]]; then
  echo "Please install Homebrew, see https://brew.sh/"
  exit 1
fi

# Install commands
#

for cmd in git curl ruby; do
  if ! which "$cmd" >/dev/null; then
    echo "[install] $cmd"
    $INSTALL_CMD "$cmd" || exit 1
  fi
done


if [[ $OS = linux ]]; then
  for cmd in libpq-dev; do
    if ! which "$cmd" >/dev/null; then
      echo "[install] $cmd"
      $INSTALL_CMD "$cmd" || exit 1
    fi
  done
fi

if ! which rbenv >/dev/null; then
  echo "Please install rbenv, see https://github.com/rbenv/rbenv"
  exit 1
fi

for cmd in bundle rails; do
  if ! which "$cmd" >/dev/null; then
    echo "[install] $cmd"
    gem install "$cmd" || exit 1
  fi
done

if ! which cockroach >/dev/null; then
  if [[ $OS = linux ]]; then
    echo "[install] cockroach"
    wget -Nq "https://binaries.cockroachdb.com/cockroach-latest.linux-amd64.tgz" || exit 1
    tar xfz cockroach-latest.linux-amd64.tgz || exit 1
    sudo cp -i cockroach-latest.linux-amd64/cockroach /usr/local/bin || exit 1
    rm -r cockroach-latest.linux-amd64*
  else
    echo "Please install CockroachDB, see https://www.cockroachlabs.com/docs/stable/install-cockroachdb.html"
    exit 1
  fi
fi

if ! which node >/dev/null; then
  if [[ $OS = linux ]]; then
    echo "[install] node"
    node_js_version=$(wget -q -O - "https://nodejs.org/dist/index.tab" \
      | tail -n +2 | head -n 1 | cut -f1)
    wget -Nq "https://nodejs.org/dist/${node_js_version}/node-${node_js_version}-linux-x64.tar.xz" || exit 1
    tar xf node-*.tar.xz || exit 1
    rm node-*-linux-x64.tar.xz
    sudo mv node-*-linux-x64 /usr/local/nodejs || exit 1
    for exe in $(ls /usr/local/nodejs/bin); do
      sudo ln -s /usr/local/nodejs/bin/"${exe}" /usr/local/bin/"$exe" || exit 1
    done
  else
    echo "Please install Node.js, see https://nodejs.org/en/"
    exit 1
  fi
fi

if ! which yarn >/dev/null; then
  echo "[install] yarn"
  npm install -g yarn
fi

# Set up database
#

cockroach start --insecure --background || exit 1
<db/create.sql cockroach sql --insecure || exit 1

# Set up rails
#

rbenv install -s || exit 1
bundle install || exit 1
bin/rails db:migrate RAILS_ENV=development || exit 1
mkdir log
rails server >log/back 2>&1 & echo $! >.pid-back

# Set up front
#

pushd front
yarn
npm start >../log/front 2>&1 & echo $! >../.pid-front
popd

# Indicate that the setup is done
#

echo "The setup for tongue.app is done."
echo 'Please run `make stop` to stop all servers.'
echo 'Please run `make help` for help on various commands.'

touch .setup
