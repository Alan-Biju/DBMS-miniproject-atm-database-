const express = require('express');
const router = express();
const { sqlconnection } = require('../database/mysql');



router.get('/feedback',(req, res)=>{
    res.render('contact_us');
});

router.post('/feedback', (req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const phone=req.body.phone;
    const message=req.body.message;
    const query=`INSERT INTO feedback(account_id,name,email,phone,message) VALUES(${req.cookies.account},'${name}','${email}',${phone},'${message}');`;
    sqlconnection.query(query,(error,results)=>{
        if(!error){
            console.log("enterd")
            res.redirect('/dashboard')
        }
        else{
            console.log(error);
            res.redirect('/dashboard')

           
        }
    });

});

module.exports = router;
