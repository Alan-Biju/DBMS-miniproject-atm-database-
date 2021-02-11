const express = require('express');
const router = express.Router();
const { sqlconnection } = require('../database/mysql');

router.get('/update', (req, res) => {
  var details_account =
    'SELECT * FROM details WHERE account_id=' + req.cookies.account + ';';
  sqlconnection.query(details_account, (error, results) => {
    if (error) {
      console.log('somthing worng in details table ' + error);
      res.redirect('/dashboard');
    } else {
      res.render('updatepage', {
        name: results[0].name,
        password: results[0].pin,
        email: results[0].email,
        address: results[0].address,
        phone: results[0].phone,
        Dob: results[0].birth,
        account: req.cookies.account,
      });
    }
  });
});

router.post('/update', (req, res) => {
  const { username, dob, email, password, phone, address } = req.body;

  const card = `update card set pin=${password} where account_no=${req.cookies.account}`;
  const detail = `update details set pin=${password},name='${username}',address='${address}',email='${email}',birth='${dob}',phone=${phone} where account_id=${req.cookies.account}`;
  sqlconnection.query(card, (error, results) => {
    if (!error) {
      res.clearCookie('name');
      res.cookie('name', username);

      sqlconnection.query(detail, (error, results) => {
        if (!error) {
          sqlconnection.query(
            `update balance set pin_no=${password} where account_no=${req.cookies.account}`,
            (error, results) => {
              if (!error) {
                res.redirect('/account');
              } else {
                console.log('error' + error);
              }
            }
          );
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
