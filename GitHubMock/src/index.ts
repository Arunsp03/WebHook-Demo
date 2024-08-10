interface WebHookFormData{
    webhook_url:string|undefined,
    secret:string|undefined,
    events:string[]|undefined
}
const submitform=():void=>{
    let url:HTMLInputElement=document.getElementById("webhook_url") as HTMLInputElement;
    let secret:HTMLInputElement=document.getElementById("secret") as HTMLInputElement;
    let eventElementsArray = Array.from(document.getElementsByClassName("events")) as HTMLInputElement[];
    let newArray:string[]=[];
    eventElementsArray.map((item)=>{
        if(item.checked)
        {
            newArray.push(item.name);
        }   
    }
    );
    let requestObj:WebHookFormData={
        webhook_url:url?.value,
        secret:secret?.value,
        events:newArray

    }
    fetch("http://localhost:3000/api/webhook",{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(requestObj)
    }).then(()=>{
        console.log("success");
        
    }).catch((err)=>{
        console.error(err)
    })
    console.log(requestObj);``
}
const handleMock=(key:string)=>{
let data={
    key,
    data:key+" initiated"
}
fetch("http://localhost:3000/api/emulate",{
    method:"POST",
    headers:{
    "Content-Type": "application/json"
    },
    body:JSON.stringify(data)
}).then(()=>{
    console.log("success");
}).catch((err)=>{
    console.error(err);
})
}