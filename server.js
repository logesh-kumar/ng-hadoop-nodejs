var express = require('express');
var mongojs = require('mongojs');
var d3 = require('d3');
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override');

var db = mongojs('migration', ['hadoop_s3_mig']);
var app = express();
var router = express.Router();


app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

router.get('/test', (req, res) => {
        res.json({ message: "Hello" });
});

router.get('/home', function (req, res) {
        console.log("I received a GET request in / dir");
        db.hadoop_s3_mig.find(function (err, docs) {

                var filtered_data = docs.filter(function (el) { return el.status == 'N'; });
                var occurences = d3.nest()
                        .key(function (d) { return d.platformName; })
                        .rollup(function (leaves) { return leaves.length; })
                        .entries(filtered_data);

                console.log(filtered_data);
                console.log(occurences);
                res.json([filtered_data, occurences]);

        });
});

//ad api prefix
app.use('/api', router);

//set static path to serve sttic files 
app.use(express.static(__dirname + '/public'));

//set script path to include scripts from node_modules
app.use('/scripts', express.static(__dirname + '/node_modules/'));

var portNumber = 3002;
app.listen(portNumber, () => {
        console.log("listening on : " + portNumber);
});