const express=require('express');
const router = express.Router();
const { sqlconnection } = require('../database/mysql');
const {time,date}=require('../routes/time');


router.get('/deposit',function (req, res){
    res.render('deposit',{message:req.flash('error')});
});

router.post('/deposit',function (req, res){
    var deposit_value=Number(req.body.deposit);
    var balance = Number(req.cookies.balance);
    var final_balance=eval(balance + deposit_value);
    if(deposit_value>10000){
        req.flash('error','Plz Enter within Your Daily Limit')
        res.redirect('/deposit');
    }
    else{
        sqlconnection.query(`UPDATE balance SET balance = ${final_balance} WHERE account_no = ${req.cookies.account}`,(error,results,fields)=>{
            if(error){
        console.log("somthing worng with balance table"+error);
        res.redirect('/deposit');
        }
        else{
            sqlconnection.query(`INSERT INTO deposit(account_no,amount,date,time) VALUES(?,?,?,?)`,[req.cookies.account,deposit_value,date,time],(error,results)=>{
                if(!error){
                    console.log("deposit updated");
                    res.clearCookie('balance');
                    res.cookie('balance',final_balance);
                    req.flash('error',`${deposit_value} ₹ credited  Successful `);

                  res.redirect('/deposit');
                }
                else{
                    console.log("deposit error"+error);
                }
            });
            
           
        }
        });
    }
    
});




module.exports = router;