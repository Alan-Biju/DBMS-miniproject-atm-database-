const express = require('express');
const router = express.Router();




router.get('/dashboard',function (req, res){
    res.render("dashboard",{name:req.cookies.name || 'plz login',balance:req.cookies.balance||"NA"});
});













module.exports = router;