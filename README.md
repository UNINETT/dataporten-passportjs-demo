# Dataporten and Node.js using OpenID Connect


A demo of using the OpenID Connect passportjs strategy with Dataporten.

To run:

```
npm install
npm start
```

Or with Docker

```
docker-compose up --build  demo
```

Remember to configure your client in `etc/config.json` with a trusted client, or using environment variables such as:

```
dataporten__client_secret=fb2de219-28ee-45ed-ba92-75d105b23951
```
