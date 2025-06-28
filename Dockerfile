# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy server source code
COPY server/ ./

# Expose the server port
EXPOSE 8081

# Start the server
CMD ["npm", "start"]