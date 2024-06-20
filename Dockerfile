# Use official Node.js image as base
FROM node:18-alpine 

# Set working directory
WORKDIR /

# Install Strapi CLI globally
# RUN npm install -g strapi@latest
# Install Python and dependencies

# Copy package.json and package-lock.json (if present) to /app
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["yarn", "run","dev"]
