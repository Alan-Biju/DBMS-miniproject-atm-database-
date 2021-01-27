const express=require('express');
const router = express.Router();
const { sqlconnection } = require('../database/mysql');
const {time,date}=require('../routes/time');

//----------------------------------------------------------------

//-----------------------------------------
router.get('/withdrawl',function(req, res){
    res.render('withdrawl',{message:req.flash('error')});
});

router.post('/withdrawl',function (req,res){
    var balance_withdrawl=Number(req.body.withdrawl);
    var main_balance=Number(req.cookies.balance);
    var final_balance=main_balance-balance_withdrawl;
if(main_balance==0||final_balance<0){
    req.flash('error','Insufficient Balance');
    res.redirect('/withdrawl');
}
else{
 
sqlconnection.query(`UPDATE balance SET balance = ${final_balance} WHERE account_no = ${req.cookies.account}`,(error,results)=>{
    if(error){
        console.log("somthing worng with balance table"+error);
        res.redirect('/dashboard');
    }
    else{
        sqlconnection.query(`INSERT INTO withdrawal(account_no,amount,date,time) VALUES(?,?,?,?)`,[req.cookies.account,balance_withdrawl,date,time],(error,results)=>{
            if(!error){
                console.log("withdrawal updated");
                res.clearCookie('balance');
                res.cookie('balance',final_balance);
                req.flash('error',`${balance_withdrawl} ₹ debited  Successful `);
                res.redirect('/withdrawl');
            }
            else{
                console.log("withdrawal error"+error);
            }
        });
      
    }
});
}
});







module.exports = router;
