let express = require('express');
//let path = require('path');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let dbconf = require('./db/config');
let createError = require('http-errors');

const port = 7171;

//mongoose.Promise = global.Promise; //outdated, only for mongoose 4 and below
//connect to db
mongoose.connect(dbconf.db, {useNewUrlParser: true}).then(()=>{
    console.log('Successfully connected to the database!');
    },
    error => {
        console.log('Failed to connect: ' + error);
    }
)

//express
const lobbyRoute = require('./routes/route-map');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors()); // only if the app is meant to respond from other domains
//app.use(express.static(path.join(__dirname, 'dist/app')));
//app.use('/', express.static(path.join(__dirname, 'dist/app')));

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
//     next();
// });

app.use('/api', lobbyRoute);

//Open the necessary ports

app.listen(port, () => {
    console.log('Connected to port ' + port);
});
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
//     next();
// });
app.use((req,res,next)=>{
    next(createError(404));
})

//error
app.use(function(err,req,res,next) {
    console.error(err.message);
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
  });  
