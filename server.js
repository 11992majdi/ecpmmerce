//-------iport express-----//
const express= require("express")
//-------creation instance----//
const app=express()
//--------middelware json--------//
app.use(express.json())
//--------import dotenv--------//
require("dotenv").config()
//-----------cnnection dbs--------//
const db=require("./config/connectdb")
db()
//-------- creation route global ------//
app.use("/api/user",require("./routes/userRouter"))
app.use("/api/admin",require("./routes/adminrouter"))
// ----------- Public Images -----------//
// app.use('./client/public/upload/',express.static('upload'));
//------------creation port------------//
const port=process.env.PORT
//-----------creation server---------//
app.listen(port,(err)=>
err? console.log(err):console.log(`the srver is runing on ${port}`)
);