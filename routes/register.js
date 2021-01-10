const express = require('express');
const { sqlconnection } = require('../database/mysql');
const router = express.Router();
const {time,date,today}=require('../routes/time');





router.get('/register',function (req, res){
    res.render("register",{message:req.flash('error')});
});


router.post('/register',function (req, res){
  const { name,address,email,account,password,re_password,phone,dob}=req.body;
 
  if (name==''||address == ''||email == ''||account == ''||password == ''||re_password == ''||phone == ''|| dob == ''){
      console.log("resgiter form is empty");
      req.flash('error','plz complete the form !!');
      res.redirect('/register');
  }
  else
  {
    if(password!=re_password){
        req.flash('error','Passwords Do Not Match ');
        res.redirect('/register');

    }
    else{
    var card=  'INSERT INTO card(account_no,pin,CVV,exp) VALUES(?,?,?,?)';
    var details='INSERT INTO details(name,account_id,pin,address,email,phone,birth) VALUES (?,?,?,?,?,?,?)';
     sqlconnection.query(card,[account,password,Math.floor(Math.random()*(999-100+1)+100),today],(error,results,fileds)=>{
        if(!error){
            console.log("card inserted");
            sqlconnection.query(details,[name,account,password,address,email,phone,dob],(error,results,fields)=>{
                if (!error){
                    console.log("data enterd ok");
                    sqlconnection.query('INSERT INTO balance(account_no,pin_no) VALUES (?,?)',[account,password],(error,results,fields)=>{
                        if(!error){
                            console.log("balance set 0 for new user");
                            res.redirect('/');
                        }
                        else{
                            console.log("somthing worng in resgister"+error);
                        }
                    });
                    
                }
                else{
                    console.log("somthing is worng in table details"+results);
                }
            });
        }
        else{
            req.flash('error','User Alreday Exists');
            res.redirect('/register');
        }

     });
}
}
});








module.exports = router;
