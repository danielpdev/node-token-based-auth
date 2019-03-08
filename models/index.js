const mongoose = require("mongoose");

mongoose.connect("mongodb://daniel:pass@localhost:27017/auth_token",{ useNewUrlParser: true }, (err, db) =>{
  
  if (err) {
      console.log("Couldn't connect to database");
    } else{
      console.log(`Connected To Database`);
    }
});


module.exports = {
  user: require("./user")
}