var request = require('request');
var fs = require("fs");

var secrets = require('./secrets.js'); 

var owner = process.argv.slice(2);
console.log(owner)
// var repo = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Authorization': secrets.GITHUB_TOKEN
      }
    };
  
    request(options, function(err, res, body) {
      cb(err, JSON.parse(body));

    });
}

function downloadImageByURL(url, filePath) {
    request.get(url)
    .on('error', function (err) {                                   // Note 2
        throw err; 
      })
    .on('response', function (response) {                           // Note 3
        console.log('Response Status: ', response.statusCode, response.statusMessage, response.headers['content-type']);
      })
    .pipe(fs.createWriteStream(filePath));       
  }

if (!owner[0]) {
    console.log('Error: Needs owner input');
}
if (!owner[1]) {
 console.log('Error: Needs repo input');
}

else {
    getRepoContributors(owner[0], owner[1], function(err, result) {
        // for (var user of result) 
        for (var i = 0; i<result.length; i++){
            //console.log(user.avatar_url)
                downloadImageByURL(result[i].avatar_url, `avatars/${result[i].login}.jpg`);
            
        }
        
        console.log("Errors:", err);
    
      });
}





