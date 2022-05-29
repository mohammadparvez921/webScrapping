const request=require('request');
const cheerio=require('cheerio');
const fs=require("fs");
const path=require('path');
//const allissuesTextObj=require("./allIissuesTopic");


function getAllissues(url){
    request(url,cb);
}

function cb(err,res,body) {
    if (err) {
        console.log(err);
    }
    else if (res.statusCode == 404) {
      console.log("Page not found");
    }
    else {
      // console.log("Page found");
        getIssueLinks(body);
    }
}

function getIssueLinks(html){
    let selecTool=cheerio.load(html);
    let extractIssuesArr=selecTool('a[data-ga-click="Repository, Navigation click, Issues tab"]');
        let issuesLink=selecTool(extractIssuesArr).attr("href");
        let fullLink="https://github.com"+issuesLink;
        console.log(fullLink)
       allissuesTextObj.getAllIssuesTextLink(fullLink);
    }



module.exports={
    getAllissues:getAllissues,

}