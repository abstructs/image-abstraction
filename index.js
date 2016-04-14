var express = require('express');
var app = express();
var Search = require('bing.search');
var search = new Search('0HjNYFqn1WNVZznhnniSm7s2spsrztlhVgLCu8eSBpA');

var searchHistory = [
  {"term":"lolcats","when":"2016-04-14T18:34:04.045Z"},
  {"term":"coolio","when":"2016-04-14T18:34:09.707Z"}
];

app.get('/api/imagesearch/:query', function(req, res){
  searchHistory.push({ "term": req.params.query, "when": new Date() });
  search.images(req.params.query,
    {top: 10,
     skip: req.query.offset},
    function(err, results) {
      if (err) throw err;
      var newObj = results.map(function(result){
        return {
          "url": result.url,
          "snippet": result.title,
          "thumbnail": result.thumbnail.url,
          "context": result.sourceUrl
        };
      });
      res.end(JSON.stringify(newObj));
    }
  );
});

app.get('/', function(req, res){
  searchHistory.map(function(history){
    return {
      "term": history.term,
      "when": history.when
    };
  });
  res.write('Example usage: \n\nhttps://image-abstraction-polygoning.c9users.io/api/imagesearch/coolio?offset=3\n\n');
  res.write('When you make a search your history will be added here: \n\n');
  res.end(JSON.stringify(searchHistory));
});

app.listen(process.env.PORT || 8080, function(){ console.log('Server is running...')});