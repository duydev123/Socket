// server.js
const express = require('express');
const cors = require('cors');
const session = require('express-session');

const app = express();
const port = 3000;

// Middleware
app.use(cors({
    origin: ['http://localhost:5500','http://127.0.0.1:5500','https://socket-ca4z.onrender.com'], // frontend URL
    credentials: true // cho phép gửi cookie
}));
app.use(express.static('public'));
app.use(express.json());
app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: false
}));

// Dummy user database
const users = [
    { username: 'admin', password: '123' },
    { username: 'test', password: '456' }
];

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log("Login attempt:", username, password);

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        req.session.user = username;
        res.json({ success: true, message: "Login successful" });
    } else {
        res.json({ success: false, message: "Invalid username or password" });
    }
});

// Register route
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    console.log("Register attempt:", username, password);

    const userExists = users.find(u => u.username === username);

    if (userExists) {
        res.json({ success: false, message: "Username already exists" });
    } else {
        users.push({ username, password });
        res.json({ success: true, message: "Registration successful" });
    }
});

// Protected route example
app.get('/download', (req, res) => {
    if (req.session.user) {
        res.send(`Hello ${req.session.user}, this is your protected content.`);
    } else {
        res.status(401).send('Unauthorized: Please login first.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
