// Import express
let express = require('express');
const cron = require('node-cron');
// Import Body parser
let bodyParser = require('body-parser');
var request = require('request');
// Menginisialisasi app
let app = express();

var server = require('http').Server(app)

// Enable CORS
const cors = require('cors')
// End CORS

// === Import routes pada direktori 'routes/api-routes.js' ===
let apiRoutes = require("./routes");
// === Konfigurasi 'body-parser' untuk menangani POST requests ===
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());
// === Cron job ===
cron.schedule('* * * * *', function () {
    console.log('running a task every minute');

    var clientServerOptions = {
        uri: 'http://localhost:8888/api/check_pending',
        method: 'GET'

    }
    request(clientServerOptions, function (error, response) {
        console.log(error, response.body);
        return;
    });


});
// === Setup server port ===
var port = process.env.PORT || 8888;

app.use('/api/', apiRoutes);

// === Menjalankan aplikasi dengan port yang sudah ditentukan ===
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});


module.exports = {
    server: server,
};