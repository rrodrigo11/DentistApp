const mongoose = require('./db_connect');
const bcryptjs = require('bcryptjs');

let pacienteSchema = mongoose.Schema({
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
        type: String
    },
    phone: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    idDentista: {
        type: mongoose.Schema.Types.ObjectId, ref: 'db_users'
    },
    address: {
        type: String
    },
    weight: {
        type: String
    },
    height: {
        type: String
    },
    historial: [{
        idHistorial: {type: mongoose.Schema.Types.ObjectId, ref: 'db_historial'},
    }]
});

pacienteSchema.statics.showPacientes = async () => {
    try {
        let resp = await pacientes.find();
        return resp;
    } catch (e) {
        console.log(e);
    }
}

pacienteSchema.statics.showPacientesById = async (ID) => {
    try {
        let resp = await pacientes.find({idDentista: ID});
        return resp;
    } catch (e) {
        console.log(e);
    }
}

pacienteSchema.statics.savePacientes = async (newPtt) => {
    let hash = bcryptjs.hashSync(newPtt.password, 8);
    newPtt.password = hash;
    let ptt = pacientes(newPtt);
    let doc;
    try {
        doc = await ptt.save();
        console.log(doc);
    } catch (e) {
        console.log("Ocurrio un error: ", e);
    }
    return doc;
}

pacienteSchema.statics.deletePaciente = async (correo) => {
    let deletedPtt;
    try {
        deletedPtt = await pacientes.findOneAndDelete({email: ""+correo});
        console.log(deletedPtt);
    } catch (e) {
        console.log("Ocurrio un error: ", e);
    }
    return deletedPtt;
}

pacienteSchema.statics.getPacienteByEmail = async (correo) =>{
    let paciente;
    try{
        console.log( "Correo mandado a getPacienteByEmail " + correo);
        paciente = await pacientes.findOne({email: ""+correo})
        console.log(paciente);
    }catch(err){
        console.log("Ocurrio un error: ", e);
    }
    return paciente;
}
pacienteSchema.methods.actualizarPaciente = async function (datos){
    let hash = bcryptjs.hashSync(datos.password, 8);
    datos.password = hash;
    return pacientes.findOneAndUpdate(
        {_id: this._id},
        {$set:datos},
        {new: true,
         useFindAndModify: false
        } 
    )
}

const pacientes = mongoose.model('db_pacientes', pacienteSchema);
 
module.exports = pacientes;