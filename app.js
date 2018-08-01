const express = require('express');
const app = express();
const path = require('path');
const handles = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
/*const upload = require('express-fileupload');*/
/*const session = require('express-session');*/
/*const flash = require('connect-flash');*/
/*const passport = require('passport');*/
const {mongoDbUrl} = require('./config/database');
const PORT = 4242;

//database
mongoose.connect(mongoDbUrl).then((db)=>{
    console.log(`${mongoDbUrl} connected`);
}).catch(error=>console.log(error));

//set static & engine
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', handles({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');

//body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

//load & use routes
const home = require('./routes/home/index');
const admin = require('./routes/admin/index');
const products = require('./routes/admin/products');
app.use('/', home);
app.use('/admin', admin);
app.use('/admin/products', products);

app.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`);
});
