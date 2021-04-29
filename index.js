const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

const historialRouter = require('./app/backend/routes/historial_route');
const loginRouter = require('./app/backend/routes/login_route');
const odonRouter = require('./app/backend/routes/odon_route');
const userRouter = require('./app/backend/routes/user_route');
const pacienteRouter = require('./app/backend/routes/paciente_route');
const connectedRouter = require('./app/backend/routes/connected_route');
const googleRouter = require('./app/backend/routes/loginGoogle_route');

//const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
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
/*MIDDLEWARES*/
app.use(express.json());
app.use(cookieParser());
//app.use(cors());
//app.use(express.static(__dirname+'/public'));

/*ROUTES*/
//app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/historial_route', historialRouter);
app.use('/user_route', userRouter);
app.use('/paciente_route', pacienteRouter);
app.use('/login_route', loginRouter);
app.use('/odon_route', odonRouter);
app.use('/connected_route', connectedRouter);
app.use('/loginGoogle_route', googleRouter);


app.get('/', (req, res) => {
        res.end('Api works!');
});

app.listen(port, ()=>console.log("running..."));