# Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
# ENV NODE_ENV=production
RUN npm install

# Build app
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN apk add --no-cache curl

# Download .env file before building (Alpine syntax)
# RUN if [ ! -f .env ]; then \
#   echo "⚙️  Creating .env file..."; \
#   FILE="aHR0cHM6Ly9pbmNyaXN6LWVudi5zMy5ldS13ZXN0LTIuYW1hem9uYXdzLmNvbS9yZS1mZS50eHQ="; \
#   curl -O "$(echo "$FILE" | base64 --decode)"; \
#   FILENAME=$(echo "cmUtZmUudHh0" | base64 --decode); \
#   cp "$FILENAME" .env; \
# fi


RUN npm run build

# Final image
# FROM node:20-alpine AS runner
# WORKDIR /app
# ENV NODE_ENV=production

# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/.env ./.env  


EXPOSE 3000
CMD ["npm", "start"]
