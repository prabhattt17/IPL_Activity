let request = require('request');
let cheerio = require('cheerio');

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
    // let content = "";
    // for (let i = 0; i < bowlers.length; i++){
    //     content += searchTool(bowlers[i]).html();
    // }
    // fs.writeFileSync('table.html', content);

    for(let i = 0; i < bowlers.length; i++){
        let cols = searchTool(bowlers[i]).find('td');
        let name = searchTool(cols[0]).text();
        let wickets = searchTool(cols[4]).text();
        console.log("bowler: "+name+" wickets: "+ wickets);
    }
}