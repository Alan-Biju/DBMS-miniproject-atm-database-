const express = require('express');
const router = express.Router();
const { sqlconnection } = require('../database/mysql');

router.get('/update', (req, res) => {
  res.render('updatepage',{account:req.cookies.account});
});

router.post('/update', (req, res) => {
  const { username, dob, email, password, phone, address } = req.body;
 

  const card = `update card set pin=${password} where account_no=${req.cookies.account}`;
  const detail = `update details set pin=${password},name='${username}',address='${address}',email='${email}',birth=${dob},phone=${phone} where account_id=${req.cookies.account}`;
  sqlconnection.query(card, (error, results) => {
    if (!error) {
      res.clearCookie('name');
      res.cookie('name', username);

      sqlconnection.query(detail, (error, results) => {
        if (!error) {
            sqlconnection.query(`update balance set pin_no=${password} where account_no=${req.cookies.account}`,(error,results)=>{
                    if(!error){
                        res.redirect('/account');
                    }
                    else{
                        console.log('error' + error);
                    }
            });
          
        } else {
          console.log('error' + error);
        }
      });
    } else {
      console.log(error + 'card');
    }
  });
});

module.exports = router;
