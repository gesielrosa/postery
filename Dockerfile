# Multi-stage build for Angular frontend with JSON server
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build Angular application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app directory
WORKDIR /app

# Copy package files for production dependencies
COPY package*.json ./

# Install only production dependencies and json-server globally
RUN npm ci --only=production && \
    npm install -g json-server@1.0.0-beta.3 && \
    npm cache clean --force

# Copy built Angular app from builder stage
COPY --from=builder /app/dist ./dist

# Copy database file
COPY db.seed.json ./db.json

# Create a simple script to run both json-server and serve the frontend
RUN echo '#!/bin/sh' > start.sh && \
    echo 'json-server --watch db.json --port 3000 --host 0.0.0.0 &' >> start.sh && \
    echo 'npx serve -s dist/postery/browser -l 4200' >> start.sh && \
    echo 'wait' >> start.sh && \
    chmod +x start.sh

# Install serve to serve the static files
RUN npm install -g serve

# Expose ports
EXPOSE 3000 4200

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start both services
CMD ["sh", "start.sh"]
