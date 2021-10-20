const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
});

module.exports = mongoo.model('Document', documentSchema);
