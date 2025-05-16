# Build stage
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
# Copy the built files
COPY --from=build /app/dist /app
# Copy the config template
COPY public/config.js.template /app/
# Copy the entrypoint script
COPY docker-entrypoint.sh /

# Make the entrypoint script executable
RUN chmod +x /docker-entrypoint.sh

# Configure nginx
RUN echo 'server { \
    listen 5001; \
    location / { \
        root /app; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Set the entrypoint script
ENTRYPOINT ["/docker-entrypoint.sh"]
# Run nginx
CMD ["nginx", "-g", "daemon off;"]

# Expose port 5001
EXPOSE 5001
