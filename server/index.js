const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const DBConnection = require('./db/db');
const router = require('./routes/router');
const app = express();

//middlewares
app.use(express.json());
app.use(cors({"Access-Control-Allow-Methods": "POST, PUT, PATCH, GET, DELETE, OPTIONS"}));
dotenv.config();

app.get("/",function(req,res){
    res.status(200).json({
        msg: "Server running fine!"
    })
})

app.use(router);


DBConnection();

const PORT = 3000;
app.listen(PORT,function(){
    console.log(`App listening on port ${PORT}`);
})