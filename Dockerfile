FROM node:20-alpine

ENV NODE_ENV=production
WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev && npm cache clean --force

COPY . .

RUN addgroup -S nodegrp && adduser -S nodeusr -G nodegrp \
    && chown -R nodeusr:nodegrp /app

USER nodeusr

EXPOSE 3400

CMD ["npm", "start"]