const router = require("express").Router();
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '776524041115-1ocj7eqsokjnm0li3lskh2sq5sd2nihq.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

router.route('/')
    .post(async (req, res)=>{
        let token = req.body.token;
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
          }
          verify()
          .then(()=>{
            res.cookie("token", token).send('success');
          }).
          catch(console.error);
})

router.route('/logout')
    .get(async (req, res)=>{
        res.clearCookie("token");
        res.redirect('/');
})

module.exports = router