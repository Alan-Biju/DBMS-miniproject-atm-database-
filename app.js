//require---------------------------------------------------
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
////---------------------------------------------------------

//router require----------------------------------------------------------
const loginrouter = require('./routes/login');
const dashboardrouter = require('./routes/dashboard');
const registerrouter = require('./routes/register');
const accountrouter = require('./routes/account');
const withdrawlrouter = require('./routes/withdrawl');
const depositrouter = require('./routes/deposit');
const transactionsrouter = require('./routes/transactions');
const pinchangerouter = require('./routes/pinchange');
const atm_cardrouter = require('./routes/atm_card');
const contactrouter = require('./routes/contact_us')
const transferrouter = require('./routes/transfer');
////---------------------------------------------------------
const app = express();
app.use(cookieParser());

////------------------------------------------------------

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
///------------------------------------------------------
/////----------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));

///------------------------------------------------------

////veiw engine---------------------------------------------
app.use(express.static(path.join(__dirname, './views')));
app.set('view engine', 'ejs');
///---------------------------------------------------------

///session//flash--------------------------------------
app.use(flash());
app.use(
  session({
    secret: 'alan-biju',
    resave: true,
    saveUninitialized: true,
  })
);

////-----------------------------------------------------

///MYsql-----------------------------------------------------
const { database, sqlconnection } = require('./database/mysql.js');
console.log(database);
///-----------------------------------------------------------

////routes------------------------------------------------
app.use('/', loginrouter);
app.use('/', dashboardrouter);
app.use('/', registerrouter);
app.use('/', accountrouter);
app.use('/', withdrawlrouter);
app.use('/', depositrouter);
app.use('/', transactionsrouter);
app.use('/', pinchangerouter);
app.use('/',atm_cardrouter );
app.use('/',contactrouter );
app.use('/',transferrouter );


/////error 404 -------------------------------------------------
app.use((req,res)=>{
  res.render("404");
});
///port-----------------------------
var port = process.env.PORT || 3000;
app.listen(port, function (err) {
  if (!err) {
    console.log(`port in running in ${port}`);
  }
});
//---------------------------------------
