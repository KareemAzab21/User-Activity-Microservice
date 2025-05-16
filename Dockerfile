# Use Node.js LTS
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package files first (better layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy all files
COPY . .

# Expose port
EXPOSE 3000

# Start command
CMD ["node", "src/app.js"]