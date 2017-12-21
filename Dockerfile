FROM mhart/alpine-node:6.11

ADD package.json /opt/app/package.json
RUN cd /opt/app && npm install

WORKDIR /opt/app
ADD . /opt/app


EXPOSE 3000

CMD ["npm", "start"]