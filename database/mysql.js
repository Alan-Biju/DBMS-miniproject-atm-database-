const mysql=require('mysql');
const sqlconnection=mysql.createConnection({
    host:'remotemysql.com',
    user: 'UH2iJYAUWV',
    password:'qmzavjrcuL',
    database:'UH2iJYAUWV',
    port:3306
    
});


var database=sqlconnection.connect(function(error){
    if(!error){
        console.log("data base connected");
        sqlconnection.query('SELECT * FROM card',function(error,results,fileds){
            if(!error){
                console.log(results);
            }
            else{
                console.log('somthing worng with the database ');
            }
        });
    }
    else{
        console.log("not connected"+error);
    }
});


module.exports={database,sqlconnection};




