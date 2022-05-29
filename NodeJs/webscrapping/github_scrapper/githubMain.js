let url="https://github.com/topics";
const fs=require("fs");
const path=require("path");
const request = require("request");
const cheerio = require("cheerio");
//const allProjectObj=require("./allProject");


request(url,cb);

function cb(err, res, body) {
    if (err) {
      console.error("error", err);
    } else {
      handleHTML(body);
    }
  }

  function handleHTML(html){
      let selecTool=cheerio.load(html);
        let extractTopicArr=selecTool('a[class="no-underline flex-1 d-flex flex-column"]');
        //console.log(extractTopicArr.length);
        let extractTopicNameArr=selecTool('p[class="f3 lh-condensed mb-0 mt-1 Link--primary"]');
        for(let i=0;i<3;i++){
        let relativeLink1=selecTool(extractTopicArr[i]).attr("href");
        let fullLink1="https://github.com"+relativeLink1;
       let topicName= selecTool(extractTopicNameArr[i]).text();
       //console.log(topicName);
        // let githubPath = path.join(__dirname,topicName);
        //       if (!fs.existsSync(githubPath)) {
        //       fs.mkdirSync(githubPath);
        //     }
       // console.log(fullLink1);
        getAllProject(fullLink1,topicName);
        }
      
    }



    function getAllProject(fullLink1,topicName){
      request(fullLink1,callback2)

      function callback2(err, res, body) {
        if (err) {
          console.error("error", err);
        } else {
          extractProjectLink(body,topicName);
        }
      }
      


      function extractProjectLink(html,topicName){
        let selecTool=cheerio.load(html);
        let extractProjectArr=selecTool('a[class="text-bold wb-break-word"]')
         //let extractTopicNameArr=selecTool('h1[class="h1"]');
         //console.log(extractProjectArr.length);
        for(let i=0;i<8;i++){
          let projectLink=selecTool(extractProjectArr[i]).attr("href");
         // console.log(i + 1 + ") " + projectLink);
         //let topicName=selecTool(extractTopicNameArr[i]).text();
        let projectName=selecTool(extractProjectArr[i]).text();
        let topicName2=topicName;
        
        //   let projectPath = path.join(__dirname,topicName,projectName+".pdf");
        //   if (!fs.existsSync(projectPath)) {
        //   fs.mkdirSync(projectPath);
        // }
        //console.log(projectName);

          let fullLink2="https://github.com"+projectLink;
         //console.log(fullLink2)
          // let projectPath=path.join(__dirname,topicName,projectName+".pdf")
          // if (!fs.existsSync(projectPath)) {
          //     fs.mkdirSync(projectPath);
          //   }
    
        
    
          getAllissues(fullLink2,topicName2);
          // break;
        }
    }
    

      
    
    }

  
   

//     // getting all issues link
 
 function getAllissues(fullLink2,topicName2){
    request(fullLink2,callback3);
function callback3(err,res,body) {
  if (err) {
      console.log(err);
  }
  else if (res.statusCode == 404) {
    console.log("Page not found");
  }
  else {
    // console.log("Page found");
 getAllissues(fullLink2,topicName2);
  }

}
function getIssueLinks(html,topicName2){
  let selecTool=cheerio.load(html);
  let extractIssuesArr=selecTool('a[data-ga-click="Repository, Navigation click, Issues tab"]');
  let projectName=selecTool('strong[class="mr-2 flex-self-stretch"]').text();
      let issuesLink=selecTool(extractIssuesArr).attr("href");
      let fullLink3="https://github.com"+issuesLink;
     //console.log(fullLink3)
     console.log(projectName);
     console.log(topicName);
     getAllIssuesTextLink(fullLink3);
  }

}
//   //all issues Text Link


 function getAllIssuesTextLink(fullLink3){
  request(fullLink3,callback4);
}


function callback4(err,res,body) {
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
        //console.log(fullLink);
      }
}
