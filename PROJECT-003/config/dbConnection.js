
const mongoose = require("mongoose");


// create a database connection
function connectDb(url)
{
  return mongoose.connect(url);
}

module.exports = {
    connectDb,
};