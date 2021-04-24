const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /:
 *  post:
 *      description: get all users and create new users
 *      parameters:
 *          - in: query
 *              name: search
 *              description: search query param
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: success call to the endpoint
 */

router.route('/')
    .get(async(req, res)=>{
        res.end('users endpoint.');
    })
    .post(async(req, res)=>{
        res.statusCode = 200;
        console.log('Ocurrio una peticion');
        res.end('create users endpoint.');
    })

/**
 * @swagger
 * /:
 *  post:
 *      description: delete and modify users
 *      parameters:
 *          - in: query
 *              name: delete and modify
 *              description: delete and modify users with user's email
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: success call to the endpoint
 */
router.route('/:email')
    .delete(async(req, res) => {
        res.statusCode = 200;
        console.log('Ocurrio una peticion');
        res.end('delete users endpoint.');
    })
    .put(async(req, res)=>{
        res.statusCode = 200;
        console.log('Ocurrio una peticion');
        res.end('modify users endpoint.');
    })

module.exports = router;