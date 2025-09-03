# FROM nginx:1.29-alpine

# RUN rm /etc/nginx/conf.d/default.conf

# COPY nginx.conf /etc/nginx/conf.d/default.conf

# COPY dist /usr/share/nginx/html

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# FROM nginx:1.29-alpine

# RUN rm /etc/nginx/conf.d/default.conf

# COPY nginx.conf /etc/nginx/conf.d/default.conf

# COPY dist /usr/share/nginx/html

# EXPOSE 80
# CMD [ "nginx", "-g", "daemon off;" ]

# ===============================

# Stage 1: Build React app
FROM node:22-alpine AS builder

# Set working dir
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build app
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:1.29-alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built app from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]