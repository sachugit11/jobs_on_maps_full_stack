# ----- Stage 1: Build -----
FROM node:18-alpine AS builder
WORKDIR /app

# Check package.json exists before copy
COPY package.json package-lock.json ./
RUN npm ci

# Copy full application
COPY . .

# Build Next.js
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# ----- Stage 2: Runner -----
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Minimal group and user setup
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# ONLY copy things needed to run (ignoring full node_modules!)
COPY --from=builder /app/public ./public

# Standalone output contains minimal build files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Note: Standalone Next.js uses server.js
CMD ["node", "server.js"]
