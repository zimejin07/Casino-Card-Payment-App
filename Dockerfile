# Use official Node.js runtime as the base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml (if exists) to the container
COPY package.json pnpm-lock.yaml* ./

# Install dependencies using pnpm
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy only necessary files for production
COPY . .

# Expose port 3000
EXPOSE 4000

# Command to run the Next.js application
CMD ["pnpm", "next", "dev"]
