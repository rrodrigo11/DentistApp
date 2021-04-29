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
    estudios: {
        nombre_de_estudio: {
            type: String
        },
        fecha: {
            type: Date
        },
        detalle: {
            type: String
        },
        imagen: {
            data: Buffer,
            contentType: String
        },
        archivo:{
            data: Buffer,
            contentType: String
        }
    },
    historial_clinico: {
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
    },
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

historialSchema.statics.deleteHistorial = async (ID) => {
    let deletedHst;
    try {
        deletedHst = await historial.findOneAndDelete({id: ""+ID});
        console.log(deletedHst);
    } catch (e) {
        console.log("Ocurrio un error: ", e);
    }
    return deletedHst;
}

historialSchema.statics.getHistorialById = async (ID) =>{
    let hst;
    try{
        console.log( "Id mandado a getHistorialById " + ID);
        hst = await historial.findOne({id: ""+ID})
        console.log(hst);
    }catch(err){
        console.log("Ocurrio un error: ", e);
    }
    return hst;
}

const historial = mongoose.model('db_historial', historialSchema);
 
module.exports = historial;