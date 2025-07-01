const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Dummy users (database giả)
const users = [
    { username: 'admin', password: '123' },
    { username: 'test', password: '456' }
];

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: "Invalid username or password" });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
