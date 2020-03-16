require('dotenv').config();
const app = require('./server');
require('./database');

console.log(process.env.TESTING)

require('./config/passport');


//Server is listennig
app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
});