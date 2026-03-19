# ── Stage 1: Install production dependencies ──
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# sharp needs platform-specific binaries on Alpine
RUN npm ci --omit=dev

# ── Stage 2: Runtime ──
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 4001

CMD ["node", "index.js"]
