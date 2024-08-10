import express from 'express'
import cors from "cors"
import {EventsController} from "./Controllers/EventController"
const app=express();
interface RegisterWebhook{
    url:string,
    secret:string|null
}
interface WebHookEvents{
    Commit:RegisterWebhook[],
    Push:RegisterWebhook[],
    Merge:RegisterWebhook[] 
}
export const webhooks_Events:WebHookEvents={
    Commit:[],
    Push:[],
    Merge:[]
}
app.use(express.json())
app.use(cors())
app.use("/api",EventsController)
app.listen(3000,()=>{
    console.log("im listening in port 3000");
}) 