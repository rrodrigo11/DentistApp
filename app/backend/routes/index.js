const historialRouter = require('./historial_route');
const loginRouter = require('./login_route');
const odonRouter = require('./odon_route');
const userRouter= require('./user_route');
const pacienteRouter = require('./paciente_route');
const connectedRouter = require('./connected_route');
const googleRouter = require('./loginGoogle_route');

module.exports = {
    historialRouter,
    loginRouter,
    odonRouter,
    userRouter,
    pacienteRouter,
    connectedRouter,
    googleRouter
}