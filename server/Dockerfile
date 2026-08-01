# Multi-stage Dockerfile for ClubPlanet OrgOS Backend API Server
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate

FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/src ./src
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package*.json ./

EXPOSE 5000
CMD ["node", "src/server.js"]
