import express, { Request,Response,NextFunction } from "express";
import cors from "cors"
const app=express();
const messages:any[]=[];
const AuthMiddleWare=(req:Request,res:Response,next:NextFunction)=>{
    const secretHeader:string[]|string|undefined=req.headers['x-secret'];
   // console.log("secret header",secretHeader);
    if(secretHeader!="test")
    {
       return res.sendStatus(400);
    }
    next(); 
}
app.use(cors());
app.use(express.json());


app.post("/webhooklistener",AuthMiddleWare,(req,res)=>{
    try{
    const{data}=req.body
  //  console.log("data in client app",req.body);
    //console.log(req.headers);
    
    messages.push(data);
    res.sendStatus(200); 
    }
    catch(ex)
    {
        res.json(ex)
    }
})
app.get("/",(req,res)=>{
    res.send(messages);
}) 
app.listen(3001,()=>{
    console.log("client app listening on 3001");
    
}) 