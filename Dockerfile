FROM node:4.3.1

COPY package.json package.json  
RUN npm install

# Add your source files
COPY . .  
CMD ["npm","start"] 
