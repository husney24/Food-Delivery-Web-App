const express=require("express");
const mongoose = require('mongoose');
const router = require('./Router/index');
const cors = require('cors');

const app = express();
const port=process.env.PORT;
const hostname="0.0.0.0";
const dburl = process.env.URI;

app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  next();
});
app.use(cors());
app.use(express.json());
app.use('/',router);
mongoose.connect(dburl,{ useNewUrlParser: true, useUnifiedTopology: true }).then(res=>{

    app.listen(port,hostname,() =>{
        console.log(`servr is running at ${hostname}:${port} `)
    });

})
.catch(err=>console.log(err));
