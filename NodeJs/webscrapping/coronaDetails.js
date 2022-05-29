const request=require("request");
//cheerio

// Cheerio parses HTML and it traverses the html so that data can be manipulated according to user's needs
const cheerio=require("cheerio");
request("https://www.worldometers.info/coronavirus/",cb);

function cb(err,res,body){
    if(err){
        console.error("error",err);
    }
    else{
        handleHtml(body);
    }
}

function handleHtml(html){
    let selecTool=cheerio.load(html);
    let coronaStatsArr=selecTool(".maincounter-number")
      //console.log(coronaStatsArr.text());
      let totalCases=selecTool(coronaStatsArr[0]).text();
      console.log("totalCases---->"+totalCases);

      //<-------Total Deaths-->
      let totalDeaths=selecTool(coronaStatsArr[1]).text();
      console.log("totalDeaths---->"+totalDeaths);

    //   <-------Total recovered----->
    let totalRecovered=selecTool(coronaStatsArr[2]).text();
      console.log("totalRecovered---->"+totalRecovered);



}