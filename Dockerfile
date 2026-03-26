# Multi-stage build for optimal size and security
FROM node:18-alpine AS ui-builder

WORKDIR /app/ui
COPY ui/package*.json ./
RUN npm ci --only=production

COPY ui/ ./
RUN npm run build

FROM python:3.11-slim AS backend

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
WORKDIR /app
COPY pyproject.toml ./
RUN pip install --no-cache-dir -e .

# Copy TypeScript source and build
COPY src/ ./src/
COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci --only=production && npm run build

# Copy UI build
COPY --from=ui-builder /app/ui/dist ./ui/dist

# Create non-root user
RUN useradd --create-home --shell /bin/bash neuralforge
RUN chown -R neuralforge:neuralforge /app
USER neuralforge

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

# Start the application
CMD ["python", "-m", "neural_forge.server", "--port", "3000", "--host", "0.0.0.0"]
