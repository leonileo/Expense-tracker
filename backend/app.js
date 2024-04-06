const express = require('express');
const cors = require('cors');
const path = require('path')
const p = path.dirname(__filename)
const { db } = require(`${p}/db/db.js`);
const {readdirSync} = require('fs');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT

console.log(p);
// middlewares
app.use(express.json())
app.use(cors())

// routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening on port', PORT);
    })
}

server();