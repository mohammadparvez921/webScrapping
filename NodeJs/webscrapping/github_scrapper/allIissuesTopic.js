const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
function getAllIssuesTextLink(url){
    request(url,cb);
}

function cb(err,res,body) {
    if (err) {
        console.log(err);
    }
    // else if (res.statusCode == 404) {
    //   console.log("Page not found");
    // }
    else {
      // console.log("Page found");
        getAllIssuesTextFunc(body);
    }
}

function getAllIssuesTextFunc(html){

    let selecTool=cheerio.load(html);
     
    let extractIssuesTitleArr=selecTool('a[class="Link--primary v-align-middle no-underline h4 js-navigation-open markdown-title"]')
        //isssues title
        for(let j=0;j<extractIssuesTitleArr.length;j++){
          //  console.log((j+1)+")-"+selecTool(extractIssuesTitleArr[j]).text());
            let textLink=selecTool(extractIssuesTitleArr[j]).attr("href");
            let fullLink="https://github.com"+textLink;
         //  console.log(fullLink);
        }
}



module.exports={
    getAllIssuesTextLink:getAllIssuesTextLink,
}