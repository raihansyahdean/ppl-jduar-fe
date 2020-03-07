var express = require('express')
var history = require('connect-history-api-fallback')
var path = require('path')
var serveStatic = require('serve-static')

// var path = require('path');
var enforce = require('express-sslify');
// var http = require('http');

var app = express();
app.use(serveStatic(__dirname + "/dist"));
app.use(enforce.HTTPS({ trustProtoHeader: true }));

// Use a fallback for non-root routes (required for Vue router)
//   NOTE: History fallback must be "used" before the static serving middleware!
app.use(history({
    // OPTIONAL: Includes more verbose logging
    verbose: true
}))

app.get('*',function(req,res,next){
  if(req.headers['x-forwarded-proto']!='https')
    res.redirect(process.env.VUE_APP_URL_FE+req.url)
  else
    next() /* Continue to other routes if we're not redirecting */
})

// Serve static assets from the build files (images, etc)
app.use(serveStatic(path.join(__dirname, '/dist')))

var port = process.env.PORT || 5000

app.listen(port, () => {
  console.log('Server started at http://localhost:5000')
})

// http.createServer(app).listen(app.get('port'), function() {
//   console.log('Express server listening on port ' + app.get('port'));
// });