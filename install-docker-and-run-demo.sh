#!/bin/bash

# Install Docker if not present
if ! command -v docker &> /dev/null
then
    echo "Docker not found, installing..."
    apt-get update
    apt-get install -y docker.io
    systemctl start docker
    systemctl enable docker
else
    echo "Docker is already installed"
fi

# Install docker-compose if not present
if ! command -v docker-compose &> /dev/null
then
    echo "docker-compose not found, installing..."
    apt-get install -y docker-compose
else
    echo "docker-compose is already installed"
fi

# Build and run the full stack demo
# Make sure .env file exists for API keys if needed
if [ ! -f .env ]; then
  echo "Warning: .env file not found. Backend may require ALPACA_API_KEY and ALPACA_SECRET_KEY."
fi

docker-compose up --build -d

echo "Web demo is running!"
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:8000/docs"

chmod +x install-docker-and-run-demo.sh
./install-docker-and-run-demo.sh