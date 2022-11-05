const express = require('express')
const app = express()
const port = 5000

const config = require('./config/key');

const { User } = require("./model/User");

// application/x-ww-form-urlencoded
app.use(express.json());

// application/json
app.use(express.urlencoded({extended:true}));

const mongoose = require('mongoose');
const { urlencoded } = require('express');
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) =>{

  // 회원 가입할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body)

  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err })
      return res.status(200).json({
        success: true
      })
  })
})





app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
 })

