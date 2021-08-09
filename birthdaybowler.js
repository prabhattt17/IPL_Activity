let request = require('request');
let cheerio = require('cheerio');
const { serialize } = require('cheerio/lib/api/forms');

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/royal-challengers-bangalore-vs-sunrisers-hyderabad-eliminator-1237178/full-scorecard";

request(url, cb);

function cb(error, response, html) {
    if (error) {
        console.log(error); //print the error if occured
    } else if (response.statusCode == 404) {
        console.log('Error 404 page not found');
    } else {
        // console.log(html); //print html for the request made
        dataExtractor(html);
    }
}


function dataExtractor(html) {
    let searchTool = cheerio.load(html);
    let bowlers = searchTool('.table.bowler tbody tr');
    
    for (let i = 0; i < bowlers.length;i++){
        let cols = searchTool(bowlers[i]).find('td');
        let anchorEle = searchTool(cols[0]).find('a');
        let linkOfPlayerProfile = anchorEle.attr("href");

        // newLink -> homepage + linkOfPlayerProfile
        let fullLink = `https://www.espncricinfo.com${linkOfPlayerProfile}`;
        request(fullLink, newCB);
        
    }

}

function newCB(error, response, html){
    if (error) {
        console.log(error); //print the error if occured
    } else if (response.statusCode == 404) {
        console.log('Error 404 page not found');
    } else {
        console.log("---------------------------------");
        getBirthDay(html);
    }
}

function getBirthDay(html){
    let searchTool = cheerio.load(html);
    let headingArr = searchTool(".player-card-description");
    let age = searchTool(headingArr[2]).text();
    let name = searchTool(headingArr[0]).text();

    console.log(name , " " , age )
}