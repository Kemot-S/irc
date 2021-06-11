
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;
var longpoll = require("express-longpoll")(app);

longpoll.create("/poll");
longpoll.publish("/poll", 'resData')
app.use(express.static('static'))
// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/static/index.html'));
});


app.post('/byczeq', (req, res)=>{
    req.on('data', data => {
      let resData = JSON.parse(data)
      console.log(resData)
      res.end(JSON.stringify(resData))
      longpoll.publish("/poll", resData);
    })
    // console.log(req.body)

})



app.listen(port);
console.log('Server started at http://localhost:' + port);