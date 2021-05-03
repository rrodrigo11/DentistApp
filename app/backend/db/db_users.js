const mongoose = require('./db_connect');
const bcryptjs = require('bcryptjs');
const { profileEnd } = require('console');
const { Collection } = require('mongoose');
const patients = require('./db_pacientes');

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
    pacientes: [{
        idPaciente: {type: mongoose.Schema.Types.ObjectId, ref: 'db_pacientes'},
        paciente: {type:  mongoose.Schema.Types.String, ref: 'db_pacientes'}
    }]
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
    let usr;
    try{
        console.log( "Correo mandado a getUserByEmail " + correo);
        usr = await users.findOne({email: ""+correo})
        console.log(usr);
    }catch(err){
        console.log("Ocurrio un error: ", e);
    }
    return usr;
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

userSchema.methods.savePacientes = async function (idPtt){
    let pttName = await patients.findOne({_id: idPtt});
    let ptt = {idPaciente: idPtt, paciente: pttName.name};
    return users.findOneAndUpdate(
        {_id:this._id},
        {$push: {pacientes: ptt}},
        {new:true,
        useFindAndModify: false}
    )
}

userSchema.methods.actualizarPacientes = async function (idPtt, pttName){
    let ptt = {idPaciente: idPtt, paciente: pttName.name};
    return users.findOneAndUpdate(
        {_id:this._id, "pacientes.idPaciente": idPtt},
        {$set:
            {
                "pacientes.$.paciente": pttName
            }
        },
        {useFindAndModify: false}
    )
}

userSchema.methods.deletePacientes = async function (idPtt){
    let pttName = await patients.findOne({_id: idPtt});
    let ptt = {idPaciente: idPtt, paciente: pttName.name};
    return users.findOneAndUpdate(
        {_id:this._id},
        {$pull: {pacientes: ptt}},
        {new:true,
        useFindAndModify: false}
    )
}

const users = mongoose.model('db_users', userSchema);
 
module.exports = users;