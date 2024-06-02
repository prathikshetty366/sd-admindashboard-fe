# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies including sharp
RUN npm install sharp

# Install the rest of the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Disable ESLint checks during the build process
ENV SKIP_PREFLIGHT_CHECK=true

# Build the Next.js application
RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# Define the command to run the Next.js application
CMD ["npm", "start"]
