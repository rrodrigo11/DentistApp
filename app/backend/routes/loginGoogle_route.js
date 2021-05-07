const router = require("express").Router();
const {OAuth2Client} = require('google-auth-library');
const users = require("../db/db_users");
const authGoogle = require("../middlewares/authGoogle");


const googleClient = new OAuth2Client(process.env.Google_client);

router.route('/')
    .post(async function (req, res){
       let token;
       googleClient.verifyIdToken({
           idToken:req.body.idToken
       }).then(googleResponse=>{
            const responseData = googleResponse.getPayload();
            //console.log('Response payload:' , responseData);
            const email = responseData.email;
            users.getUserByEmail(email)
            .then(response=>{
                if(response){
                    if(!response.googleId){
                        console.log('Does not have google ID');
                    }else{
                        token = authGoogle.createtoken({
                            email: response.email,
                        })
                        console.log("Se creo token",token);
                        res.status(200);
                        res.send({token : token}); 
                    }
                }else{
                    let body = {
                        name: responseData.name,
                        email: responseData.email,
                        googleId: responseData.sub,
                        image: responseData.picture
                    };
                    users.saveUsersGoogle(body).then(response=>{
                        token = authGoogle.createtoken({
                            email: response.email,
                        })
                        console.log("Se registro usuario Google y se creo token",token);
                        res.status(200);
                        res.send({token : token}); 
                    }).catch(err=>{
                        console.log("No se pudo registrar", err);
                    });
                      
                }
                 
            }).catch(err=>{
                res.status(400).send();
            });  
       }).catch(err=>{
           console.log('Error:', err);
           res.status(400).send();
       });
    })

router.route('/logout')
    .get(async (req, res)=>{
        res.clearCookie("token");
        res.redirect('/');
})

module.exports = router