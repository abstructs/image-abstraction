var express = require('express');
var app = express();
var Search = require('bing.search');
search = new Search('0HjNYFqn1WNVZznhnniSm7s2spsrztlhVgLCu8eSBpA');

app.get('/api/imagesearch/:query', function(req, res){
  search.images(req.params.query,
    {top: 10,
     skip: req.query.offset},
    function(err, results) {
      var newObj = results.map(function(result){
        return {
          "url": result.url,
          "snippet": result.title,
          "thumbnail": result.thumbnail.url,
          "context": result.sourceUrl
        };
      });
      res.end(JSON.stringify(newObj) + ' Offset: ' + req.query.offset);
    }
  );
});

app.listen(3000, function(){ console.log('Server is running on port 3000...')});
