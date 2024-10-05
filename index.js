const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

//Middleware
app.use(bodyParser.json());
app.use(cors());



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
    console.log('Connected to database');
});



app.get("/", (req, res) => {
    res.send("Hello Worlds");
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

app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});