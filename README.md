# Simple REST API using express.js

This project is an example of how to create a simple REST API using express

## Running the application in docker

Prerequisites for installing in Ubuntu

- Have Docker installed

Once Docker is set up, an image needs to be built from the Dockerfile. Type in the command to the terminal:

```bash
docker build -t <your docker username>/node-web-app
```

After the whole process is done, a docker image will be made from the rest-api application written in the 'index.js' file.
To build a container out of the image, type in the following command to the terminal:

```bash
docker run -p 8080:8080 -d <your docker username>/node-web-app
```
-d runs the container in detached mode. The -p flag redirects a public port to a private port inside the container.



