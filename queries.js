/* Add all the required libraries*/
var mongoose = require('mongoose'), 
Schema = mongoose.Schema, 
Listing = require('./ListingSchema.js'), 
config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/
mongoose.connect(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);


/* Fill out these functions using Mongoose queries*/
//Check out - https://mongoosejs.com/docs/queries.html

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
  Listing.findOne({name: "Library West"}, function(err, data) {
    if (err) throw err;
    console.log(data);
  });

};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
  Listing.findOneAndRemove({ code: 'CABL' }, function(err, data) {
    if (err) throw err;
    console.log(data);
  });
};
var updatePhelpsMemorial = function() {
  /*
    Phelps Lab address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
    
    Correct Address: 1953 Museum Rd, Gainesville, FL 32603

  */
  Listing.updateOne({ name: 'Phelps Laboratory' }, { address: '1953 Museum Rd, Gainesville, FL 32603' });
  Listing.find({name: "Phelps Laboratory"}, function(err, data) {
    if (err) throw err;
    console.log(data);
  });

};
var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
   Listing.find({}, function(err, users) {
    if (err) throw err;
  
    // object of all the users
    console.log(users);
  });

};

findLibraryWest();
removeCable();
updatePhelpsMemorial();
retrieveAllListings();
