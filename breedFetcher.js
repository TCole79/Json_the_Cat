const request = require("request");
const fs = require("fs");

// Write the logic in breedFetcher.js to fetch the Siberian data from the API endpoint using request.
// https://api.thecatapi.com/v1/breeds/search?breed_ids={userInput}

// fetchBreedDescription("Siberian", (error, description) => {});

const fetchBreedDescription = function (breedName, callback) {
  let URL = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;

  // this is the start of the request
  request(URL, function (error, response, body) {
    // try to handle the errors + edge cases first?
    if (error) {
      callback("Error encounted, sorry!\n", error); // this line should use callbacks
      //return;
    }
    if (!breedName) {
      callback("Search term undefined."); // this line should use callbacks
      //return;
    }
    // execute main request - status code 200 is all good!
    if (response && response.statusCode === 200) {
      // this code returns the body of the requested information, but changed into a JS object that we can use inside our code (and it reads better)
      const data = JSON.parse(body);

      if (!data[0]) {
        // if breed not found, return appropriate message
        callback("Breed not found.", null); // this line should use callbacks
        //return;
      } else {
        callback(null, data[0].description); // this line should use callbacks
        console.log(typeof body);
      }
    }
  });
};

fetchBreedDescription("breed", (err, description) => {
  console.log(err, description);
});

module.exports = { fetchBreedDescription }; // I added this for the refactoring
