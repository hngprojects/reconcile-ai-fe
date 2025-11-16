# syntax=docker/dockerfile:1

FROM node:20-alpine

WORKDIR /app
# Copy source and build
COPY . .
# Install dependencies
# COPY package.json package-lock.json ./
RUN npm ci



RUN npm run build

EXPOSE 3000 
CMD ["npm", "run", "start"]
