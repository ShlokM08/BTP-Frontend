require('dotenv').config({ path: './secure.env' });
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const users = {
  'moderator@example.com': { password: 'mod123', role: 'moderator' },
  'controller@example.com': { password: 'con123', role: 'controller' },
  'admin@example.com': { password: 'admin123', role: 'systemAdmin' }
};

const jwtSecret = 'your_secret_key';  // You should store this securely.

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users[email];
  
  if (user && user.password === password) {
    const token = jwt.sign({
      email,
      role: user.role
    }, jwtSecret, { expiresIn: '1h' });
    
    res.json({ token });
  } else {
    res.status(401).send('Credentials are incorrect');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
