FROM node:16
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci 

ENV DEBUG=todo-express-backend:*

ENV PORT=3002
  
USER node

CMD npm run dev