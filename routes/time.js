function taskDate(dateMilli) {
    var d = (new Date(dateMilli) + '').split(' ');
    d[2] = d[2] + ',';
  
    return [d[0], d[1], d[2], d[3]].join(' ');
  }
  
  const date=taskDate(new Date());
const time=new Date().toLocaleTimeString();



var today = new Date();

var mm = String(today.getMonth() +Math.round(Math.random()*12) ).padStart(2, '0');
var yyyy = today.getFullYear()+(Math.round(Math.random()*5));

today = mm + '/' + yyyy;



module.exports ={time,date,today}