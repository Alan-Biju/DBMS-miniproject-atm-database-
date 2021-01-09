const express = require('express');
const router = express();
const { sqlconnection } = require('../database/mysql');

//-------------------------------
function taskDate2(dateMilli) {
    var d = (new Date(dateMilli) + '').split(' ');
    d[2] = d[2] + ',';
  
    return [d[0], d[1], d[2], d[3]].join(' ');
  }
  
  const dates=taskDate2(new Date());



const d = new Date();
const localTime = d.getTime();
const localOffset = d.getTimezoneOffset() * 60000;
const utc = localTime + localOffset;
const offset = 5.5;  
const bombay = utc + (3600000*offset);
const nd = new Date(bombay);

  const time = nd.toLocaleTimeString() ; 



//------------------------------

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
                if(results.length>0){
                 var balance = Number(results[0].balance);
                    const rec_balance=eval(balance+amount);
                   sqlconnection.query(`UPDATE balance SET balance =${rec_balance} WHERE account_no =${account}`,(error,results)=>{
                       if(!error){
                            sqlconnection.query(`INSERT INTO deposit(account_no,type,amount,date,time) VALUES(${account},'Received',${amount},"${dates}","${time}")`,(error,results)=>{
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
                                
                                sqlconnection.query(`INSERT INTO withdrawal(account_no,type,amount,date,time) VALUES(${req.cookies.account},'Transferred',${Number(amount)},"${dates}","${time}")`,(error,results)=>{
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
