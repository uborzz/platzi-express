
# Curso de express de platzi


## Notes

### Lanzar express app con templates pug
```
express --view=pug nombre-app
```

### Proyecto a manota
``` 
npm init -y
npm i -S express
```
* deps de desarrollo con -D

### Using pug
install
```
npm i -S pug
```

### Handlebars como template engine
install
```
npm i -S consolidate
```

use sample
```javascript
const engines = require('consolidate');

app.engine('hbs', engines.handlebars)

app.set('views', './views')
app.set('view engine', 'hbs')
```

### parse body
middleware para procesar cuerpos en formato json
```
npm i -S body-parser
```

### Sentry
    https://docs.sentry.io/error-reporting/quickstart/?platform=node

errorsHandlers.js
```javascript
const Sentry = require("@sentry/node");

Sentry.init({dsn: `${config.sentryDsn}`});
```

function logErrors
```javascript
// utils/middlewares/errorsHandlers.js

function logErrors(err, req, res, next) {
  Sentry.captureException(err);
  console.error(err.stack);
  next(err);
}
```

### middlewares populares
* express.json o body-parser.json: requests-Json
* cors: cross origin
* morgan: logs
* helmet: opciones de seguridad, buena docu.
* express-debug: debugger por defecto de express
* express-slash: Permite aceptar urls sin el slash final
* passport: Autenticación y autorización
