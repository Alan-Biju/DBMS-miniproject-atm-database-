
const express = require('express');
const { sqlconnection } = require('../database/mysql');
const router = express.Router();

router.get('/', function (req, res) {
  res.clearCookie('account');
  res.clearCookie('name');
  res.clearCookie('balance');
  res.render('login', { message: req.flash('error') });
});

router.post('/', function (req, res) {
  var account = req.body.account_no;
  var pin = req.body.pin;
  if (account == '' || pin == '') {
    console.log('empty');
    req.flash('error', 'Account NO or Password fields are empty');
    res.redirect('/');
  }
  //----------------------------------------------------------
  else {
    console.log('not empty');
    var loginquery =
      'SELECT * FROM card WHERE account_no=' +
      account +
      ' and pin=' +
      pin +
      ';';
    sqlconnection.query(loginquery, (err, results, fileds) => {
      if (err || results.length == 0) {
        console.log('no data got returned from database ' + err);
        req.flash(
          'error',
          'Account NO or Password is Invaild plz try again !!'
        );
        res.redirect('/');
        
      } else {
        console.log(results);
        sqlconnection.query(
          'SELECT name FROM details WHERE account_id=' + account + ';',
          (error, results, fields) => {
            if (error) {
              console.log('login error' + error);
            } else {
              sqlconnection.query('SELECT * FROM balance WHERE account_no='+account+';',(error,results)=>{
                if(!error){
                 res.cookie('balance',results[0].balance);
                 res.redirect('/dashboard');
                }
                else{
                  console.log('error in balance table');
                }
              });
             
           
             res.cookie('account', account);
             res.cookie('name', results[0].name);
             
            }
          }
        );
      }
    });
  }
});

module.exports = router;







