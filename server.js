const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const welcomeMessage = `#Welcome to Wastebin!
  
Paste your code here and use the commands
in the top right corner to create
a new file and share with others.`;

  res.render('code', {
    code: welcomeMessage,
    currentPage: 'code',
  });
});

app.get('/new', (req, res) => {
  res.render('new', { currentPage: 'new' });
});

app.post('/save', (req, res) => {
  const code = req.body.code;
  console.log(code);
});

app.listen(8000);
