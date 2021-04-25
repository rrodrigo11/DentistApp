const mongoose = require('./db_connect');
const bcryptjs = require('bcryptjs');
const { profileEnd } = require('console');
const { Collection } = require('mongoose');

let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    pacientes: {
        type: Array
    }
});

userSchema.statics.showUsers = async () => {
    try {
        let resp = await users.find();
        return resp;
    } catch (e) {
        console.log(e);
    }
}

userSchema.statics.saveUsers = async (newUsr) => {
    let hash = bcryptjs.hashSync(newUsr.password, 8);
    newUsr.password = hash;
    let usr = users(newUsr);
    let doc;
    try {
        doc = await usr.save();
        console.log(doc);
    } catch (e) {
        console.log("Ocurrio un error: ", e);
    }
    return doc;
}

userSchema.statics.deleteUsers = async (correo) => {
    let deletedUsr;
    try {
        deletedUsr = await users.findOneAndDelete({email: ""+correo});
        console.log(deletedUsr);
    } catch (e) {
        console.log("Ocurrio un error: ", e);
    }
    return deletedUsr;
}

userSchema.statics.getUserByEmail = async (correo) =>{
    let usuario;
    try{
        console.log( "Correo mandado a getUserByEmail " + correo);
        usuario = await users.findOne({email: ""+correo})
        console.log(usuario);
    }catch(err){
        console.log("Ocurrio un error: ", e);
    }
    return usuario;
}
userSchema.methods.actualizarUsuario = async function (datos){
    let hash = bcryptjs.hashSync(datos.password, 8);
    datos.password = hash;
    return users.findOneAndUpdate(
        {_id: this._id},
        {$set:datos},
        {new: true,
         useFindAndModify: false
        } 
    )
}

const users = mongoose.model('db_users', userSchema);
 
module.exports = users;