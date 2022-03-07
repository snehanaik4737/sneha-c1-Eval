const express = require("express");
const app= express();



app.use(logger);

app.get("/books", function(req,res){
    res.send({route:"/books"})
})


app.get("/libraries", checkPermission("librarian"),function(req,res){
    res.send({route: "/libraries", permission:req.permission})
})

app.get("/authors",checkPermission("author"),function(req,res){
    res.send({ route: "/authors", permission:req.permission})
})

app.listen(4000,()=>{
    console.log("Listening on port 4000");
})

 function logger(req,res,next){
     console.log(req.path);
     next();
 }

  function checkPermission(roles){
      return function logger1(req,res,next){
          if(roles=="librarian" && req.path=="/libraries"){
           //  next();
            req.permission =true;
            next();
            
          }
          else if(roles=="author" && req.path =="/authors"){
             // console.log(req.path);
             req.permission=true;
               next();
            
          }
      }
  }