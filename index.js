const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const { process } = require('ipaddr.js');


const app = express();
const port = 5000;

//Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

//Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'messages'})

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to the database');
});



app.get("/", (req, res) => {
    ;
})

//create a new message
app.post('/message', (req, res)=> {
    const {name, email, message} = req.body;
    const query = `INSERT INTO message (name, email, message) VALUES ('${name}', '${email}', '${message}')`;

    db.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.send('Message created');
    });
})

app.listen(port, '0.0.0.0', () => {
    console.log("Server is running on port " + port);
});