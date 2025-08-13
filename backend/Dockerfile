# --- dependencies stage ---
    FROM node:20-slim AS deps

    WORKDIR /app
    ENV NODE_ENV=production
    
    # Copy dependency manifests
    COPY package.json package-lock.json ./
    
    # Install only production deps
    RUN npm ci --omit=dev
    
    # --- runtime stage ---
    FROM node:20-slim
    
    WORKDIR /app
    
    # Copy node_modules from deps stage
    COPY --from=deps /app/node_modules ./node_modules
    
    # Copy the rest of the backend code
    COPY . .
    
    # Create non-root user and set ownership
    RUN useradd -r -u 1001 appuser && chown -R appuser:appuser /app
    USER appuser
    
    # Expose the backend port
    EXPOSE 8080
    
    # Start the server
    CMD ["node", "server.js"]
    