const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const Document = require('./models/Document');

const mongoose = require('mongoose');
mongoose.connect(
  `mongodb+srv://juanhdb:Juanlealdb@wastebin.y8vml.mongodb.net/wastebin?retryWrites=true&w=majority`,
  {}
);

app.get('/', (req, res) => {
  const welcomeMessage = `#Welcome to Wastebin!
  
Paste your code here and use the commands
in the top right corner to create
a new file and share with others.`;

  res.render('code', {
    code: welcomeMessage,
    currentPage: 'code',
    language: 'markdown',
  });
});

app.get('/new', (req, res) => {
  res.render('new', { currentPage: 'new' });
});

app.post('/save', async (req, res) => {
  const code = req.body.code;
  try {
    const document = await Document.create({ code });
    res.redirect(`/${document.id}`);
  } catch (e) {
    res.render('new', { code });
  }
});

app.get('/:id/duplicate', async (req, res) => {
  const id = req.params.id;
  try {
    const document = await Document.findById(id);
    res.render('new', { code: document.code, currentPage: 'new' });
  } catch (e) {
    res.redirect(`/${id}`);
  }
});

app.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const document = await Document.findById(id);
    res.render('code', { code: document.code, currentPage: 'code', id });
  } catch (e) {
    res.redirect('/');
  }
});

const port = 8000;
app.listen(process.env.PORT || port);
