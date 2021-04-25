const mongoose = require('./db_connect');

let historialSchema = mongoose.Schema({
    dentista_id: {
        type: Number,
        required: true
    },
    paciente_id: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    motivo_de_consulta: {
        type: String,
        required: false
    },
    enfermedad_actual: {
        type: String,
        required: false
    },
    estudios: [{
        nombre_de_estudio: {
            type: String
        },
        fecha: {
            type: Date
        },
        detalle: {
            type: String
        }
        // ,
        // imagen: {
        //     type: Image
        // }
        // ,
        // archivo:{
        //     type: File
        // }
    }],
    checkbox: [{
        antecedentes: {
            type: Boolean,
            default: false
        },
        alergias: {
            type: Boolean,
            default: false
        },
        cardiopatias: {
            type: Boolean,
            default: false
        },
        diabetes: {
            type: Boolean,
            default: false
        },
        embarazo: {
            type: Boolean,
            default: false
        },
        hepatitis: {
            type: Boolean,
            default: false
        },
        vih: {
            type: Boolean,
            default: false
        },
        inmunosupresion: {
            type: Boolean,
            default: false
        },
        trastornos: {
            type: Boolean,
            default: false
        },
        epilepsia: {
            type: Boolean,
            default: false
        },
        enfermedades_orales: {
            type: Boolean,
            default: false
        },
        otras_alteraciones: {
            type: Boolean,
            default: false
        },
        fuma_o_consumeAlcohol: {
            type: Boolean,
            default: false
        }
    }],
    Observaciones: {
        type: String,
        required: false
    }
});

historialSchema.statics.showHistorial = async () => {
    try {
        let resp = await historial.find();
        return resp;
    } catch (e) {
        console.log(e);
    }
}

historialSchema.statics.saveHistorial = async (newHst) => {
    let hash = bcryptjs.hashSync(newHst.password, 8);
    newHst.password = hash;
    let hst = historial(newHst);
    let doc;
    try {
        doc = await hst.save();
        console.log(doc);
    } catch (e) {
        console.log("Ocurrio un error: ", e);
    }
    return doc;
}

historialSchema.statics.deleteUsers = async (correo) => {
    let deletedHst;
    try {
        deletedHst = await historial.findOneAndDelete({email: ""+correo});
        console.log(deletedHst);
    } catch (e) {
        console.log("Ocurrio un error: ", e);
    }
    return deletedUsr;
}

historialSchema.statics.getHistorialByEmail = async (correo) =>{
    let hst;
    try{
        console.log( "Correo mandado a getHistorialByEmail " + correo);
        hst = await historial.findOne({email: ""+correo})
        console.log(hst);
    }catch(err){
        console.log("Ocurrio un error: ", e);
    }
    return hst;
}

// historialSchema.methods.actualizarHistorial = async function (datos){
//     let hash = bcryptjs.hashSync(datos.password, 8);
//     datos.password = hash;
//     return historial.findOneAndUpdate(
//         {_id: this._id},
//         {$set:datos},
//         {new: true,
//          useFindAndModify: false
//         } 
//     )
// }

const historial = mongoose.model('db_historial', historialSchema);
 
module.exports = historial;