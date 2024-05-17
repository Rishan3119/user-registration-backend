const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
const PORT = 4000;
app.use(cors());
// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "saas application"
});

db.connect(err => {
    if (err) {
        console.error('Database connection error:', err);
        throw err;
    }
    console.log('Database connected successfully');
});

// Middleware
app.use(bodyParser.json());

//register
app.post('/register',(req,res)=>{
    const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql,[values], (err,data)=>{
        if(err){
            return res.send("Error");
        }
        return res.send(data);
    })
})

//login
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.send("Error");
        }
        if (data.length > 0) {
            // Send user details if login is successful
            return res.json({ success: true, user: data[0] });
        } else {
            return res.json({ success: false, message: "Failed" });
        }
    })
})



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
