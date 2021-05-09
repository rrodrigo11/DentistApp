// const jwt = require('jsonwebtoken');

// class UserController{
//     getEmailByToken(token){
//         console.log("Si llegue!");
//         return 1;
//         if(token){
//             jwt.verify(token, "Token Key", (err, decoded)=>{
//                 if(decoded){
//                     console.log(decoded.email);
//                     return decoded.email
//                 }else{
//                     if(err.name == 'TokenExpiredError'){
//                         return {error:"Your session expired."}
//                     }
//                     return {error:"Invalid token."};
//                 }
//             })
    
//         }else{
//             return ("No existe token a verificar");
//         }
//     }
// }
 

// module.exports = new UserController();