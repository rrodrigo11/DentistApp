const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
var cors = require('cors');
const bodyParser = require('body-parser');


const {
        historialRouter,
        loginRouter, 
        odonRouter,
        userRouter,
        pacienteRouter,
        connectedRouter,
        googleRouter
} = require ('./app/backend/routes');
const { authToken } = require('./app/backend/middlewares/auth');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
//const swaggerJsDoc = require('swagger-jsdoc');
//const swaggerUI = require('swagger-ui-express');

/*const swaggerOptions = {
        swaggerDefinition: {
                swagger:"2.0",
                info: {
                        "title":"Consultapp Documentation",
                        "description":"",
                        "version":"1.0.0",
                        "servers": ["http://localhost:3000"]    
                }  
        },
        apis: ['index.js', './app/backend/routes/login_route.js']
}*/
//const swaggerDoc = swaggerJsDoc();
//se pone primero evitando que en esta ruta se requiera la autenticacion
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
});
app.use('/google_route', googleRouter);
app.use('/login_route', loginRouter);

/*MIDDLEWARES*/

// app.use('/', authToken);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser());
app.use(cors());
//app.use(express.static(__dirname+'/public'));

/*ROUTES*/
//app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/historial_route', historialRouter);
app.use('/user_route', userRouter);
app.use('/paciente_route', pacienteRouter);
app.use('/odon_route', odonRouter);
app.use('/connected_route', connectedRouter);

app.get('/', (req, res) => {
        res.end('Api works!');
});
app.listen(port, ()=>console.log("running..."));