const puppeteer=require("puppeteer");
let email="parrymd786@gmail.com";
let password="Parvez@123";
let {answer}=require("./codes");
let cTab;
let browserOPenPromise=puppeteer.launch({
    headless:false,  
    defaultViewport:null,
    args:["--start-maximized"],
    //  executablePath:"C:\Program Files\Google\Chrome\Application\chrome.exe",
});
browserOPenPromise.then(function(browser){
console.log("browser is open");

let allTabsPromise=browser.pages();
return allTabsPromise;
})
.then(function(allTabsArr){
    cTab=allTabsArr[0];
    console.log("new tab");
    //URL to navigate page to
    let visitingLoginPagePromise=cTab.goto("https://www.hackerrank.com/auth/login");
    return visitingLoginPagePromise;
})
.then(function(){
    console.log("HakkerRank login page opened");
    let emailWillBeTypedPromise=cTab.type("input[name='username']", email,{
        delay: 100,
    });
    return emailWillBeTypedPromise;
})
.then(function(){

    let passwordWillBeTypedPromise=cTab.type("input[type='password']", password,{
        delay: 100,
    });
    return passwordWillBeTypedPromise;
})
.then(function(){
    let willBeLoggedInPromise=cTab.click( ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    return willBeLoggedInPromise;
})
.then(function(){
    console.log("logged into hakkerrank successfully");
    let algorithmTabWillBeOPenedPromise = waitAndClick(
        "div[data-automation='algorithms']"
      );
      return algorithmTabWillBeOPenedPromise;
})
.then(function(){
    console.log("algorithm page is opened");
    let allQuesPromise=cTab.waitForSelector('a[data-analytics="ChallengeListChallengeName"]');
    return allQuesPromise;
})
.then(function(){
    function getAllQuesLinks(){
    let allElemArr=document.querySelectorAll('a[data-analytics="ChallengeListChallengeName"]'
    );
    let linksArr=[];
    for(let i=0;i<allElemArr.length;i++){
        linksArr.push(allElemArr[i].getAttribute("href"));
    }
    return linksArr;
}
let linksArrPromise=cTab.evaluate(getAllQuesLinks);

return linksArrPromise;
})
.then(function(linksArr){
    console.log("links to all ques recieved");
    console.log(linksArr);
    //question solve krna hai
     //link to the question to besolved, idx of the linksArr
     let questionWillBeSolvedPromise=questionSolver(linksArr[0],0);
     for (let i = 1; i < linksArr.length; i++){
        questionWillBeSolvedPromise = questionWillBeSolvedPromise.then(function () {
          return questionSolver(linksArr[i], i);
        })
    }
     return questionWillBeSolvedPromise;
}).then(function(){
    console.log("question is solved");
})
.catch(function(err){
    console.log(err);
});
function waitAndClick(algoBtn) {
    let waitClickPromise = new Promise(function (resolve, reject) {
      let waitForSelectorPromise = cTab.waitForSelector(algoBtn);
      waitForSelectorPromise
        .then(function () {
          console.log("algo btn is found");
          let clickPromise = cTab.click(algoBtn);
          return clickPromise;
        })
        .then(function () {
          console.log("algo btn is clicked");
          resolve();
        })
        .catch(function (err) {
          console.log(err);
        })
    });
  
    // waitClickPromise.then(function () {
    //   console.log("inside then of waitclick");
    // });
    return waitClickPromise;
  }
  function questionSolver(url,idx){
      return new Promise(function(resolve,reject){
          let fullLink=`https://www.hackerrank.com${url}`;
          let goToQuesPagePromise=cTab.goto(fullLink);
          goToQuesPagePromise.then(function(){
              console.log("question opened");
              //tick the custom input box mark
              let waitForCheckBoxAndClickPromise=waitAndClick(".checkbox-input");
              waitForCheckBoxAndClickPromise=waitAndClick(".checkbox-input");
              return waitForCheckBoxAndClickPromise;
          })
          .then(function(){
              let waitForCheckBoxAndClickPromise=waitAndClick(".checkbox-input");
              return waitForCheckBoxAndClickPromise;
          
      })
      .then(function(){
          let waitForTextBoxPromise=cTab.waitForSelector(".custominput");
          return waitForTextBoxPromise;
      })
      .then(function(){
        let codeWillBeTypedPromise = cTab.type(".custominput", answer[idx], {
            delay: 100,
        });
          return codeWillBeTypedPromise;

      })
      .then(function () {
        //control key is pressed promise
        let controlPressedPromise = cTab.keyboard.down("Control");
        return controlPressedPromise;
      })
      .then(function () {
        let aKeyPressedPromise = cTab.keyboard.press("a");
        return aKeyPressedPromise;
      })
      .then(function () {
        let xKeyPressedPromise = cTab.keyboard.press("x");
        return xKeyPressedPromise;
      })
      .then(function () {
        let ctrlIsReleasedPromise = cTab.keyboard.up("Control");
        return ctrlIsReleasedPromise;
      })
      .then(function () {
        //select the editor promise
        let cursorOnEditorPromise = cTab.click(
          ".monaco-editor.no-user-select.vs"
        );
        return cursorOnEditorPromise;
      })
      .then(function () {
        //control key is pressed promise
        let controlPressedPromise = cTab.keyboard.down("Control");
        return controlPressedPromise;
      })
      .then(function () {
        let aKeyPressedPromise = cTab.keyboard.press("A");
        return aKeyPressedPromise;
      })
      .then(function () {
        let vKeyPressedPromise = cTab.keyboard.press("V");
        return vKeyPressedPromise;
      })
      .then(function () {
        let controlDownPromise = cTab.keyboard.up("Control");
        return controlDownPromise;
      })
      .then(function () {
        let submitButtonClickedPromise = cTab.click(".hr-monaco-submit");
        return submitButtonClickedPromise;
      })
      .then(function () {
        console.log("code submitted successfully");
        resolve();
      })
      .catch(function (err) {
        reject(err);
      });
  });
}
  
  
