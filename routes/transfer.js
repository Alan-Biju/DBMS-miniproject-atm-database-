const express = require('express');
const router = express();
const { sqlconnection } = require('../database/mysql');



router.get('/transfer',(req, res)=>{
   res.render('transfer',{error:""});
});

router.post('/transfer',(req, res)=>{
    const account = req.body.account;
    const reaccount=req.body.re_account;
    const amount=Number(req.body.amount);
  
    if(account==reaccount && account!=Number(req.cookies.account)){
        
        if(Number(req.cookies.balance)>=amount){
            sqlconnection.query(`SELECT * FROM balance WHERE account_no=${account}`,(error,results)=>{
                if(!error){
                 var balance = Number(results[0].balance);
                    const rec_balance=eval(balance+amount);
                   sqlconnection.query(`UPDATE balance SET balance =${rec_balance} WHERE account_no =${account}`,(error,results)=>{
                       if(!error){
                            sqlconnection.query(`INSERT INTO deposit(account_no,type,amount) VALUES(${account},'Received',${amount})`,(error,results)=>{
                                if(!error){
                                    console.log("deposit enterd")
                                }
                                else{
                                    console.log("somthing went worng in deposit"+error);
                                }
                            });
                            const send_balance=eval(Number(req.cookies.balance)-amount);
                        sqlconnection.query(`UPDATE balance SET balance=${send_balance} WHERE account_no=${Number(req.cookies.account)}`,(error,results)=>{
                            if(!error){
                                
                                sqlconnection.query(`INSERT INTO withdrawal(account_no,type,amount) VALUES(${req.cookies.account},'Transferred',${Number(amount)})`,(error,results)=>{
                                    if(!error){
                                        res.clearCookie('balance');
                                      
                                        res.cookie('balance',send_balance);
                                        res.redirect('/dashboard');
                                        
                                    }
                                    else{
                                        console.log("somthing went worng in deposit"+error);
                                    }
                                });
                               
                            }
                            else{
                                res.render('transfer',{error:"Server is Down"}); 
                    

                            }
                        });

                       }
                       else{
                    res.render('transfer',{error:"Server is Down"}); 
                    
                       }
                   });
                     
                    
                }
                else{
                    res.render('transfer',{error:"Recipient does not Exits"}); 
                }
            });
    
        }
        else{
            res.render('transfer',{error:'Insufficient Balance'});
        }



    }
    else{
        res.render('transfer',{error:"account no does not match"});
    }
});


module.exports = router;
