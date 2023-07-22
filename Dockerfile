FROM node:20.3

# Install nginx
RUN DEBIAN_FRONTEND=noninteractive apt-get -y update && \
    DEBIAN_FRONTEND=noninteractive apt-get -y install \
        nginx \
    && rm -rf /var/lib/apt/lists/*

# ---------
# Npm build

WORKDIR /app

# Cache dependencies separately for faster builds
COPY package.json      ./package.json
COPY package-lock.json ./package-lock.json
RUN npm install

# Copy in code used for building the static site
COPY . .

# Build the application
RUN npm run build

# -------------------
# nginx Configuration

# Copy the nginx config from the repo
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output to Nginx serving directory
RUN mv dist/* /usr/share/nginx/html

# Test config
RUN nginx -t

EXPOSE 80

# entrypoint.sh will just exec this command
CMD ["nginx", "-g", "daemon off;"]
