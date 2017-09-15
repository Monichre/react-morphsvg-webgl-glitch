var Vimeo = require('vimeo').Vimeo;
var clientID = 'a403a67f112f44d9826223d299688cffcdc4c794';
var clientSecret = '4ddwI9d7nHrcRcPlM5UE4YyNTZ9yjCCthnz+9CwY4Hdg5JkaYrOWRu24kgmnq6qmkDXNZ2EejDZ6ZmgmGM6pmMX+m02NeAPx4fty7Dc5rMCwIT1iZ/+T5Goz0xx4aoFV';
var accessToken = '61253099d856b456e9432178d2396bb2';

var lib = new Vimeo(clientID, clientSecret, accessToken);
var videos = [];

lib.request({
    path : '/me/videos'
}, (err, body, status_code, headers) => {
    if (!err) {
        videos = body.data;
        console.log(videos);
    }else {
        console.log(err);
    }
});

exports.videos = videos;
