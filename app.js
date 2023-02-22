let express = require('express');
const fs = require("fs");

let app = express();

app.set('view engine', 'ejs');
app.use('/', express.static(__dirname + "/assets"));

let fileContent ="";


//& Weather //
fileContent = fs.readFileSync("./data/weatherForecast.json");
let weatherForecas = JSON.parse(fileContent)
let temperatureNoonJS = weatherForecas.hourly.temperature_2m;
 let now = new (Date);
 let nowHour= now.getHours();
 let nowTemperature=temperatureNoonJS[nowHour];


fileContent = fs.readFileSync("./data/concert.json");
let concertArray = JSON.parse(fileContent);

fileContent = fs.readFileSync("./data/musiqueLeMonde.json");
let newsMusicJSON= JSON.parse(fileContent);
let newsMusics = newsMusicJSON.rss.channel[0].item;


//& Air quality //
fileContent = fs.readFileSync("./data/airQuality.json");
let airQuality = JSON.parse(fileContent)
let airQualityNoon = airQuality.hourly.pm10;
let air = new (Date);
let airHour= air.getHours();
let nowair=airQualityNoon[airHour];


fileContent = fs.readFileSync("./data/airQuality.json");
let airUnity = JSON.parse(fileContent)
let airQualityUnity = airUnity.hourly_units.pm10;


//& Float Rates //
fileContent = fs.readFileSync("./data/FloatRates.json");
let FloatRatesUs = JSON.parse(fileContent);

fileContent = fs.readFileSync("./data/iRail.json");
let iRailArray = JSON.parse(fileContent);
let iRailArrayJ= iRailArray.departures.departure;

//& Horoscope //
fileContent = fs.readFileSync("./data/horoscope.json");
let horoscopeJs = JSON.parse(fileContent);

//& Listening port 8000 //
app.listen(8000, function () {
    console.log('Listening on port 8000');

});

//& Requests //
app.get('/', function (request, response) {

    let datatoEJS={temperatureNoonIndex:nowTemperature,
                   airQualityI:nowair,
                   airUnityI:airQualityUnity,
                   FloatRatesI:FloatRatesUs,
                   concerts: concertArray,
                   iRail:iRailArrayJ,
                   items: newsMusics,
                   horoscopes: horoscopeJs
                }

    response.setHeader('Content-Type', "text/html;charset=utf8");
    response.render('index.ejs', datatoEJS);
});


