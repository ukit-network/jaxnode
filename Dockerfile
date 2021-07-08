FROM mhart/alpine-node:14.17.3

RUN npm install -g yarn

RUN mkdir /src

COPY package.json /src
WORKDIR /src
RUN yarn

# Add your source files
COPY . /src  
CMD ["npm","start"]