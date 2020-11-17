const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routePost = require('./routes/posts');


dotenv.config();

//Connect to MongoDB
 mongoose.connect(
 process.env.DB_CONNECT,
{
  useNewUrlParser: true,
  useUnifiedTopology: true
},
()=>console.log('connected to DB!!!'));

//MiddleWare
app.use(express.json());

//Routes Middleware
app.use('/api/user', authRoutes);
app.use('/api/post', routePost)
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server running on port: ${PORT}`);
});
console.log(mongoose.connection.readyState);
