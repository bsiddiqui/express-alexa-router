# express-alexa-router

Plug [alexa-router](https://github.com/estate/alexa-router) into your express application.

### Usage

```javascript
// It's important to make sure that you're using a JSON parser since alexa-router
// needs to access the request's body
app.use('/alexa/webhook', bodyparser.json(), expressAlexaRouter(alexa))
```

### Testing

```bash
git clone https://github.com/estate/express-alexa-router && cd express-alexa-router
npm install && npm test
```
