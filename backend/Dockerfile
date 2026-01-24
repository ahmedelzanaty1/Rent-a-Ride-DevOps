FROM node:18-alpine AS build
WORKDIR /app


COPY backend/package*.json ./

RUN npm install --no-audit --no-fund

COPY backend ..

EXPOSE 5000
CMD ["npm", "start"]