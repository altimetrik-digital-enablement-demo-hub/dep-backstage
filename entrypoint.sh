#!/bin/bash

if [[ -f app-config.${NODE_ENV}.yaml ]]; then
  echo "Using app-config.yaml and app-config.${NODE_ENV}.yaml configuration files "
  node packages/backend \
    --config app-config.yaml \
    --config app-config.${NODE_ENV}.yaml

else
  echo "Using default app-config.yaml"
  node packages/backend \
    --config app-config.yaml
fi
