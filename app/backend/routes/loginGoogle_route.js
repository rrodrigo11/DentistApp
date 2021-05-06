const router = require("express").Router();
const {OAuth2Client} = require('google-auth-library');
const users = require("../db/db_users");

const googleClient = new OAuth2Client(process.env.Google_client);

router.route('/')
    .post(async function (req, res){
       googleClient.verifyIdToken({
           idToken:req.body.idToken
       }).then(googleResponse=>{
            const responseData = googleResponse.getPayload();
            console.log('Response payload:' , responseData);
            const email = responseData.email;
            users.getUserByEmail(email)
            .then(response=>{
                if(response){
                    console.log('Ya existe usuario', response);
                    if(!response.googleId){
                        console.log('Does not have google ID');
                        
                    }
                }else{
                    console.log('Crear usuario y la respuesta');
                    let body = {
                        name: responseData.name,
                        email: responseData.email,
                        googleId: responseData.sub,
                        picture: responseData.picture
                    };
                    console.log(body);
                    users.saveUsers(body).then(response=>{
                        console.log('Se creo usuario', response);
                        //Aqui se deberia crear token
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