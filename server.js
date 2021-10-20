const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  const welcomeMessage = `#Welcome to Wastebin!

Paste your code here and use the commands
in the top right corner to create
a new file and share with others.`;

  res.render('code', {
    code: welcomeMessage,
  });
});

app.listen(8000);
