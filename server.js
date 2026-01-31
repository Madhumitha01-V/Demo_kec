require('dotenv').config();
const express = require('express');
const app = express();

require('./data/mongo'); 

app.use(express.json());
const jwt = require('jsonwebtoken');
app.get("/profile", (req, res) => {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(403).json({ message: 'Forbidden access' });
    }

const token = header.split(' ')[1]; 
try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: 'Access granted', user: decoded });
}
catch(err){
    res.status(401).json({ message: 'Invalid token' });
}
});

const studentRoute = require('./route/route');

app.use('/students', studentRoute);

const authRoutes = require('./route/auth_route');

app.use('/auth', authRoutes);


app.listen(5000,() => {
    console.log("Server is running on port http://localhost:5000");
}); 
