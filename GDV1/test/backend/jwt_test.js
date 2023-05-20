const jwt = require('jsonwebtoken');

const secret = 'aY42ce6RbJf_7E9pqv8WjF_X3sHsDfTk2uLQZMwYgNtMk5oVrP'; // Replace this with your JWT_SECRET value
const payload = { id: 1 };

const token = jwt.sign(payload, secret, { expiresIn: '24h' });

console.log('Generated token:', token);

const decoded = jwt.verify(token, secret);

console.log('Decoded payload:', decoded);
