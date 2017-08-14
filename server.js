var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'unni6e',
    database: 'unni6e',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
}

var app = express();
app.use(morgan('combined'));

var articles = {
 'article-one': {
  title: 'Article One: P S Unnikrishnan',
  heading: 'Article One',
  date: 'August 08, 2017',
  content: 
    `<p>
        This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. 
    </p>
    <p>
        This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. 
    </p>
    <p>
        This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One. This is the content of article One.
    </p>`
  },
 'article-two': {
  title: 'Article Two: P S Unnikrishnan',
  heading: 'Article Two',
  date: 'Sept 08, 2017',
  content: 
    `<p>
        This is the content of article Two.
    </p>
    <p>
        This is the content of article Two.
    <p>
        This is the content of article Two. This is the content of article Two.
    </p>`
 },
 'article-three': {
  title: 'Article Three: P S Unnikrishnan',
  heading: 'Article Three',
  date: 'Oct 08, 2017',
  content: 
    `<p>
        This is the content of article Three.
    </p>
    <p>
        This is the content of article Three.
    <p>
        This is the content of article Three. This is the content of article Three.
    </p>`
 }            
};
                
function createTemplate (data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    var htmlTemplate = `
    <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
                <div>
                    <a href="/">Home</a>
                </div>
                <hr/>
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date}
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>
    `;
    return htmlTemplate;
}

var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
  res.send(counter.toString());
});

var names = [];
app.get('/submit-names/', function (req, res) {
  // Get the name from the request
  var name = req.query.name;
  names.push(name);
  res.send(JSON.stringify(names));
});

var pool = new Pool(config);
app.get('/test-db', function(req, res) {
    // make a select request
    // return a response with the resut
    pool.query('SELECT * FROM test', function(err, result) {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            res.send(JSON.stringify(result.rows));
        }
    });
});

app.get('/articles/:articleName', function (req, res) {
    
    pool.query("Select * from article where title = '" + req.params.articleName + "'", function(err, result){
        if (err){
            res.status(500).send(err.toString());
        } else {
            if (result.rows.length === 0) {
                res.status(400).send('Article Not Found')
            }
            else {
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
