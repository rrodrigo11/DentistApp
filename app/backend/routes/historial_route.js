const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /:
 *  post:
 *      description: get all records
 *      parameters:
 *          - in: query
 *              name: search
 *              description: search all records
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: success call to the endpoint
 */
router.route('/')
    .get(async(req, res)=>{
        res.end('records endpoint.');
    })

/**
 * @swagger
 * /:
 *  post:
 *      description: get, delete and create records
 *      parameters:
 *          - in: query
 *              name: search, delete and create
 *              description: search, delete and create records with user's email
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: success call to the endpoint
 */
router.route('/:email')
    .get(async(req, res) => {
        res.statusCode = 200;
        console.log('Ocurrio una peticion');
        res.end('records endpoint.');
    })
    .delete(async(req, res) => {
        res.statusCode = 200;
        console.log('Ocurrio una peticion');
        res.end('delete records endpoint.');
    })
    .post(async(req, res)=>{
        res.statusCode = 200;
        console.log('Ocurrio una peticion');
        res.end('create records endpoint.');
    })

/**
 * @swagger
 * /:
 *  post:
 *      description: get, delete and modify a record
 *      parameters:
 *          - in: query
 *              name: search, delete and modify
 *              description: search, delete and modify a specific record
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: success call to the endpoint
 */
router.route('/:email/:id')
    .get(async(req, res) => {
        res.statusCode = 200;
        console.log('Ocurrio una peticion');
        res.end('record endpoint.');
    })
    .delete(async(req, res) => {
        res.statusCode = 200;
        console.log('Ocurrio una peticion');
        res.end('delete record endpoint.');
    })
    .put(async(req, res)=>{
        res.statusCode = 200;
        console.log('Ocurrio una peticion');
        res.end('modify record endpoint.');
    })

module.exports = router;