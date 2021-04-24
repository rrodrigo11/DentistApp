const express = require('express');
const router = express.Router();

router.post('/', async (req,res)=>{ //Ruta para agregar odontograma
    let {idOdontograma, historialClinico, dientes } = req.body;
    if(idOdontograma && historialClinico && dientes){
      let resp = await Sticker.guardarProducto({idOdontograma, historialClinico, dientes});
      if(resp){
          res.status(201).send({sticker: resp})
      }else{
          res.status(400).send({"error": "No se pudo guardar verifique su conexión"})
      }     
    }else {
      res.status(400).send({error: "Faltan datos"})
    }
    console.log(req.body.test)
  })
  
router.get('/', async (req,res)=>{ //Ruta para obtener 
  // let resp = await Odon.obtenerOdon();
  // if(resp){
  //   res.status(200).send(resp);
  // }else{
  //   res.status(404).send({error:"No existen stickers registrados"})
  // }
  console.log("Mostrando Odontograma");
})

module.exports = router