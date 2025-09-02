const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost:27017/mvp-db`).then(() => {
    console.log(`db connected`);
  })
  .catch((e) => {
    console.log(`db failed: ${e.message}`);
  });

module.exports = mongoose;
