# --- Build Stage ---
FROM node:20.3 AS build

WORKDIR /app

# Cache dependencies separately for faster builds
COPY package.json      ./package.json
COPY package-lock.json ./package-lock.json
RUN npm install

# Copy in code used for building the static site
COPY . .

# Build the application
RUN npm run build

# --- Production Stage ---
FROM node:20.3 AS production

# Install nginx
RUN DEBIAN_FRONTEND=noninteractive apt-get -y update && \
    DEBIAN_FRONTEND=noninteractive apt-get -y install \
        nginx \
    && rm -rf /var/lib/apt/lists/*

# nginx Configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output to Nginx serving directory from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Test config
RUN nginx -t

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# --- Development Stage ---
FROM node:20.3 AS development

WORKDIR /app

# Cache dependencies separately for faster builds
COPY package.json      ./package.json
COPY package-lock.json ./package-lock.json
RUN npm install

# Copy in the source code
COPY . .

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "run", "dev:docker"]
