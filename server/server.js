import express from "express";

let app = express();
const port = 3000;

app.get('/', (req,res)=>{
    res.status(200).send({"message": "API  now is running"});
});

app.listen(port, ()=>{
    console.log("server is running on port", port)
});