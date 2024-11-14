# Use the official Node.js image from the Docker Hub
FROM node:18


RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxtst6 \
    xdg-utils \
    libdrm2 \
    libgbm1 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 3000

# Define the command to run the app
CMD ["node", "index.js"]