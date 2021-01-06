const express = require('express');
const router = express();
const { sqlconnection } = require('../database/mysql');



router.get('/card',(req, res)=>{
sqlconnection.query(`SELECT * FROM card WHERE account_no=${req.cookies.account} `,(error,result)=>{
if(!error){
    
 res.render('atm_card',{account:result[0].account_no,name:req.cookies.name,cvv:result[0].CVV});
}
else{
    console.log('card error');
}
   
});
   
});


module.exports = router;

