# Use the official Node.js image from the Docker Hub
FROM node:18

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copiar arquivos de configuração do npm
COPY package*.json ./



# Instalar dependências
RUN npm install

RUN apt-get update && \
    apt-get install -y \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libdbus-1-3 \
    libxshmfence1 \
    libx11-6 \
    libxext6 \
    libxfixes3 \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    lsb-release \
    xdg-utils \
    wget \
    && rm -rf /var/lib/apt/lists/*
# Copiar o restante do código da aplicação
COPY . .

# Expor a porta da aplicação
EXPOSE 3000

# Definir o comando para rodar a aplicação
CMD ["node", "index.js", "--no-sandbox", "--disable-setuid-sandbox"]
