const express = require('express');
const router = express.Router();
const { sqlconnection } = require('../database/mysql');



router.get('/transactions',(req, res)=>{
    
    sqlconnection.query(`SELECT * FROM withdrawal WHERE account_no=${req.cookies.account} UNION SELECT * FROM deposit WHERE account_no=${req.cookies.account} `,(error,results,fields)=>{
        if(error){
            console.log("somthing worng with deposite or withdrawal"+error);
        }
        else{
            res.render('transactions',{results:results});
        }
    });
});













module.exports = router;