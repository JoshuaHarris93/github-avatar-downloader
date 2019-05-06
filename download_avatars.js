var request = require('request');

var secrets = require('./secrets.js'); 

console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Authorization': 'token 067b03ae617742e2ceeb6327fbb9b53e0d3397a5'
      }
    };
  
    request(options, function(err, res, body) {
      cb(err, body);
    });
  }

  getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
  });
  
