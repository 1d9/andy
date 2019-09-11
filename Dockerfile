FROM node:12 as builder
LABEL maintainer="Luke Kaalim (luke@kaal.im)"
LABEL project="1d9"

WORKDIR /home/andy
COPY package.json package-lock.json ./
RUN npm ci install
COPY . ./
RUN make
CMD [ "npm", "run" ]

FROM node:12-alpine

WORKDIR /home/andy/build
COPY --from=builder /home/andy/build .

EXPOSE 8080
ENTRYPOINT [ "node", "server" ]