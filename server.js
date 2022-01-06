const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const Token = require('./Token');

const app = express();

app.use(express.json());
app.use(cookieParser());

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass@123',
    port: '3306',
    database: 'nodesql',
});

conn.connect((err) => {
    if (err) throw err;
    console.log('Connected To DB');
})

app.post('/register', async (req, res) => {
    const { name, email, phone, password, education } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);
    const token = Token(email);

    var sql1 = `INSERT INTO users (name, phone, password, email) VALUES ('${name}', '${phone}', '${hashed_password}', '${email}' )`;
    conn.query(sql1, (err, result) => {
        if (err) throw err;
        console.log('Inserted ' + result);
    })

    var sql2 = `INSERT INTO users_education (id, education) VALUES ((SELECT id from users where email='${email}'), '${education}' )`;

    conn.query(sql2, (err, result) => {
        if (err) throw err;
        console.log('Inserted ' + result);
    })
    const options = { expires: new Date(Date.now() + 120000), httpOnly: true }
    res.cookie('token', token, options).json({ message: 'success', token });
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const options = { expires: new Date(Date.now() + 120000), httpOnly: true }
    const token = Token(email);
    const sql1 = `SELECT * from users where email = '${email}'`;
    conn.query(sql1, async (err, result) => {
        if (err) throw err;
        else {
            const pass = result[0]["password"];
            const check = await bcrypt.compare(password, pass);
            if (!check) {
                res.json({ message: 'Wrong password' })
            }
            else {
                res.cookie('token', token, options).json({ token });
            }
        }
    })
});


app.post('/profile/user_id', async (req, res) => {
    const { token } = req.body;

    try {
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        const email = decoded.email;

        var sql2 = `select name, email, phone, education from users inner join users_education on users.id = users_education.id where email='${email}'`;

        conn.query(sql2, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.json({ result });
        })

    } catch (e) {
        if (e.name == "TokenExpiredError") {
            res.json({ message: 'Token Already Expired' })
        }
        else {
            res.json({ message: e.message });
        }
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Connected To Port ${process.env.PORT}`);
})