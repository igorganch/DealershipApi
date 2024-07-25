const Sequelize = require('sequelize');


var sequelize = new Sequelize('d8vkkvt02ir4ti', 'sfxwyrcpnydbsc', 'f02f4369add1a6404db4cc54b1e94a83d62aeb315f6331d8eca87c578ff5f4cd', {
    host: 'ec2-52-1-26-88.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    }
   });


sequelize.authenticate().then(function(){

console.log("Connection succesful to postgre");

}).catch(function(){
console.log("Error connection to postgre");

});

var car = sequelize.define('Car', {
        make : Sequelize.STRING,
        model : Sequelize.STRING,
        year : Sequelize.STRING,
        transmission : Sequelize.STRING,
        kilometres : Sequelize.INTEGER,
        description : Sequelize.TEXT,
        price : Sequelize.DOUBLE,
});

sequelize.sync().then(function(){
    /*

car.create({
make : 'Mercedes-Benz',
model : 'C63 AMG',
year : '2012',
transmission : 'Automatic',
kilometres : 123459,
description : '6.2L/451-hp/443-lb-ft DOHC 32-valve V-8',
price : 31000
});

car.create({
    make : 'BMW',
    model : 'M3',
    year : '2011',
    transmission : 'Manual',
    kilometres : 134123,
    description : '414-hp 4.0-liter V-8 engine ',
    price : 25595
    });

    car.create({
        make : 'Audi',
        model : 'S4',
        year : '2010',
        transmission : 'Manual',
        kilometres : 174163,
        description : '414-hp 4.0-liter V-8 engine ',
        price : 25595
        });

*/
})

module.exports.getAllCars = function(){
return new Promise(function(resolve,reject){

    car.findAll().then(function(data){


        resolve(data);
    }).catch(function(err){

        console.log(err);
        reject();
    });
});
}



module.exports.searchCar = function(make1){
  
    return new Promise(function(resolve,reject){
      car.findAll({
  
          where :{
  
              make : make1
          }
      }).then(function(data){
          console.log("Here");
          resolve(data);
  
  
      }).catch(function(err){
  
  
          console.log(err);
          reject();
      });
  });
  }

module.exports.getCar = function(id1){
  
  return new Promise(function(resolve,reject){
    car.findAll({

        where :{

            id : id1
        }
    }).then(function(data){
        console.log("Here");
        resolve(data);


    }).catch(function(err){


        console.log(err);
        reject();
    });
});
}

module.exports.addCar = function(data){
return new Promise(function(resolve,reject){
car.create(data).then(function(){

    console.log("Car has been added to do the database");

    resolve();
}).catch(function(err){
    console.log(err);
    reject();
})
});
}

module.exports.updateCar = function(id1,data){
return new Promise(function(resolve,reject){
car.update(data, {
    where :{
        id : id1
    }
}).then(function(){
console.log("Succesfull update");
resolve();
}).catch(function(err){
    console.log(err);
    reject();
});





});




}

module.exports.deleteCar = function(id1){
    return new Promise(function(resolve,reject){
        car.destroy({
            where : {
                id : id1
            }
        }).then(function(){
            console.log("Car succesfully deleted")
            resolve();

        }).catch(function(err){
            console.log("Failed to delete");
            reject();
        })
    })
}


module.exports.deleteAllCars = function() {
    return new Promise(function(resolve, reject) {
      car.destroy({
        where: {}, // No condition means delete all rows
        truncate: true // Truncate the table for performance
      }).then(function() {
        console.log("All cars successfully deleted");
        car.create({
            make : 'Mercedes-Benz',
            model : 'C63 AMG',
            year : '2012',
            transmission : 'Automatic',
            kilometres : 123459,
            description : '6.2L/451-hp/443-lb-ft DOHC 32-valve V-8',
            price : 31000
            }).then(function(){
                car.create({
                    make : 'BMW',
                    model : 'M3',
                    year : '2011',
                    transmission : 'Manual',
                    kilometres : 134123,
                    description : '414-hp 4.0-liter V-8 engine ',
                    price : 25595
                    }).then(function(){
                        car.create({
                            make : 'Audi',
                            model : 'S4',
                            year : '2010',
                            transmission : 'Manual',
                            kilometres : 174163,
                            description : '414-hp 4.0-liter V-8 engine ',
                            price : 25595
                            }).then(function(){

                                resolve();
                            })
                    })
            })
                
     
      }).catch(function(err) {
        console.log("Failed to delete all cars", err);
        reject(err);
      });
    });
  };














