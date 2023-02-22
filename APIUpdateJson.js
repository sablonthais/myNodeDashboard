const http = require('http');
const https = require('https')
const fs = require("fs");
const { sign } = require('crypto');
let parseString = require('xml2js').parseString; //on a besoin que de la methode du package


function iRailUpdate() {
    // http://api.irail.be/liveboard/?id=BE.NMBS.008892007&lang=fr&format=json

    const request = {
        "host": "api.irail.be",
        "port": 80,
        "path": "/liveboard/?id=BE.NMBS.008892007&lang=fr&format=json"
    };

    http.get(request, receiveResponseCallbackiRail);

    function receiveResponseCallbackiRail(response) {
        let rawData = "";
        response.on('data', (chunk) => { rawData += chunk; });
        response.on('end', function () {
            let iRail = JSON.parse(rawData);
            let stringToSave = JSON.stringify(iRail, null, 4);
            fs.writeFile("./data/iRail.json", stringToSave, (err) => {
                if (err) console.log(err);
                else console.log('irail.json saved');
            });
        });
    }
}

function AirQUpdate() {
    const request = {
        "host": "air-quality-api.open-meteo.com",
        "port": 443,
        "path": "/v1/air-quality?latitude=52.5235&longitude=13.4115&hourly=pm10,pm2_5"
    };

    https.get(request, receiveResponseCallbackAirQ);

    function receiveResponseCallbackAirQ(response) {
        let rawData = "";
        response.on('data', (chunk) => { rawData += chunk; });
        response.on('end', function () {
            let airQuality = JSON.parse(rawData);
            let stringToSave = JSON.stringify(airQuality, null, 4);
            fs.writeFile('./data/airQuality.json', stringToSave, function (err) {
                if (err) console.log(err);
                else console.log("File saved");
            }
            );
        });
    }
}

function WeatherUpdate() {
    let request = {
        "host": "api.open-meteo.com",
        "port": 443,
        "path": "/v1/forecast?latitude=50.85&longitude=4.35&hourly=temperature_2m"
    };

    https.get(request, receiveResponseCallbackWeather);

    function receiveResponseCallbackWeather(response) {
        let rawData = "";
        response.on('data', (chunk) => { rawData += chunk; });
        response.on('end', function () {
            let weatherForecast = JSON.parse(rawData);
            let stringToSave = JSON.stringify(weatherForecast, null, 4);
            fs.writeFile('./data/weatherForecast.json',
                stringToSave,
                function (err) {
                    if (err) console.log(err);
                    else console.log("File saved");
                }
            );
        });
    }
}

function News() {
    let request = {
        "host": "www.lemonde.fr",
        "port": 443,
        "path": "/musiques/rss_full.xml"
    };

    https.get(request, receiveResponseCallbackNews);

    function receiveResponseCallbackNews(response) {
        let rawData = "";
        console.log('Got response: ' + response.statusCode);

        response.on('data', (chunk) => {
            rawData += chunk; //chaque chunk est un morceau du contenu de la page (xml) qu'on stocke a chaque fois dans la var rawData
        });

        response.on('end', function (chunk) { // ce qu'il fait quand il a fini de mettre tous les paquets
            // console.log(rawData); 
            parseString(rawData, function (err, rssJson) { //transfo le rawData en string et on affiche le resultat 
                // console.log(`Le Monde annonce a publié ce ${rssJson.rss.channel[0].item[0].pubDate[0]}  : ${rssJson.rss.channel[0].item[0].title[0]}. ${rssJson.rss.channel[0].item[0].description[0]}`);

                let stringToSave = JSON.stringify(rssJson, null, 4);
                fs.writeFile('./data/musiqueLeMonde.json', stringToSave,
                    function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("File saved News");
                        };
                    });
            });
        });
    }


}
function FloatRateUpdate() {
    const request = {
        "host": "www.floatrates.com",
        "port": 80,
        "path": "/daily/eur.json"
    };

    http.get(request, receiveResponseCallbackFloat);

    function receiveResponseCallbackFloat(response) {
        let rawData = "";
        response.on('data', (chunk) => { rawData += chunk; });
        response.on('end', function () {
            let floatRates = JSON.parse(rawData);
            let stringToSave = JSON.stringify(floatRates, null, 4);
            fs.writeFile("./data/FloatRates.json", stringToSave, (err) => {
                if (err) console.log(err);
                else console.log('file saved Float');
            });
        });
    }
}

function horoscopeUpdate(){
    const request = require('request');

    let signs = [
        'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra',
        'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
    ];

    let horoscopeArray = [];

    for(let i=0; i<signs.length; i++){
        let options = {
            url: 'https://aztro.sameerkumar.website/?sign=' + signs[i] + '&day=today',
            method: 'POST'
        };
    
        request(options, callback);
    
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                let horoscope = JSON.parse(body);
                horoscope.sign = signs[i];
                horoscopeArray.push(horoscope);
                if (horoscopeArray.length===12) {
                    let stringToSave = JSON.stringify(horoscopeArray, null, 4);
                    fs.writeFile("./data/horoscope.json", stringToSave, (err) => {
                        if (err) console.log(err);
                        else console.log('Horoscope saved');
                    });
                }
            }
        }
    }
}

function unsplashUpdate() {
    let request = {
        "host": "api.unsplash.com",
        "port": 443,
        "path": "/collections"
    };

    https.get(request, receiveResponseCallbackUnsplash);

    function receiveResponseCallbackUnsplash(response) {
        let rawData = "";
        response.on('data', (chunk) => { rawData += chunk; });
        response.on('end', function () {
            let unsplash = JSON.parse(rawData);
            let stringToSave = JSON.stringify(unsplash, null, 4);
            fs.writeFile('./data/unsplash.json',
                stringToSave,
                function (err) {
                    if (err) console.log(err);
                    else console.log("File saved unsplash");
                }
            );
        });
    }
}

unsplashUpdate();
horoscopeUpdate();

FloatRateUpdate(); // permet d executer la fonction directement
setInterval(FloatRateUpdate, 360000);

News(); // permet d executer la fonction directement
setInterval(News, 360000);

iRailUpdate(); // permet d executer la fonction directement
setInterval(iRailUpdate, 60000);

AirQUpdate(); // permet d executer la fonction directement
setInterval(AirQUpdate, 360000 * 24);

WeatherUpdate(); // permet d executer la fonction directement
setInterval(WeatherUpdate, 360000 * 24);