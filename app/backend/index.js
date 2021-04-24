const express = require('express');

const {historialRouter,
        loginRouter,
        userRouter,
        odonRouter} = require('./app/backend/routes');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
        swaggerDefinition: {
                swagger:"2.0",
                info: {
                        "title":"Consultapp Documentation",
                        "description":"",
                        "version":"1.0.0",
                        "servers": ["http://localhost:3000"]    
                }  
        },
        apis: ['index.js', 'app/backend/routes/login_route.js']
}
const swaggerDoc = swaggerJsDoc();
/*MIDDLEWARES*/
app.use(express.json());
app.use(cors());
//app.use(express.static(__dirname+'/public'));

/*ROUTES*/
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/historial_route', historialRouter);
app.use('/user_route', userRouter);
app.use('/login_route', loginRouter);
app.use('/odon_route', odonRouter);

app.get('/', (req, res) => {
        res.end('Api works!');
});

app.listen(port, ()=>console.log("running..."));