FROM node:4.4.0

COPY package.json package.json  
RUN npm install

# Add your source files
COPY . .  
CMD ["npm","start"] 