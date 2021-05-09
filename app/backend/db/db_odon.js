const mongoose = require('./db_connect');

let odonSchema = mongoose.Schema({
    historial_clinico_id: {
        type: String,
        // type: mongoose.Schema.Types.ObjectId, ref: 'db_historial',

    },
    descripcion_general: {
        type: String
    },
    dientes: [{
        idDiente: {type: Number},
        descripcion: {type: String}
    }]
});

odonSchema.statics.showOdon = async () => {
    try {
        let resp = await odon.find();
        return resp;
    } catch (e) {
        console.log(e);
    }
}

odonSchema.statics.showOdonById = async (ID) => {
    try {
        let resp = await odon.find({historial_clinico_id: ID});
        return resp;
    } catch (e) {
        console.log(e);
    }
}

odonSchema.statics.saveOdon = async (newOd) => {
    let od = odon(newOd);
    let doc;
    try {
        doc = await od.save();
        console.log(doc);
    } catch (e) {
        console.log("Ocurrio un error: ", e);
    }
    return doc;
}

odonSchema.statics.deleteOdon = async (ID) => {
    let deletedOd;
    try {
        deletedOd = await odon.findOneAndDelete({id: ""+ID});
        console.log(deletedOd);
    } catch (e) {
        console.log("Ocurrio un error: ", e);
    }
    return deletedOd;
}

odonSchema.statics.getOdonById = async (ID) =>{
    let od;
    try{
        console.log( "Id mandado a getOdonById " + ID);
        od = await odon.findOne({_id: ""+ID})
        console.log(od);
    }catch(err){
        console.log("Ocurrio un error: ", e);
    }
    return od;
}

odonSchema.methods.actualizarOdon = async function (data){
    return odon.findOneAndUpdate(
        {_id: this._id},
        {$set:data},
        {new: true,
         useFindAndModify: false
        }
    )
}


const odon = mongoose.model('db_odon', odonSchema);
 
module.exports = odon;