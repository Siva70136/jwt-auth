const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
    origin: 'http://localhost:3001'
}));
app.use(bodyParser.json());


const users = [
    { id: 1, username: 'siva', password: 'siv@2024' }
];
const secretKey='a4a4513ddce73b40feaa195f0371344cf1dc15ab479cebb0ca8c06f95d3317e1'
//console.log(secretKey)

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
