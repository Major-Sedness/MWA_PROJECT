const mongoose = require("mongoose")
mongoose.connect("mongodb://0.0.0.0:27017/MWA",{
    // useCreateIndex:true,
    // useNewUrlParser:true,
    // useUnifiedTopology:true
}).then(() =>{
    console.log("Connection Successful");
}).catch((error) => {
    console.log(error);
})