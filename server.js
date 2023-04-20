const express = require('express');
const connectDb = require('./config/db');
const app=express();


//connect DB by just calling it
connectDb();
app.use(express.json({encoded: false})); 
app.get('/',function(req,res){
    res.send("API Running")
})
app.use('/api/users',require('./routes/api/user'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
const PORT=process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));