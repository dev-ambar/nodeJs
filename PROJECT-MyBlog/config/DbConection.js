const mongoos  = require('mongoose');

function connectToDB(url){

    return mongoos.connect(url);
}

module.exports = connectToDB;