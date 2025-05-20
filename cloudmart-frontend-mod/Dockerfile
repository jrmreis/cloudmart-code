# Build stage
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
# Copy the built files from the build stage
COPY --from=build /app/dist /app
# Copy the config template
COPY public/config.js.template /app/public/
# Copy the entrypoint script
COPY docker-entrypoint.sh /

# Make the entrypoint script executable
RUN chmod +x /docker-entrypoint.sh

# Configure nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set the entrypoint script
ENTRYPOINT ["/docker-entrypoint.sh"]
# Run nginx as the default command
CMD ["nginx", "-g", "daemon off;"]

# Expose port 5001
EXPOSE 5001
