const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', userRoutes);

app.use((req, res)=>{
  let err = new Error();
  return res.status(500).json({
    status: "error",
    error: 'route not found or wrong request method'
  })
});

const port = 5000;
app.listen(port, console.log(`server started on port ${port}`))
module.exports = app;