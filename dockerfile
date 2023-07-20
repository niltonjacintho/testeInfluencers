FROM node:18.17-alpine

WORKDIR /home/app

# RUN npm install yarn -g

ENV NODE_ENV=production

COPY backend/package.json ./home
COPY backend/tsconfig.json ./home

COPY backend/package.json .
COPY backend/tsconfig.json .

RUN yarn install --ignore-scripts --frozen-lockfile --non-interactive

COPY backend/src ./

RUN yarn build

EXPOSE 8000

CMD ["yarn", "start"]