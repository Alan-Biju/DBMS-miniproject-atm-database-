const express=require('express');
const router = express.Router();
const { sqlconnection } = require('../database/mysql');



router.get('/pin-change',(req,res)=>{
    res.render('pin-change',{account:req.cookies.account,message:req.flash('error')});
});

router.post('/pin-change',(req, res)=>{
    var new_pin=req.body.new_pin;
    var renew_pin=req.body.renew_pin;
    if(new_pin==renew_pin){
        sqlconnection.query(`UPDATE card SET pin = ${renew_pin} WHERE account_no = ${req.cookies.account}`,(error,results)=>{
            if(!error){
                sqlconnection.query(`UPDATE details SET pin = ${renew_pin} WHERE account_id = ${req.cookies.account}`,(error,results)=>{
            if(error){
                console.log(error);
            }else{
                req.flash("error","Updated")
                res.redirect('/pin-change');
            }
                });
            }
        else{
            req.flash("error","Invaild Password");
            res.redirect('/pin-change');

        }
        });
    }
    else{
        req.flash("error","Do not Match ");
        res.redirect('/pin-change');

    }
    
});






module.exports = router;