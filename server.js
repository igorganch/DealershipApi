const express = require("express");
const path = require("path");
const service = require("./Service.js");
var app = express();


var HTTP_port = process.env.PORT || 8080;

function onStart(){

    console.log("Listening on port " + HTTP_port);

}

app.use(express.urlencoded({
    extended: true
  }))

app.get("/", function(req, res){


    res.sendFile(path.join(__dirname,'./index.html'));

})

app.get("/searchCars", function(req,res){

    res.sendFile(path.join(__dirname,'./search.html'));


})

app.post("/searchResults", function(req,res){

service.searchCar(req.body.make).then(function(data){
    var carData;
  
    for (let i = 0 ; i < data.length; i++){
         var string = (data[i].year).toString() + " " + (data[i].make).toString() + " " + (data[i].model).toString();
         carData += "<h1><a href = '/car/" + data[i].id.toString() +"'>" + string +  "</a></h1>" +
                    "<h3>" + ("Price: $" + data[i].price).toString() + "</h3>" +
                    "<p>" + ("Kilometres: " + data[i].kilometres).toString() + "</p>" 
  
  
         ;
     } 
  
       res.send(carData );
      }).catch(function(){
  
  
  
      });


});


app.get("/cars", function(req, res){

    service.getAllCars().then(function(data){

   
     var carData = '';
  
    
    
  for (let i = 0 ; i < data.length; i++){
       var string = (data[i].year).toString() + " " + (data[i].make).toString() + " " + (data[i].model).toString();
       carData += "<h1><a href = '/car/" + data[i].id.toString() +"'>" + string +  "</a></h1>" +
                  "<h3>" + ("Price: $" + data[i].price).toString() + "</h3>" +
                  "<p>" + ("Kilometres: " + data[i].kilometres).toString() + "</p>" 


       ;
   } 

     res.send(carData );
    }).catch(function(){



    })


});


app.get("/addCar", function(req,res){
   
   
   var formdata = "<form action='/addCar' method = 'post'>" +
   "<label for='make'>Make</label> <input type='text' id='make' value = '' name='make'><br><br>" +
    "<label for='model'>Model</label> <input type='text' id='model' value = '' name='model'><br><br>" + 
      "<label for='year'>Year</label> <input type='text' id='year' value = '' name='year'><br><br>" +  
      "<div>   <input type='radio' id='automatic' name='transmission' value='Automatic' checked> <label for='automatic'>Automatic</label>" +
      "<input type='radio' id='manual' name='transmission' value='Manual'> <label for='manual'>Manual</label> </div>" +
      "<label for='kilometres'>Kilometres</label> <input type='text' id='kilometres' value = '' name='kilometres'><br><br>" + 
      "<label for='description'>Description</label> <input type='text' id='description' value = '' name='description'><br><br>" + 
      "<label for='price'>Price</label> <input type='text' id='price' value = '' name='price'><br><br>" + 
      "<input type='submit' value='Submit'> </form>"

      res.send(formdata);
});

app.post("/addCar", function(req,res){
service.addCar(req.body).then(function(){

res.redirect("/cars");

}).then(function(){
res.status(404);
})


});


app.all("/car/delete/:id", function(req,res){

    console.log("Inside deletye");
service.deleteCar(req.params.id).then(function(){

res.redirect("/cars");


}).catch(function(){

    console.log("Error while deleting")
});
});





app.get('/delete/car', function(req,res){


    service.getAllCars().then(function(data){

   
        var carData = '';
     
       
       
     for (let i = 0 ; i < data.length; i++){
          var string = (data[i].year).toString() + " " + (data[i].make).toString() + " " + (data[i].model).toString();
          carData += "<h1><a href = '/car/delete/" + data[i].id.toString() +"'>" + string +  "</a></h1>" +
                     "<h3>" + ("Price: $" + data[i].price).toString() + "</h3>" +
                     "<p>" + ("Kilometres: " + data[i].kilometres).toString() + "</p>" 
   
   
          ;
      } 
   
        res.send(carData );
       }).catch(function(){
   
   
   
       })




})


app.get("/car/:id", function(req,res){
    console.log(req.params.id);
service.getCar(req.params.id).then(function(data){
    var string = (data[0].year).toString() + " " + (data[0].make).toString() + " " + (data[0].model).toString();
   var carData = "<h1><a href = '/car/" + data[0].id.toString() +"'>" + string +  "</a></h1>" +
               "<h3>" + ("Price: $" + data[0].price).toString() + "</h3>" +
               "<p>" + ("Description: " + data[0].description).toString() + "</p>" +
               "<p>" + ("Transmission: " + data[0].transmission).toString() + "</p>" +
               "<p>" + ("Kilometres: " + data[0].kilometres).toString() + "</p>" +
               "<p>" + ("Posted at: " + data[0].createdAt).toString() + "</p>"+ 
               "<a href='/car/formpost/"+(data[0].id).toString() + "'> <input type = 'button' value = 'update' /> </a>" +
               "<form action='/car/delete/" + (data[0].id).toString() + "' method = 'post'>  <input type = 'submit' value = 'delete' /> </form>"

    ;
    res.send(carData);
}).catch(function(){
 console.log( "Something went wrong")
});});



app.get("/car/formpost/:id", function(req,res){
    service.getCar(req.params.id).then(function(data){
        var string = (data[0].year).toString() + " " + (data[0].make).toString() + " " + (data[0].model).toString();
        var radioTrans ='';
        console.log(data[0].transmission);
        
        if((data[0].transmission.toString()).localeCompare('Automatic') == 0){

            radioTrans =  "<div>   <input type='radio' id='automatic' name='transmission' value='Automatic' checked> <label for='automatic'>Automatic</label>" +
            "<input type='radio' id='manual' name='transmission' value='Manual'> <label for='manual'>Manual</label> </div>"

      }else{
      radioTrans=  "<div>   <input type='radio' id='automatic' name='transmission' value='Automatic'> <label for='automatic'>Automatic</label>" +
        "<input type='radio' id='manual' name='transmission' value='Manual' checked> <label for='manual'>Manual</label> </div>"

      }
      
      
        var formData = "<form action='/car/post/" + (data[0].id).toString() + "' method = 'post'>"+
        "<h1>" + string +  "</h1>" +
      "<label for='make'>Make</label> <input type='text' id='make' value = '" + data[0].make + "' name='make'><br><br>" +
      "<label for='model'>Model</label> <input type='text' id='model' value = '" + data[0].model + "' name='model'><br><br>" + 
        "<label for='year'>Year</label> <input type='text' id='year' value = '" + data[0].year + "' name='year'><br><br>" +  
        radioTrans + 
        "<label for='kilometres'>Kilometres</label> <input type='text' id='kilometres' value = '" + data[0].kilometres + "' name='kilometres'><br><br>" + 
        "<label for='description'>Description</label> <input type='text' id='description' value = '" + data[0].description + "' name='description'><br><br>" + 
        "<label for='price'>Price</label> <input type='text' id='price' value = '" + data[0].price + "' name='price'><br><br>" + 
        "<input type='submit' value='Submit'> </form>"
        
        res.send(formData);
    })


});





app.post("/car/post/:id", function(req,res){

service.updateCar(req.params.id,req.body).then(function(){
        res.redirect("/cars");
}).catch(function(){

    res.sendStatus(404);
})
});


app.listen(HTTP_port, onStart);
