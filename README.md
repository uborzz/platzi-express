
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