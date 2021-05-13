const express=require('express');
const bodyparser=require('body-parser')
const request=require('request');
const { post } = require('request');

const app=express(); 

app.use(bodyparser.urlencoded({extended: true}));

app.use(express.static(__dirname));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    var data={
        members:[
            {
                email_address: req.body.email,
                status: "subscribed",
                merge_fields:{
                    FNAME: req.body.fn,
                    LNAME: req.body.ln
                }
            }
        ]            
    };
    var jsondata=JSON.stringify(data);
    var obj={
        url:"https://us1.api.mailchimp.com/3.0/lists/##list_id##",
        method:"POST",
        headers:{
            authorization: "arpit3 ##your own API key##"
        },
        body:jsondata
    }
    request(obj,function(err,response,body){
        if(err || response.statusCode!=200){
            res.sendFile(__dirname+"/failure.html");
        }
        else{
            res.sendFile(__dirname+"/success.html");
        }
    })
});
app.post("/failure",function(req,res){
    res.redirect("/");
});
app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000");
});