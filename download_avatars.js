var request = require('request');

var secrets = require('./secrets.js'); 

console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request'
      }
    };
  
    request(options, function(err, res, body) {
      cb(err, JSON.parse(body));

    });
  }



  getRepoContributors("jquery", "jquery", function(err, result) {
    for (var user of result) {
        console.log(user.avatar_url)
    }
    
    console.log("Errors:", err);

  });
  
