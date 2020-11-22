const express = require('express');
const { sqlconnection } = require('../database/mysql');
const router = express.Router();



router.get('/register',function (req, res){
    res.render("register",{message:req.flash('error')});
});


router.post('/register',function (req, res){
  const { name,address,email,account,password,re_password}=req.body;
 
  if (name==''||address == ''||email == ''||account == ''||password == ''||re_password == ''){
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
    var card=  'INSERT INTO card(account_no,pin) VALUES(?,?)';
    var details='INSERT INTO details(name,account_id,pin,address,email) VALUES (?,?,?,?,?)';
     sqlconnection.query(card,[account,password],(error,results,fileds)=>{
        if(!error){
            console.log("card inserted");
            sqlconnection.query(details,[name,account,password,address,email],(error,results,fields)=>{
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