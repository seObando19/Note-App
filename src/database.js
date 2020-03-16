const mongoose = require("mongoose");

const {NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE} = process.env;
//const MONGODB_URI=`mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;

const MONGODB_URI='mongodb+srv://seobando:13104043@cluster0-ftrso.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
  .then(db =>console.log('Database is connected'))
  .catch(err => console.error(err));

