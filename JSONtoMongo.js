'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

var listingData;
/* Connect to your database using mongoose - remember to keep your key secret*/
//see https://mongoosejs.com/docs/connections.html
//See https://docs.atlas.mongodb.com/driver-connection/
mongoose.connect(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);

//Reads in listings.json to save the entries to the database
fs.readFile('listings.json', 'utf8', function(err, data) {

  //Check for errors
  if (err) throw err;

  //Save the sate in the listingData variable already defined
  listingData = JSON.parse(data);

  //For each listing entry, save it to the database
  listingData.entries.forEach(function(element) {
    var listingEntry = new Listing({
      name: element.name,
      code: element.code,
      coordinates: element.coordinates,
      address: element.address
    });
    //Saves the listing entry to the database
    listingEntry.save(function(err) {
      if (err) throw err;

      console.log("Saved listing successfully");
    });
  });
});

/*  
  Check to see if it works: Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */