const express = require('express');
const router = express.Router();
const { sqlconnection } = require('../database/mysql');





router.get('/account',(req, res)=>{
    var details_account='SELECT * FROM details WHERE account_id='+req.cookies.account+';';
    sqlconnection.query(details_account, (error,results)=>{
        if(error){
            console.log("somthing worng in details table "+error);
            res.redirect('/dashboard');
        }
        else{
            res.render('account',{name:results[0].name,account:results[0].account_id,password:results[0].pin,email:results[0].email,address:results[0].address});
          }
    });
    
});









module.exports = router;