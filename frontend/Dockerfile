# ----- Stage 1: Build -----
FROM node:20-alpine AS builder
WORKDIR /app

# Ensure clean dependency install
COPY package.json package-lock.json ./
RUN npm ci

# Copy full application context
COPY . .

# Build Next.js 16 (requires Node 20+)
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# ----- Stage 2: Runner -----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Production optimizations
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy essential files for standalone runtime
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Main entrypoint for standalone Next.js
CMD ["node", "server.js"]
