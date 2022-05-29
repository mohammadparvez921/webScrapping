const request=require("request");
const path=require("path");
const cheerio=require("cheerio");
//const getAllIssuesLinkObj=require("./allIssuesLink")

function getAllProject(url){
    request(url,cb);
}
function cb(err, res, body) {
    if (err) {
      console.error("error", err);
    } else {
      extractProjectLink(body);
    }
  }

  function extractProjectLink(html){
      let selecTool=cheerio.load(html);
      let extractProjectArr=selecTool('a[class="text-bold wb-break-word"]')
      let extractTopicNameArr=selecTool('h1[class="h1"]');
       //console.log(extractProjectArr.length);
      for(let i=0;i<8;i++){
        let projectLink=selecTool(extractProjectArr[i]).attr("href");
       // console.log(i + 1 + ") " + projectLink);
       //console.log(selecTool(extractProjectArr[i]).text());
      // console.log(selecTool(extractTopicNameArr[i]).text());
        let fullLink2="https://github.com"+projectLink;
       console.log(fullLink2)
        getAllissues(fullLink2);
        // break;
      }
  }
 // getting all issues link
 
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
     // console.log(fullLink)
     getAllIssuesTextLink(fullLink);
  }

 //all issues Text Link


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
        console.log(fullLink);
      }
}






  module.exports={
    getAllProject:getAllProject,
    getAllissues:getAllissues,
    getAllIssuesTextLink:getAllIssuesTextLink,

  }