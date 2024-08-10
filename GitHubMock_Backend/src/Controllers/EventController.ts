import { Router } from "express";
import { webhooks_Events } from "..";
import  axios  from "axios";

export const EventsController=Router();
EventsController.post("/webhook",(req,res)=>{
    try{
    const{webhook_url,secret,events}=req.body
    events.forEach((element:string) => {
      // console.log("elem",element);
       if(element=='Commit')
       {
        webhooks_Events["Commit"].push({url:webhook_url,secret})
       }
       else if(element=='Push')
        {
         webhooks_Events["Push"].push({url:webhook_url,secret})
        }
        else
        {
        webhooks_Events["Merge"].push({url:webhook_url,secret})
        }
        
        
    });
   // console.log("events",webhooks_Events);
    res.sendStatus(201);
    }
    catch(e){
        res.sendStatus(500);
    }
})

EventsController.post('/emulate',(req,res)=>{
    const {key,data}=req.body;
    try{
    switch(key)
    { 
        case "Commit":
        //    console.log(webhooks_Events["Commit"]);
            webhooks_Events["Commit"].map((item)=>{
                const {url,secret}=item;
                // console.log("url",url);
                // console.log("secret",secret); 
               axios.post(url,{data:data}, 
                {
                    headers: { 
                        'Content-Type': 'application/json', // Ensure the content type is correct
                        'x-secret': secret // Your custom header
                    }
                }
                
               ).then(()=>{
            //    console.log("successfully sent ");
                
               }).catch((err)=>{
                console.error(err)
               })
                
            })
            break;
        case "Merge":
         //   console.log(webhooks_Events["Merge"]);
            webhooks_Events["Merge"].map((item)=>{
                const {url,secret}=item;
                // console.log("url",url);
                // console.log("secret",secret);
                axios.post(url,{data:"Merge Requests"},
                    {
                        headers: {
                            'Content-Type': 'application/json', // Ensure the content type is correct
                            'x-secret': secret // Your custom header
                        }
                    }
                ).then(()=>{
                    console.log("successfully sent ");
                    
                   }).catch((err)=>{
                    console.error(err)
                   })
                       
            });

            break;
        case "Push":
           // console.log(webhooks_Events["Push"]);
            webhooks_Events["Push"].map((item)=>{
                const {url,secret}=item;
                // console.log("url",url);
                // console.log("secret",secret);
                let data:string="testing data";
                axios.post(url,{data:"Push"},
                    {
                        headers: {
                            'Content-Type': 'application/json', // Ensure the content type is correct
                            'x-secret': secret // Your custom header
                        }
                    }
                )
                .then(()=>{
                    console.log("successfully sent ");
                     
                   }).catch((err)=>{
                    console.log("error")
                   })
            })
            break;
            
    }
    
    res.sendStatus(200);
}
catch(err)
{
    res.sendStatus(500);
}
    
})

EventsController.get("/db",(req,res)=>{
    res.json(webhooks_Events);
})
