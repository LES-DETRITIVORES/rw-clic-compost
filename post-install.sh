#! bin/sh
# Setup Docker with Ubuntu
# From https://docs.docker.com/engine/install/ubuntu/

# Update repository
sudo apt-get update

# ADD Docker GPG Key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Setup repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo chmod a+r /etc/apt/keyrings/docker.gpg
sudo apt-get update

# Install Docker Engine, containerd, Docker Compose
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Test docker image
sudo docker run hello-world