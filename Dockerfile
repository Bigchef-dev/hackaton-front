# ---- Build Stage ----
FROM node:22-alpine AS build

WORKDIR /app

# Copy lockfile and package.json for dependency installation
COPY package.json package-lock.json* ./
RUN npm ci

# Copy the rest of the application source
COPY . .

# Build the application for production
RUN npm run build

# ---- Development Stage ----
FROM node:22-alpine AS dev

WORKDIR /app

# Copy lockfile and package.json for dependency installation
COPY package.json package-lock.json* ./
RUN npm ci

# Copy the rest of the application source
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]

# ---- Production Stage ----
FROM node:22-alpine AS production

WORKDIR /app

# Install a lightweight static server
RUN npm install -g serve

# Copy the built assets from the build stage
COPY --from=build /app/dist ./dist

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
