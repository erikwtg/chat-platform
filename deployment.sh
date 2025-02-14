#!/bin/bash

if docker network inspect infinity_base_chat_network &>/dev/null; then
  echo "Network infinity_base_chat_network already exists."
else
  docker network create infinity_base_chat_network
  echo "Network infinity_base_chat_network created."
fi

docker-compose -f docker-compose.yml up -d --build

echo "Containers started successfully."

if docker ps --filter "network=infinity_base_chat_network" | grep -q "api"; then
  echo "Container is running and connected to the network."
else
  echo "Container is not running or not connected to the network."
fi