const request=require("request")
console.log("Before");
request("https://www.worldometers.info/coronavirus/",cb)

function cb(err,res,body){
    console.error("error",err);
    // console.log(res);
    // console.log(body);
    console.log(body);
}

console.log("After");