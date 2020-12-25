const express = require('express');
const router = express();


router.get('/card',(req, res)=>{
    res.render('atm_card',{account:req.cookies.account,name:req.cookies.name});
});


module.exports = router;
