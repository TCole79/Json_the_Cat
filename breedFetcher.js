const request = require("request");
const fs = require("fs");

// accept user input from the terminal, but slice (remove) first two elements when returning
const userInput = process.argv[2];
//console.log("Search term: ", userInput);

// Write the logic in breedFetcher.js to fetch the Siberian data from the API endpoint using request.
// https://api.thecatapi.com/v1/breeds/search?breed_ids={userInput}

const fetchBreedDescription = function (breed, callback) {
  let URL = `https://api.theecatapi.com/v1/breeds/search?q=${userInput}`;

  // this is the start of the request
  request(URL, function (error, response, body) {
    // try to handle the errors + edge cases first?
    if (error) {
      console.log("Error encounted, sorry!\n", error);
      return;
    }
    if (!userInput) {
      console.log("Search term undefined.");
      return;
    }
    // execute main request - status code 200 is all good!
    if (response && response.statusCode === 200) {
      // this code returns the body of the requested information, but changed into a JS object that we can use inside our code (and it reads better)
      const data = JSON.parse(body);

      if (!data[0]) {
        // if breed not found, return appropriate message
        console.log("Breed not found.");
        return;
      }
      console.log("data type: ", data[0].description);
      console.log(typeof body);
    }
  });
};
fetchBreedDescription("breed", "callback");
